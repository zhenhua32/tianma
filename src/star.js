const sqlite3 = require('sqlite3');
const cheerio = require('cheerio');
const request = require('request');
const phantomjs = require('phantomjs-prebuilt');
const URL = require('url');

let db = new sqlite3.Database('../db/npm.db', function (err) {
  if (err) console.error('db ' + err);
});

// 插入数据, 顺序是不能保证的
let INSERT = 'INSERT INTO package (num, title, url) VALUES($num, $title, $url)';
function save(n, t, u) {
  db.run(INSERT, {
    $num: n,
    $title: t,
    $url: u
  }, function (err) {
    if (err) console.error('insert ' + err);
  })
}

// 处理网页, 获取数据
function handleBody(body, offset, link) {
  let data = [];
  let index = offset + 1;

  let $ = cheerio.load(body);
  let uls = $('body > div.container.content ul');
  // 具体细节, 会根据网页变化而失效
  for (let i = 0; i < uls.length; i++) {
    let lis = $('li', uls[i]);
    for (let j = 0; j < 3; j++) {
      data.push({
        num: index,
        title: $('h3 a', lis[j]).text(),
        url: URL.resolve(Base, $('h3 a', lis[j]).attr('href'))
      });
      index++;
    }
  }

  if (data.length < 36) {
    //这里重试
    console.log(link);
    console.log(offset);
    loadpage(link, offset);
  }

  //顺序无法保证
  for (let i = 0; i < data.length; i++) {
    save(data[i].num, data[i].title, data[i].url);
  }

}

// 使用这个无法翻墙
// function loadpage(link, offset) {
//   request.get(link + offset, function (err, response, body) {
//     if (!err && response.statusCode == 200) {
//       handleBody(body);
//     } else {
//       console.error(err);
//     }
//   })
// }

// 使用这个如果电脑开了ss, 可以翻墙, 而且对于动态网页也不错
function loadpage(link, offset) {
  let load = phantomjs.exec('./phantom/loadpage.js', link + offset);
  let body = '';
  let readable = load.stdout;
  // load.stderr.pipe(process.stderr);
  let errable = load.stderr;

  readable.on('data', chunk => {
    body += chunk;
  });

  let errbody = '';
  errable.on('data', chunk => {
    errbody += chunk;
    console.log('errbody ' + chunk);
  });

  load.on('exit', code => {
    if (errbody) console.log('errbody ' + errbody);
    if (code === 0 && body && body !== 'fail') {
      handleBody(body, offset, link);
    } else {
      console.error(code);
      console.error('fail');
      // 无限重试
      loadpage(link, offset);
    }
  });
}

// 定义初始链接, 基础链接, 和偏移
let Baselink = 'https://www.npmjs.com/browse/star?offset=';
let Base = 'https://www.npmjs.com/';
let Interval = 36;

// for循环会同时打开, 巨卡, 所以做延迟, 还好这并不要求前后关系
for (let i = 0; i < 100; i++) {
  setTimeout(function () {
    loadpage(Baselink, i * Interval);
  }, 5000 * i);
}

//根本不行, 还是有漏掉的可能
