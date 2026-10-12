import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getSupabaseEnv } from '@/lib/supabase/env';
import { galleryImageUrl } from './image-url';
import type { GalleryImage, GalleryImageView } from './types';

export async function getPublicGalleryImages(): Promise<{ images: GalleryImageView[]; error: string | null }> {
  try {
    const { url, key } = getSupabaseEnv();
    const supabase = createSupabaseClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await supabase
      .from('gallery_images')
      .select('id,image_path,category,alt_text,sort_order,created_at,updated_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;

    const images = (data as GalleryImage[]).map((image) => ({
      ...image,
      imageUrl: galleryImageUrl(supabase.storage, image.image_path),
    }));
    return { images, error: null };
  } catch (error) {
    console.error('Public gallery could not load', error);
    return { images: [], error: 'The gallery is temporarily unavailable. Please try again shortly.' };
  }
}
