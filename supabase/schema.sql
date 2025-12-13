
-- Create posts table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content jsonb,
  cover_image text,
  published boolean default false,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS
alter table posts enable row level security;

-- Policies
create policy "Public posts are viewable by everyone"
  on posts for select
  using ( published = true );

create policy "Admins can do everything"
  on posts for all
  using ( auth.role() = 'authenticated' );

-- Storage
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

create policy "Images are viewable by everyone"
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Admins can upload images"
  on storage.objects for insert
  with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Admins can update images"
  on storage.objects for update
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Admins can delete images"
  on storage.objects for delete
  using ( bucket_id = 'images' and auth.role() = 'authenticated' );
