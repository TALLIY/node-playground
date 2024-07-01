import fs from "fs";
import path from "path";
import { urlToFilename } from "./utils";
import superagent from "superagent";
import mkdirp from './types/mkdirp';

export const crawler = (url: string, cb: (...args: unknown[]) => unknown) => {
  const file = fs.readFile(
    urlToFilename(url),
    "utf8",
    (err: Error | null, contents) => {
      if (err) {
        if (err.name !== "ENOENT") {
          cb(err);
        }

        return download;
      }
    }
  );
};

const saveFile = (filename, contents, cb) => {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb);
  });
};

const download = (
  url: string,
  filename: string,
  cb: (...args: unknown[]) => unknown
) => {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
};
