-- Schimbă emailul de mai jos cu emailul contului tău.
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where lower(email) = lower('emailul-tau-aici@example.com')
on conflict (user_id) do update set
  email = excluded.email;
