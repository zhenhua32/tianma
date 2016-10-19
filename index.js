const sqlite3 = require('sqlite3');
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const async = require('async');

let db = new sqlite3.Database('./db/xs.db', function (err) {
  if (err) console.error(err);
});

let www = 'http://gold.xitu.io/tag/JavaScript';
let chrome = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36';
let options = {
  headers: {
    'User-Agent': chrome
  },
  url: www
};

request.get(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    handleBody(body);
  } else {
    console.error(error);
  }
});

function handleBody(body) {
  let $ = cheerio.load(body);
  console.log(body);
  let li = $('body div.index-view  div.main  div.container ul li.entry-item');
  console.log(li.text());
  let test = $('body div:nth-child(0)');
  console.log(test.text());
  console.log(typeof test)
}








// db.run('INSERT INTO article (title, body) VALUES($title, $body) ', {
//   $title: 'hello',
//   $body: 'world'
// });

// db.get('SELECT * FROM article', function (err, row) {
//   console.log(row);
// });

// db.all('SELECT * FROM article', function (err, row) {
//   console.log(row);
// });

// db.run('DELETE FROM article', function (err) {
//   if (err) console.error(err);
// });

