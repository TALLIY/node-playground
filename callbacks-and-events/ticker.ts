import { EventEmitter } from "stream";

const ticker = (
  num_ms: number,
  total_num_ms: number,
  callback: (err: Error | null, n?: number) => void
): EventEmitter => {
  const t_0 = Date.now();
  let ticks = 0;
  const eventEmitter = new EventEmitter();
  process.nextTick(() => eventEmitter.emit("tick", ticks, Date.now()));

  const timeout = () => {
    setTimeout(() => {
      ticks += 1;
      if (Date.now() % 5 === 0) {
        callback(new Error("Error: Timestamp is divisible by 5"));
        eventEmitter.emit(
          "error",
          new Error("Error: Timestamp is divisible by 5")
        );
      }
      eventEmitter.emit("tick", ticks);
      const t_1 = Date.now();
      t_1 - t_0 < total_num_ms ? timeout() : callback(null, ticks);
    }, num_ms);
  };

  timeout();

  return eventEmitter;
};

ticker(50, 350, (err: Error | null, ticks?: number) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("final tick count: ", ticks);
  }
})
  .on("tick", (ticks?: number) => {
    console.log("current tick count: ", ticks);
  })
  .on("error", (err) => console.log("Error emitted: ", err));
