const sleep = (timeout) => {
  const start = Date.now();
  let end = null;
  do {
    end = Date.now();
  } while (end < start + timeout);
};

console.log("First message");
sleep(2000);
console.log("Timeout message");
