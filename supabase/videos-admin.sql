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
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists videos_status_published_at_idx
  on public.videos (status, published_at desc);

alter table public.videos
add column if not exists display_order integer;

create index if not exists videos_status_display_order_idx
  on public.videos (status, display_order, published_at desc);

create index if not exists videos_slug_idx
  on public.videos (slug);

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at
before update on public.videos
for each row execute function public.set_updated_at();

alter table public.videos enable row level security;

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

insert into public.videos
  (slug, title, description, platform, href, embed_url, thumbnail_url, published_at, duration, context, featured, status)
values
  (
    'frustrarea-credinciosului',
    'Frustrarea credinciosului. Este normal să fii supărat pe Dumnezeu?',
    'Reflecții biblice despre tensiunea sinceră dintre credință, suferință și întrebările adresate lui Dumnezeu.',
    'TV',
    'https://www.sperantatv.ro/reflectii-biblice-frustrarea-credinciosului-este-normal-sa-fii-suparat-pe-dumnezeu-invitati-lucian-tomoiaga-albert-cucu/',
    'https://www.youtube.com/embed/YSn1IGk4FjU',
    'https://www.sperantatv.ro/wp-content/uploads/2026/01/yt-thumb-eb038d95.jpg',
    '2026-01-01',
    'Reflecții biblice',
    'Speranța TV',
    true,
    'published'
  ),
  (
    'ispita-succesului',
    'Ispita succesului',
    'Un episod despre felul în care succesul poate deveni o presiune spirituală și morală atunci când își pierde locul firesc.',
    'TV',
    'https://www.sperantatv.ro/reflectii-biblice-ispita-succesului-invitati-lucian-tomoiaga-albert-cucu/',
    'https://www.youtube.com/embed/Q5qcaZYsloY',
    'https://www.sperantatv.ro/wp-content/uploads/2026/03/yt-thumb-a5a56085.jpg',
    '2026-03-01',
    'Reflecții biblice',
    'Speranța TV',
    false,
    'published'
  ),
  (
    'lumea-si-influenta-ei-1',
    'Lumea și influența ei (I). Cum te schimbă lumea fără să-ți dai seama?',
    'O conversație despre influențele subtile care modelează gândirea, valorile și viața spirituală.',
    'TV',
    'https://www.sperantatv.ro/reflectii-biblice-lumea-si-influenta-ei-i-cum-te-schimba-lumea-fara-sa-ti-dai-seama-invitati-gabriel-stefanita-albert-cucu/',
    'https://www.youtube.com/embed/SDIH352iom4',
    'https://www.sperantatv.ro/wp-content/uploads/2026/05/yt-thumb-0c917ce7.jpg',
    '2026-05-01',
    'Reflecții biblice',
    'Speranța TV',
    false,
    'published'
  ),
  (
    'lumea-si-influenta-ei-2',
    'Lumea și influența ei (II)',
    'Continuarea discuției despre influența lumii asupra identității, alegerilor și sensibilității spirituale.',
    'YouTube',
    'https://youtu.be/USz-NuNkd_c',
    'https://www.youtube.com/embed/USz-NuNkd_c',
    'https://i.ytimg.com/vi/USz-NuNkd_c/hqdefault.jpg',
    '2026-06-01',
    'Reflecții biblice, s02 ep. 34',
    'Proiect M',
    false,
    'published'
  ),
  (
    'de-ce-ne-am-pierdut-rabdarea',
    'De ce ne-am pierdut răbdarea?',
    'Un dialog despre ritmul vieții moderne, nerăbdare și felul în care se poate trăi mai așezat.',
    'YouTube',
    'https://youtu.be/pPgJvcDAJWI',
    'https://www.youtube.com/embed/pPgJvcDAJWI',
    'https://i.ytimg.com/vi/pPgJvcDAJWI/hqdefault.jpg',
    '2026-06-01',
    'Se poate altfel, s01 ep. 08',
    'Proiect M',
    false,
    'published'
  ),
  (
    'dumnezeu-bun-potop-global',
    'De ce un Dumnezeu bun trimite un potop global',
    'O discuție biblică despre judecată, bunătatea lui Dumnezeu și întrebările dificile ridicate de textul Scripturii.',
    'YouTube',
    'https://youtu.be/uUiw-8nhdJk',
    'https://www.youtube.com/embed/uUiw-8nhdJk',
    'https://i.ytimg.com/vi/uUiw-8nhdJk/hqdefault.jpg',
    '2026-06-01',
    'Vorbe din Text, s01 ep. 10',
    'Proiect M',
    false,
    'published'
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  platform = excluded.platform,
  href = excluded.href,
  embed_url = excluded.embed_url,
  thumbnail_url = excluded.thumbnail_url,
  published_at = excluded.published_at,
  duration = excluded.duration,
  context = excluded.context,
  featured = excluded.featured,
  status = excluded.status,
  updated_at = now();
