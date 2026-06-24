# Supabase setup

1. Creează proiectul Supabase free.
2. În Supabase Dashboard, mergi la SQL Editor.
3. Rulează conținutul din `supabase/schema.sql`.
4. Creează utilizatorul admin în Authentication > Users.
5. După ce utilizatorul există, rulează:

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'EMAILUL_TAU_AICI'
on conflict (user_id) do nothing;
```

6. În `.env.local`, setează:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://ytsxayqrqfucyicnfqgb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

7. Intră în `/admin/login`, autentifică-te și creează articole.

## Conturi și recenzii

Dacă ai rulat schema înainte ca recenziile să fie adăugate, rulează separat:

```text
supabase/user-reviews.sql
```

Acest fișier creează:

- `profiles`
- `article_reviews`
- trigger pentru profil automat la înregistrare
- RLS pentru citire publică și editare/ștergere doar de către autorul recenziei

Notă: nu pune `service_role` în browser. Pentru acest proiect, adminul folosește Supabase Auth + RLS.
