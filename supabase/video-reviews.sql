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

drop trigger if exists video_reviews_set_updated_at on public.video_reviews;
create trigger video_reviews_set_updated_at
before update on public.video_reviews
for each row execute function public.set_updated_at();

alter table public.video_reviews enable row level security;

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
