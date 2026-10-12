create table public.home_images (
  slot_key text primary key check (slot_key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  image_path text not null unique,
  alt_text text not null check (char_length(alt_text) between 1 and 300),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger home_images_updated_at
before update on public.home_images
for each row execute function public.gallery_set_updated_at();

alter table public.home_images enable row level security;

create policy "Anyone can read home images"
on public.home_images for select to anon, authenticated
using (true);

create policy "Admins can insert home images"
on public.home_images for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can update home images"
on public.home_images for update to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can delete home images"
on public.home_images for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

grant select on public.home_images to anon, authenticated;
grant insert, update, delete on public.home_images to authenticated;
