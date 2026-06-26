create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists username text;

alter table public.profiles
add column if not exists created_at timestamptz not null default now();

alter table public.profiles
add column if not exists updated_at timestamptz not null default now();

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

  if cleaned_username is null then
    raise exception 'invalid username';
  end if;

  if cleaned_username !~ '^[a-zA-Z0-9_]{3,32}$' then
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

grant execute on function public.ensure_my_profile() to authenticated;
grant execute on function public.set_my_username(text) to authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Profiles are readable by everyone" on public.profiles;
create policy "Profiles are readable by everyone"
on public.profiles for select
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

insert into public.profiles (id, username)
select id, nullif(regexp_replace(coalesce(raw_user_meta_data ->> 'username', ''), '[^a-zA-Z0-9_]', '', 'g'), '')
from auth.users
on conflict (id) do nothing;
