create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_path text not null unique,
  category text not null check (category ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  alt_text text check (char_length(alt_text) <= 300),
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index gallery_images_order_idx on public.gallery_images (sort_order, created_at, id);
create index gallery_images_category_order_idx on public.gallery_images (category, sort_order, id);

create function public.gallery_set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger gallery_images_updated_at
before update on public.gallery_images
for each row execute function public.gallery_set_updated_at();

alter table public.admin_users enable row level security;
alter table public.gallery_images enable row level security;

create policy "Admins can read their own membership"
on public.admin_users for select to authenticated
using (user_id = (select auth.uid()));

create policy "Anyone can read gallery images"
on public.gallery_images for select to anon, authenticated
using (true);

create policy "Admins can insert gallery images"
on public.gallery_images for insert to authenticated
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can update gallery images"
on public.gallery_images for update to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

create policy "Admins can delete gallery images"
on public.gallery_images for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = (select auth.uid())));

grant select on public.admin_users to authenticated;
grant select on public.gallery_images to anon, authenticated;
grant insert, update, delete on public.gallery_images to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 8388608, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins can list gallery files"
on storage.objects for select to authenticated
using (
  bucket_id = 'gallery' and
  exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);

create policy "Admins can upload gallery files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'gallery' and
  (storage.foldername(name))[1] ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and
  exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);

create policy "Admins can delete gallery files"
on storage.objects for delete to authenticated
using (
  bucket_id = 'gallery' and
  exists (select 1 from public.admin_users where user_id = (select auth.uid()))
);

create function public.reorder_gallery_images(image_ids uuid[])
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if not exists (select 1 from public.admin_users where user_id = (select auth.uid())) then
    raise exception 'Not authorised';
  end if;

  if cardinality(image_ids) <> (select count(*) from public.gallery_images)
     or (select count(distinct items.id) from unnest(image_ids) as items(id)) <> cardinality(image_ids)
     or exists (select 1 from unnest(image_ids) as items(id) where not exists (select 1 from public.gallery_images g where g.id = items.id)) then
    raise exception 'The image order is out of date';
  end if;

  update public.gallery_images g
  set sort_order = positions.ordinality - 1
  from unnest(image_ids) with ordinality as positions(id, ordinality)
  where g.id = positions.id;
end;
$$;

revoke all on function public.reorder_gallery_images(uuid[]) from public;
grant execute on function public.reorder_gallery_images(uuid[]) to authenticated;
