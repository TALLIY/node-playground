import { EventEmitter } from "events";
import { readFile } from "fs";

class FindRegex extends EventEmitter {
  regex: RegExp;
  files: string[];
  constructor(regex: RegExp) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file: string) {
    this.files.push(file);
    return this;
  }
  find() {
    process.nextTick(() => this.emit("now finding", this.files));
    for (const file of this.files) {
      readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }
        this.emit("fileread", file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit("found", file, elem));
        }
      });
    }
    return this;
  }
}

const findRegexSyncInstance = new FindRegex(/hello \w+/);
findRegexSyncInstance
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .on("found", (file, match) => {
    console.log(file);
    console.log(`[Before] Matched "${match}"`);
  })
  .find()
  .on("found", (file, match) => console.log(`[After] Matched "${match}"`))
  .on("now finding", () => {
    console.log("now finding");
  });
