export function timesTwoCallback(num, callback) {
  callback(num * 2);
}
export function timesTwoPromise(num) {
  return new Promise((resolve, reject) => {
    timesTwoCallback(num, res => {
      resolve(res);
    });
  });
}

(async () => {
  timesTwoPromise(1)
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });

  const result = await timesTwoPromise(1).catch(e => {
    console.log(e);
  });
  console.log(result);

  timesTwoCallback(1, res => {
    console.log(res);
  });
})().catch(e => {
  console.log(e);
});
