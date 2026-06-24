alter table public.articles
add column if not exists audio_url text not null default '';

insert into storage.buckets (id, name, public)
values ('article-audio', 'article-audio', true)
on conflict (id) do nothing;

drop policy if exists "Article audio is public" on storage.objects;
create policy "Article audio is public"
on storage.objects for select
using (bucket_id = 'article-audio');

drop policy if exists "Only admins can upload article audio" on storage.objects;
create policy "Only admins can upload article audio"
on storage.objects for insert
to authenticated
with check (bucket_id = 'article-audio' and public.is_admin());
