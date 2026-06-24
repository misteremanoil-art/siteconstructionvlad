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
returns public.admin_users
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  cleaned_email text;
  target_user auth.users;
  saved_admin public.admin_users;
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;

  cleaned_email := lower(trim(target_email));

  if cleaned_email = '' then
    raise exception 'missing email';
  end if;

  select * into target_user
  from auth.users
  where lower(email) = cleaned_email
  limit 1;

  if target_user.id is null then
    raise exception 'user not found';
  end if;

  insert into public.admin_users (user_id, email)
  values (target_user.id, cleaned_email)
  on conflict (user_id) do update set
    email = excluded.email
  returning * into saved_admin;

  return saved_admin;
end;
$$;

grant execute on function public.promote_user_to_admin(text) to authenticated;
