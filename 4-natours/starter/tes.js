const fs = require('fs')
const path = require('path')
key = '5c88fa8cf4afda39709c2955'
directory = path.join(__dirname, 'public', 'img', 'tours', '..')
// fs.readdir(path.join(__dirname, 'public', 'img', 'tours'), (err, files) => {
//   if (err) throw err;
//   files.forEach(file => {
//     console.log(file.split("-")[2].replace(".jpeg", ''))
//     if (file.includes(key)) {
//       if (file.split("-")[2].replace(".jpeg", '') < Date.now() - 10000)
//         fs.unlink(path.join(directory, file), err => {
//           if (err) throw err;
//           console.log(`Deleted file: ${file}`);
//         });
//     }
//   });
// })

console.log(directory)
console.log("ea coba".indexOf("coba"))