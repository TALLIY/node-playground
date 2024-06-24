import { EventEmitter } from "stream";

const ticker = (
  num_ms: number,
  callback: (n: number) => void
): EventEmitter => {
  let ticks = 0;
  const eventEmitter = new EventEmitter();
  process.nextTick(() => eventEmitter.emit("tick", ticks));

  const setTimeout50ms = () => {
    setTimeout(() => {
      ticks += 1;
      eventEmitter.emit("tick", ticks);
      ticks * 50 < num_ms ? setTimeout50ms() : callback(ticks);
    });
  };

  setTimeout50ms();

  return eventEmitter;
};

ticker(350, (ticks: number) => {
  console.log("final tick count: ", ticks);
}).on("tick", (ticks) => {
  console.log("current tick count: ", ticks);
});
