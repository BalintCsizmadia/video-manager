DROP TABLE IF EXISTS videos;

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    duration TEXT NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    is_available BOOLEAN
)
