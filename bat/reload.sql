DROP TABLE article;
-- sqlite3 xs.db;
CREATE  TABLE article 
(
  id    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body  TEXT NULL,
  url TEXT NULL,
  created TEXT NOT NULL DEFAULT (date('now'))
);