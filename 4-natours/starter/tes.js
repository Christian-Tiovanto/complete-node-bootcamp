const fs = require('fs');
// const writableStream = fs.createWriteStream('output.txt');
const readableStream = fs.createReadStream('output.txt');
const sharp = require('sharp');
readableStream.setEncoding('utf8');
readableStream.on('data', (data) => {
  sharp('output.txt')
    .png()
    .toFile('bg1.png', (err, info) => {
      console.log(err);
    });
});

// sharp({
//   create: {
//     width: 300,
//     height: 200,
//     channels: 4,
//     background: { r: 255, g: 0, b: 0, alpha: 0.5 },
//   },
// })
//   .png()
//   .toBuffer((err, data, info) => {
//     if (err) console.log(err);
//     writableStream.write(Buffer.from(data));
//   });
