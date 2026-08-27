import { isErrnoException } from './utils/helpers.ts';
import { tasksFilePath, tasksDirPath } from './utils/paths.ts';
import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import type { Task } from './types.ts';

export async function read(): Promise<Task[]> {
    try {
        const stream = createReadStream(tasksFilePath);
        const chunks: Buffer[] = [];

        for await (const chunk of stream) {
            chunks.push(chunk as Buffer);
        }

        if (chunks.length === 0) return [];

        const buffer = Buffer.concat(chunks);
        const contents = buffer.toString('utf8');

        if (contents.trim() === '') return [];

        return JSON.parse(contents) as Task[];
    } catch (err: unknown) {
        if (isErrnoException(err) && err.code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

export async function write(tasks: Task[]): Promise<void> {
    await fs.mkdir(tasksDirPath, { recursive: true });

    const json = JSON.stringify(tasks, null, 2);
    const buffer = Buffer.from(json, 'utf8');

    await pipeline(Readable.from(buffer), createWriteStream(tasksFilePath));
}
