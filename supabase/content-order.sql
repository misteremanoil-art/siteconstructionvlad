alter table public.articles
add column if not exists display_order integer;

alter table public.videos
add column if not exists display_order integer;

create index if not exists articles_status_display_order_idx
  on public.articles (status, display_order, published_at desc);

create index if not exists videos_status_display_order_idx
  on public.videos (status, display_order, published_at desc);

with ordered_articles as (
  select
    id,
    row_number() over (order by published_at desc, created_at desc) as position
  from public.articles
)
update public.articles as articles
set display_order = ordered_articles.position
from ordered_articles
where articles.id = ordered_articles.id
  and articles.display_order is null;

with ordered_videos as (
  select
    id,
    row_number() over (order by published_at desc, created_at desc) as position
  from public.videos
)
update public.videos as videos
set display_order = ordered_videos.position
from ordered_videos
where videos.id = ordered_videos.id
  and videos.display_order is null;
