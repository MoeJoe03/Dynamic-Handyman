import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { galleryConfig } from '@/config/gallery.config';
import { getAdmin, isSameOrigin } from '@/lib/gallery/auth';
import { altTextSchema, categorySchema, detectImageType } from '@/lib/gallery/validation';
import type { GalleryImage } from '@/lib/gallery/types';
import { galleryImageUrl } from '@/lib/gallery/image-url';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const { data, error } = await admin.supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) throw error;
    const images = (data as GalleryImage[]).map((image) => ({
      ...image,
      imageUrl: galleryImageUrl(admin.supabase.storage, image.image_path),
    }));
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery admin list failed', error);
    return NextResponse.json({ error: 'Could not load gallery images.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });

    const form = await request.formData();
    const category = categorySchema.safeParse(form.get('category'));
    const files = form.getAll('files');
    const altTexts = form.getAll('altText');
    if (!category.success || files.length < 1 || files.length > galleryConfig.upload.maxFilesPerBatch) {
      return NextResponse.json({ error: 'Select a valid category and up to 10 images.' }, { status: 400 });
    }

    const uploads: Array<{ bytes: Uint8Array; mime: string; extension: string; altText: string }> = [];
    for (const [index, entry] of files.entries()) {
      if (!(entry instanceof File) || entry.size === 0 || entry.size > galleryConfig.upload.maxFileSizeMB * 1024 * 1024) {
        return NextResponse.json({ error: 'Each image must be 8 MB or smaller.' }, { status: 400 });
      }
      const bytes = new Uint8Array(await entry.arrayBuffer());
      const type = detectImageType(bytes);
      if (!type || type.mime !== entry.type || !galleryConfig.upload.acceptedTypes.includes(type.mime as typeof galleryConfig.upload.acceptedTypes[number])) {
        return NextResponse.json({ error: 'Only valid JPG, PNG, and WebP images are allowed.' }, { status: 400 });
      }
      const altText = altTextSchema.safeParse(String(altTexts[index] ?? ''));
      if (!altText.success) return NextResponse.json({ error: 'Alt text must be 300 characters or less.' }, { status: 400 });
      uploads.push({ bytes, ...type, altText: altText.data });
    }

    const { data: lastImage, error: orderError } = await admin.supabase
      .from('gallery_images')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (orderError) throw orderError;

    const results: GalleryImage[] = [];
    for (const [index, upload] of uploads.entries()) {
      const path = `${category.data}/${randomUUID()}.${upload.extension}`;
      const { error: storageError } = await admin.supabase.storage
        .from(galleryConfig.storageBucket)
        .upload(path, upload.bytes, { contentType: upload.mime, upsert: false });
      if (storageError) return NextResponse.json({ error: `Upload ${index + 1} failed: ${storageError.message}`, images: results }, { status: 500 });

      const { data: image, error: databaseError } = await admin.supabase
        .from('gallery_images')
        .insert({ image_path: path, category: category.data, alt_text: upload.altText || null, sort_order: (lastImage?.sort_order ?? -1) + index + 1 })
        .select('*')
        .single();
      if (databaseError) {
        const { error: cleanupError } = await admin.supabase.storage.from(galleryConfig.storageBucket).remove([path]);
        if (cleanupError) console.error('Upload cleanup failed', cleanupError);
        return NextResponse.json({ error: `Upload ${index + 1} could not be saved.`, images: results }, { status: 500 });
      }
      results.push(image as GalleryImage);
    }

    revalidatePath('/gallery');
    return NextResponse.json({ images: results }, { status: 201 });
  } catch (error) {
    console.error('Gallery upload failed', error);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
