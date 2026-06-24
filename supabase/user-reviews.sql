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

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    nullif(regexp_replace(coalesce(new.raw_user_meta_data ->> 'username', ''), '[^a-zA-Z0-9_]', '', 'g'), '')
  )
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

alter table public.profiles enable row level security;
alter table public.article_reviews enable row level security;

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
