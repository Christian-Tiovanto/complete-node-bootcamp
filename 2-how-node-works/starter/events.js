const EventEmitter = require("events");
const http = require("http");
const url = require(`url`);
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("newsale", (stock) => {
  console.log(`there are now ${stock} items left in stock`);
});

myEmitter.on("newsale", () => {
  console.log("Customer Name : Christian");
});

myEmitter.emit("newsale", 9);

////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  console.log(`request received`);
  res.end("request received");
});
server.on;
server.on("request", (req, res) => {
  console.log(`another request`);
});

server.on("close", (req, res) => {
  console.log(`end`);
});
server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for requests");
});
