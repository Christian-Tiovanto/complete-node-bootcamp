const fs = require("fs");

const server = require("http").createServer();

// Solution NO 1
server.on("request", (err, res) => {
  //   fs.readFile("test-file.txt", (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.end(data);
  //   });
  // });

  // Solution NO 2

  // const readable = fs.createReadStream("./test-file.txt");

  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found");
  // });

  // Solution No 3
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening");
});
