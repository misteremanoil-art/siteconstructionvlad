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
