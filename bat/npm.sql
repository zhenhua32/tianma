-- sqlite3 npm.db;
CREATE  TABLE package
(
  id    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  num INTEGER NOT NULL,
  title TEXT NOT NULL,
  body  TEXT NULL,
  url TEXT NULL,
  created TEXT NOT NULL DEFAULT (date('now'))
);