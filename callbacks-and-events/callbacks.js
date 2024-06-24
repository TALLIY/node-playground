const task1 = (cb) => {
  setTimeout(cb, 50);
};

const main = () => {
  console.log("before task 1");
  task1(() => {
    console.log("task 1 ran");
  });
  console.log("after task 1");
};

main()

let x = 1;
console.log(++x)