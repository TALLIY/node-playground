import { promises as fs } from 'fs';

declare namespace mkdirp {
    interface Options {
        mode?: number | string;
        fs?: typeof fs;
    }

    type Callback = (err: NodeJS.ErrnoException | null, made?: string | null) => void;

    function mkdirp(path: string, opts?: Options | Callback, callback?: Callback): void;
}

declare function mkdirp(path: string, opts?: mkdirp.Options | mkdirp.Callback, callback?: mkdirp.Callback): void;

export { mkdirp };
export default mkdirp;
