const fs = require("fs");
const superagent = require("superagent");

const readfilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("couldnt find the file");
      }
      resolve(data);
    });
  });
};

const writefilePro = (location, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(location, data, (err) => {
      if (err) {
        reject("couldnt write the file");
      }
      resolve("Saving Img Dog Done");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readfilePro("./dog.txt");
    console.log(`Breed : ${data}`);

    const res = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res, res2, res3]);
    const logs = all.map((el) => el.body.message).join(`\n`);
    await writefilePro("dog-img.txt", logs);
    console.log("Saving Img Dog Done");
  } catch (err) {
    console.log(`ngeror`);
    throw err;
  }
  return `2. Dog pics kocol`;
};

/*
readfilePro("./dog.txt")
.then((data) => {
  console.log(`Breed : ${data}`);
  return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then((res) => {
  return writefilePro("dog-img.txt", res.body.message);
})
.then((res) => console.log(res))
.catch((err) => {
  console.log(err);
});
*/

console.log(`1. Will get Dog pics`);
getDogPic()
  .then((x) => {
    console.log(x);
    console.log(`3. Done Getting dog pics`);
  })
  .catch((err) => {
    console.log(err);
  });
