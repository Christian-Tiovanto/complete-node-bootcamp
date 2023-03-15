const fs = require('fs');
const http = require('http');
const url = require(`url`);

const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');
////////////////////////////
// FILE

// const { text } = require('stream/consumers')
// // Blocking Synchronous Way
// const textIn = fs.readFileSync(`./txt/input.txt`,'utf-8')

// const textOut = `definition of an avocado ${textIn},created on ${Date.now()}`

// fs.writeFileSync('./txt/output.txt',textOut)

// Non-Blocking, Asynchronous Way

// fs.readFile(`./txt/start.txt`,`utf-8`,(err,data1) => {
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2) => {
//         fs.readFile(`./txt/append.txt`,`utf-8`,(err,data3) => {
//             fs.writeFile(`./txt/final.txt`,data2+data3,(err) =>{
//                 if (err) throw err;
//                 console.log("yeay it`s saved");
//             });
//         });
//     });
// });
// console.log(`this will run first`);
/////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempproduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
const server = http.createServer((req, res) => {
  let tes = new URL(req.url, 'http://127.0.0.1:8000/');
  console.log(tes.searchParams.get('id'));
  const { query, pathname } = url.parse(req.url, true);
  // Overview Page
  if (pathname === `/` || pathname === `/overview`) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    res.end(tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml));
  } else if (pathname === '/product') {
    product = dataObj[query.id];
    output = replaceTemplate(tempproduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': `text/html`,
      'My-Own-Header': 'Hello-World',
    });
    res.end(`<h1>Page Not Found</h1>`);
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log(`listening to port 8000`);
});
