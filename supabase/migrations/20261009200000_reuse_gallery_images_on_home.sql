-- A gallery photo may appear in more than one home position. Its source row
-- stays protected from deletion while any home position refers to it.
alter table public.home_images drop constraint home_images_image_path_key;

alter table public.home_images
  add column gallery_image_id uuid references public.gallery_images(id) on delete restrict;

create index home_images_gallery_image_id_idx
  on public.home_images (gallery_image_id)
  where gallery_image_id is not null;
