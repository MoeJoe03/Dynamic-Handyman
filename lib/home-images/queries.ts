import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { HomeImageOverrides } from '@/config/home-images';
import { galleryImageUrl } from '@/lib/gallery/image-url';
import { getSupabaseEnv } from '@/lib/supabase/env';

type HomeImageRow = { slot_key: string; image_path: string; gallery_image_id: string | null; alt_text: string };

export async function getPublicHomeImages(): Promise<HomeImageOverrides> {
  try {
    const { url, key } = getSupabaseEnv();
    const supabase = createSupabaseClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data, error } = await supabase.from('home_images').select('slot_key,image_path,gallery_image_id,alt_text');
    if (error) throw error;
    return Object.fromEntries(((data ?? []) as HomeImageRow[]).map((row) => [row.slot_key, {
      ...row,
      imageUrl: galleryImageUrl(supabase.storage, row.image_path),
    }]));
  } catch (error) {
    console.error('Home images could not load; using the original images.', error);
    return {};
  }
}
