import path from "path";
import { URL } from "url";
import slug from "slug";

export const urlToFilename = (url: string): string => {
  const parsedUrl = new URL(url);
  const urlPath = parsedUrl.pathname
    .split("/")
    .filter((component) => component !== "")
    .map((component) => slug(component, { remove: null }))
    .join("/");

  let filename = path.join(parsedUrl.hostname, urlPath);
  if (!path.extname(filename).match(/htm/)) {
    filename += ".html";
  }

  return filename;
};
