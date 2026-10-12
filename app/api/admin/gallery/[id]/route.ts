import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { galleryConfig } from '@/config/gallery.config';
import { getAdmin, isSameOrigin } from '@/lib/gallery/auth';
import { editImageSchema } from '@/lib/gallery/validation';
import { isLegacyImagePath } from '@/lib/gallery/image-url';

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await context.params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: 'Invalid image.' }, { status: 400 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const parsed = editImageSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Select a category and enter valid alt text.' }, { status: 400 });
    const { data, error } = await admin.supabase
      .from('gallery_images')
      .update({ category: parsed.data.category, alt_text: parsed.data.altText || null })
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    revalidatePath('/gallery');
    return NextResponse.json({ image: data });
  } catch (error) {
    console.error('Gallery image edit failed', error);
    return NextResponse.json({ error: 'Could not update this image.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const { id } = await context.params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: 'Invalid image.' }, { status: 400 });
  try {
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: 'Access denied.' }, { status: 403 });
    const { data: image, error: readError } = await admin.supabase.from('gallery_images').select('image_path').eq('id', id).single();
    if (readError || !image) return NextResponse.json({ error: 'Image not found.' }, { status: 404 });

    const { data: homeUse, error: homeUseError } = await admin.supabase.from('home_images').select('slot_key').eq('gallery_image_id', id).limit(1).maybeSingle();
    if (homeUseError) throw homeUseError;
    if (homeUse) return NextResponse.json({ error: 'This photo is used on the home page. Restore or replace it there before deleting it from the gallery.' }, { status: 409 });

    const { error: deleteError } = await admin.supabase.from('gallery_images').delete().eq('id', id);
    if (deleteError?.code === '23503') return NextResponse.json({ error: 'This photo is used on the home page. Restore or replace it there before deleting it from the gallery.' }, { status: 409 });
    if (deleteError) throw deleteError;
    revalidatePath('/gallery');

    if (isLegacyImagePath(image.image_path)) return NextResponse.json({ success: true });

    const { error: storageError } = await admin.supabase.storage.from(galleryConfig.storageBucket).remove([image.image_path]);
    if (storageError) {
      console.error('Gallery storage cleanup needed', { path: image.image_path, error: storageError });
      return NextResponse.json({ warning: 'Image removed from the gallery; its stored file needs cleanup.' });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gallery image delete failed', error);
    return NextResponse.json({ error: 'Could not delete this image.' }, { status: 500 });
  }
}
