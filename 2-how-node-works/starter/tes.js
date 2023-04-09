const tes = (data, callback) => {
  if (data == "user") {
    callback("tes");
  } else if (data == "tepan") {
    callback("tesa", "tesi");
  }
};

tes("user", (data) => {
  console.log(data);
});
tes("tepan", (data, ahay) => {
  console.log(data);
  console.log(ahay);
});
