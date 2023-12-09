const tes = async () => {
  console.log('ea');
  const result1 = await new Promise((resolve) => {
    resolve(1);
  });
  console.log('babik');
  const result2 = await new Promise((resolve) =>
    setTimeout(() => resolve('2'))
  );
  console.log(result1);
};

const coba = async () => {
  await tes();
  console.log('adfadf');
};

coba();
