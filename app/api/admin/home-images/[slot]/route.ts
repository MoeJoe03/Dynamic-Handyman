import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { homeImageSlotMap } from '@/config/home-images';
import { galleryConfig } from '@/config/gallery.config';
import { getAdmin, isSameOrigin } from '@/lib/gallery/auth';
import { galleryImageUrl, isLegacyImagePath } from '@/lib/gallery/image-url';
import { detectImageType } from '@/lib/gallery/validation';

export const runtime = 'nodejs';
type Context = { params: Promise<{ slot: string }> };
const altTextSchema = z.string().trim().min(1).max(300);
const reuseSchema = z.object({ galleryImageId: z.string().uuid(), altText: altTextSchema });

function validSlot(slot: string) {
  return Object.hasOwn(homeImageSlotMap, slot);
}

export async function POST(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { slot } = await context.params;
  if (!validSlot(slot)) return NextResponse.json({ error: 'Unknown home image position.' }, { status: 404 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });

    const form = await request.formData();
    const file = form.get('image');
    const altText = altTextSchema.safeParse(form.get('altText'));
    if (!(file instanceof File) || file.size === 0 || file.size > galleryConfig.upload.maxFileSizeMB * 1024 * 1024) {
      return NextResponse.json({ error: 'Choose an image no larger than 8 MB.' }, { status: 400 });
    }
    if (!altText.success) return NextResponse.json({ error: 'Describe this image in 1–300 characters.' }, { status: 400 });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = detectImageType(bytes);
    if (!type || type.mime !== file.type || !galleryConfig.upload.acceptedTypes.includes(type.mime as typeof galleryConfig.upload.acceptedTypes[number])) {
      return NextResponse.json({ error: 'Only valid JPG, PNG, and WebP images are allowed.' }, { status: 400 });
    }

    const { data: previous, error: readError } = await admin.supabase.from('home_images').select('image_path,gallery_image_id').eq('slot_key', slot).maybeSingle();
    if (readError) throw readError;

    const path = `home/${slot}/${randomUUID()}.${type.extension}`;
    const storage = admin.supabase.storage.from(galleryConfig.storageBucket);
    const { error: uploadError } = await storage.upload(path, bytes, { contentType: type.mime, upsert: false });
    if (uploadError) throw uploadError;

    const { error: saveError } = await admin.supabase.from('home_images').upsert({ slot_key: slot, image_path: path, gallery_image_id: null, alt_text: altText.data }, { onConflict: 'slot_key' });
    if (saveError) {
      const { error: cleanupError } = await storage.remove([path]);
      if (cleanupError) console.error('Home image upload cleanup failed', cleanupError);
      throw saveError;
    }

    revalidatePath('/');
    if (previous?.image_path && !previous.gallery_image_id && !isLegacyImagePath(previous.image_path)) {
      const { error: cleanupError } = await storage.remove([previous.image_path]);
      if (cleanupError) console.error('Old home image cleanup failed', cleanupError);
    }
    return NextResponse.json({ slot_key: slot, image_path: path, gallery_image_id: null, alt_text: altText.data, imageUrl: storage.getPublicUrl(path).data.publicUrl }, { status: 201 });
  } catch (error) {
    console.error('Home image replacement failed', error);
    return NextResponse.json({ error: 'Could not replace this home image.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { slot } = await context.params;
  if (!validSlot(slot)) return NextResponse.json({ error: 'Unknown home image position.' }, { status: 404 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const parsed = z.object({ altText: altTextSchema }).safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Describe this image in 1–300 characters.' }, { status: 400 });

    const { data: current, error: readError } = await admin.supabase.from('home_images')
      .select('image_path,gallery_image_id').eq('slot_key', slot).maybeSingle();
    if (readError) throw readError;
    const imagePath = current?.image_path ?? homeImageSlotMap[slot].defaultImageUrl;
    const galleryImageId = current?.gallery_image_id ?? null;
    const { error: saveError } = await admin.supabase.from('home_images').upsert({
      slot_key: slot,
      image_path: imagePath,
      gallery_image_id: galleryImageId,
      alt_text: parsed.data.altText,
    }, { onConflict: 'slot_key' });
    if (saveError) throw saveError;

    revalidatePath('/');
    return NextResponse.json({
      slot_key: slot,
      image_path: imagePath,
      gallery_image_id: galleryImageId,
      alt_text: parsed.data.altText,
      imageUrl: galleryImageUrl(admin.supabase.storage, imagePath),
    });
  } catch (error) {
    console.error('Home image alt text update failed', error);
    return NextResponse.json({ error: 'Could not save the alt text.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { slot } = await context.params;
  if (!validSlot(slot)) return NextResponse.json({ error: 'Unknown home image position.' }, { status: 404 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const parsed = reuseSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Choose a gallery photo and enter a description of 1–300 characters.' }, { status: 400 });

    const { data: galleryImage, error: galleryError } = await admin.supabase.from('gallery_images')
      .select('id,image_path').eq('id', parsed.data.galleryImageId).maybeSingle();
    if (galleryError) throw galleryError;
    if (!galleryImage) return NextResponse.json({ error: 'That gallery image is no longer available.' }, { status: 404 });

    const { data: previous, error: readError } = await admin.supabase.from('home_images')
      .select('image_path,gallery_image_id').eq('slot_key', slot).maybeSingle();
    if (readError) throw readError;

    const { error: saveError } = await admin.supabase.from('home_images').upsert({
      slot_key: slot,
      image_path: galleryImage.image_path,
      gallery_image_id: galleryImage.id,
      alt_text: parsed.data.altText,
    }, { onConflict: 'slot_key' });
    if (saveError) throw saveError;

    revalidatePath('/');
    if (previous?.image_path && !previous.gallery_image_id && !isLegacyImagePath(previous.image_path) && previous.image_path !== galleryImage.image_path) {
      const { error: cleanupError } = await admin.supabase.storage.from(galleryConfig.storageBucket).remove([previous.image_path]);
      if (cleanupError) console.error('Old home image cleanup failed', cleanupError);
    }
    return NextResponse.json({
      slot_key: slot,
      image_path: galleryImage.image_path,
      gallery_image_id: galleryImage.id,
      alt_text: parsed.data.altText,
      imageUrl: galleryImageUrl(admin.supabase.storage, galleryImage.image_path),
    });
  } catch (error) {
    console.error('Home gallery image selection failed', error);
    return NextResponse.json({ error: 'Could not use this gallery image.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { slot } = await context.params;
  if (!validSlot(slot)) return NextResponse.json({ error: 'Unknown home image position.' }, { status: 404 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const { data: current, error: readError } = await admin.supabase.from('home_images').select('image_path,gallery_image_id').eq('slot_key', slot).maybeSingle();
    if (readError) throw readError;
    if (!current) return NextResponse.json({ error: 'This position is already using its original image.' }, { status: 404 });
    const { error: deleteError } = await admin.supabase.from('home_images').delete().eq('slot_key', slot);
    if (deleteError) throw deleteError;
    revalidatePath('/');
    if (!current.gallery_image_id && !isLegacyImagePath(current.image_path)) {
      const { error: cleanupError } = await admin.supabase.storage.from(galleryConfig.storageBucket).remove([current.image_path]);
      if (cleanupError) console.error('Home image cleanup failed', cleanupError);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Home image reset failed', error);
    return NextResponse.json({ error: 'Could not restore the original image.' }, { status: 500 });
  }
}
