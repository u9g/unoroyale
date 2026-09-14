-- Hidden matchmaking rating, one row per install. Trophies stay in the app's
-- profile until the ladder moves server-side; see ranked.ts.
create table if not exists ratings (
  device_id text primary key,
  rating integer not null default 1000,
  matches integer not null default 0,
  trophies integer not null default 0,
  updated text not null default current_timestamp
);

-- One row per settled match, so trophy movement can be audited or replayed
create table if not exists matches (
  id text primary key,
  ts text not null default current_timestamp,
  device_id text not null,
  opponent text not null,
  opponent_kind text not null check (opponent_kind in ('bot', 'human')),
  won integer not null check (won in (0, 1)),
  seed integer not null,
  turns integer not null,
  rating_before integer not null,
  rating_after integer not null,
  trophies_after integer not null
);
