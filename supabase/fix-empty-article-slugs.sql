update public.articles
set slug = trim(both '-' from regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'))
where trim(coalesce(slug, '')) = ''
  and trim(title) <> '';
