create table if not exists public.site_texts (
  key text primary key,
  value text not null default '',
  group_label text not null default 'General',
  description text not null default '',
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.site_texts enable row level security;

drop trigger if exists site_texts_set_updated_at on public.site_texts;
create trigger site_texts_set_updated_at
before update on public.site_texts
for each row execute function public.set_updated_at();

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
