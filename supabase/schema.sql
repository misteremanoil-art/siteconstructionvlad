create extension if not exists pg_trgm;

do $$
begin
  create type article_status as enum ('draft', 'published');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to authenticated;

create or replace function public.promote_user_to_admin(target_email text)
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  cleaned_email text;
  target_user_id uuid;
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;

  cleaned_email := nullif(lower(trim(target_email)), '');

  if cleaned_email is null then
    raise exception 'missing email';
  end if;

  select id into target_user_id
  from auth.users
  where lower(email) = cleaned_email
  limit 1;

  if target_user_id is null then
    raise exception 'user not found';
  end if;

  insert into public.admin_users (user_id, email)
  values (target_user_id, cleaned_email)
  on conflict (user_id) do update set
    email = excluded.email;
end;
$$;

grant execute on function public.promote_user_to_admin(text) to authenticated;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  standfirst text not null default '',
  category text not null default 'Teologie',
  author text not null default 'Albert-Beniamin Cucu',
  published_at date not null default current_date,
  display_date text not null default '',
  reading_time text not null default '',
  image_url text not null default '',
  image_alt text not null default '',
  audio_url text not null default '',
  tags text[] not null default '{}',
  featured boolean not null default false,
  content text not null default '',
  status article_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_at_idx
  on public.articles (status, published_at desc);

create index if not exists articles_slug_idx
  on public.articles (slug);

alter table public.articles
add column if not exists audio_url text not null default '';

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  platform text not null default 'YouTube' check (platform in ('YouTube', 'Facebook', 'TV')),
  href text not null default '',
  embed_url text not null default '',
  thumbnail_url text not null default '',
  published_at date not null default current_date,
  duration text not null default '',
  context text not null default '',
  featured boolean not null default false,
  status article_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists videos_status_published_at_idx
  on public.videos (status, published_at desc);

create index if not exists videos_slug_idx
  on public.videos (slug);

create or replace function public.search_published_articles(search_query text)
returns setof public.articles
language sql
stable
as $$
  select *
  from public.articles
  where
    status = 'published'
    and to_tsvector(
      'simple',
      coalesce(title, '') || ' ' ||
      coalesce(standfirst, '') || ' ' ||
      coalesce(category, '') || ' ' ||
      coalesce(array_to_string(tags, ' '), '') || ' ' ||
      coalesce(content, '')
    ) @@ plainto_tsquery('simple', search_query)
  order by
    ts_rank(
      to_tsvector(
        'simple',
        coalesce(title, '') || ' ' ||
        coalesce(standfirst, '') || ' ' ||
        coalesce(category, '') || ' ' ||
        coalesce(array_to_string(tags, ' '), '') || ' ' ||
        coalesce(content, '')
      ),
      plainto_tsquery('simple', search_query)
    ) desc,
    published_at desc;
$$;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.site_texts (
  key text primary key,
  value text not null default '',
  group_label text not null default 'General',
  description text not null default '',
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at
before update on public.videos
for each row execute function public.set_updated_at();

drop trigger if exists site_texts_set_updated_at on public.site_texts;
create trigger site_texts_set_updated_at
before update on public.site_texts
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_texts enable row level security;

drop policy if exists "Admins can read admin list" on public.admin_users;
create policy "Admins can read admin list"
on public.admin_users for select
to authenticated
using (public.is_admin());

drop policy if exists "Published articles are readable by everyone" on public.articles;
create policy "Published articles are readable by everyone"
on public.articles for select
using (status = 'published' or public.is_admin());

drop policy if exists "Only admins can insert articles" on public.articles;
create policy "Only admins can insert articles"
on public.articles for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Only admins can update articles" on public.articles;
create policy "Only admins can update articles"
on public.articles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Only admins can delete articles" on public.articles;
create policy "Only admins can delete articles"
on public.articles for delete
to authenticated
using (public.is_admin());

drop policy if exists "Published videos are readable by everyone" on public.videos;
create policy "Published videos are readable by everyone"
on public.videos for select
using (status = 'published' or public.is_admin());

drop policy if exists "Only admins can insert videos" on public.videos;
create policy "Only admins can insert videos"
on public.videos for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Only admins can update videos" on public.videos;
create policy "Only admins can update videos"
on public.videos for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Only admins can delete videos" on public.videos;
create policy "Only admins can delete videos"
on public.videos for delete
to authenticated
using (public.is_admin());

drop policy if exists "Anyone can subscribe to newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to newsletter"
on public.newsletter_subscribers for insert
to anon, authenticated
with check (email <> '');

drop policy if exists "Only admins can read subscribers" on public.newsletter_subscribers;
create policy "Only admins can read subscribers"
on public.newsletter_subscribers for select
to authenticated
using (public.is_admin());

drop policy if exists "Anyone can send contact messages" on public.contact_messages;
create policy "Anyone can send contact messages"
on public.contact_messages for insert
to anon, authenticated
with check (name <> '' and email <> '' and message <> '');

drop policy if exists "Only admins can read contact messages" on public.contact_messages;
create policy "Only admins can read contact messages"
on public.contact_messages for select
to authenticated
using (public.is_admin());

drop policy if exists "Site texts are readable by everyone" on public.site_texts;
create policy "Site texts are readable by everyone"
on public.site_texts for select
using (true);

drop policy if exists "Only admins can insert site texts" on public.site_texts;
create policy "Only admins can insert site texts"
on public.site_texts for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Only admins can update site texts" on public.site_texts;
create policy "Only admins can update site texts"
on public.site_texts for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Only admins can delete site texts" on public.site_texts;
create policy "Only admins can delete site texts"
on public.site_texts for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('article-audio', 'article-audio', true)
on conflict (id) do nothing;

drop policy if exists "Article images are public" on storage.objects;
create policy "Article images are public"
on storage.objects for select
using (bucket_id = 'article-images');

drop policy if exists "Only admins can upload article images" on storage.objects;
create policy "Only admins can upload article images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "Article audio is public" on storage.objects;
create policy "Article audio is public"
on storage.objects for select
using (bucket_id = 'article-audio');

drop policy if exists "Only admins can upload article audio" on storage.objects;
create policy "Only admins can upload article audio"
on storage.objects for insert
to authenticated
with check (bucket_id = 'article-audio' and public.is_admin());

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_length check (username is null or length(username) between 3 and 32),
  constraint username_format check (username is null or username ~ '^[a-zA-Z0-9_]+$')
);

create table if not exists public.article_reviews (
  id uuid primary key default gen_random_uuid(),
  article_slug text not null references public.articles(slug) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null check (length(body) between 3 and 1200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (article_slug, user_id)
);

create index if not exists article_reviews_article_slug_created_at_idx
  on public.article_reviews (article_slug, created_at desc);

create table if not exists public.video_reviews (
  id uuid primary key default gen_random_uuid(),
  video_slug text not null,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null check (length(body) between 3 and 1200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (video_slug, user_id)
);

create index if not exists video_reviews_video_slug_created_at_idx
  on public.video_reviews (video_slug, created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.set_my_username(new_username text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  cleaned_username text;
  saved_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  cleaned_username := nullif(trim(new_username), '');

  if cleaned_username is not null and cleaned_username !~ '^[a-zA-Z0-9_]{3,32}$' then
    raise exception 'invalid username';
  end if;

  insert into public.profiles (id, username)
  values (auth.uid(), cleaned_username)
  on conflict (id) do update set
    username = excluded.username,
    updated_at = now()
  returning * into saved_profile;

  return saved_profile;
end;
$$;

grant execute on function public.set_my_username(text) to authenticated;

create or replace function public.ensure_my_profile()
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  saved_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  insert into public.profiles (id)
  values (auth.uid())
  on conflict (id) do nothing;

  select * into saved_profile
  from public.profiles
  where id = auth.uid();

  return saved_profile;
end;
$$;

grant execute on function public.ensure_my_profile() to authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists article_reviews_set_updated_at on public.article_reviews;
create trigger article_reviews_set_updated_at
before update on public.article_reviews
for each row execute function public.set_updated_at();

drop trigger if exists video_reviews_set_updated_at on public.video_reviews;
create trigger video_reviews_set_updated_at
before update on public.video_reviews
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.article_reviews enable row level security;
alter table public.video_reviews enable row level security;

drop policy if exists "Profiles are readable by everyone" on public.profiles;
create policy "Profiles are readable by everyone"
on public.profiles for select
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (id = auth.uid());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "Reviews are readable by everyone" on public.article_reviews;
create policy "Reviews are readable by everyone"
on public.article_reviews for select
using (true);

drop policy if exists "Users can insert their own reviews" on public.article_reviews;
create policy "Users can insert their own reviews"
on public.article_reviews for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update their own reviews" on public.article_reviews;
create policy "Users can update their own reviews"
on public.article_reviews for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can delete their own reviews" on public.article_reviews;
create policy "Users can delete their own reviews"
on public.article_reviews for delete
to authenticated
using (user_id = auth.uid());

drop policy if exists "Video reviews are readable by everyone" on public.video_reviews;
create policy "Video reviews are readable by everyone"
on public.video_reviews for select
using (true);

drop policy if exists "Users can insert their own video reviews" on public.video_reviews;
create policy "Users can insert their own video reviews"
on public.video_reviews for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Users can update their own video reviews" on public.video_reviews;
create policy "Users can update their own video reviews"
on public.video_reviews for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "Users can delete their own video reviews" on public.video_reviews;
create policy "Users can delete their own video reviews"
on public.video_reviews for delete
to authenticated
using (user_id = auth.uid());
