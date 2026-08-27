import { isErrnoException } from './utils/helpers.ts';
import * as fs from 'node:fs/promises';
import type { Task } from './types.ts';

export async function read(): Promise<Task[]> {
    try {
        const filePath = new URL('../database/tasks.json', import.meta.url);
        const contents = await fs.readFile(filePath, { encoding: 'utf8' });
  
        return JSON.parse(contents) as Task[];
    } catch (err) {
        if (isErrnoException(err) && err.code === 'ENOENT') {
            return []; 
        }
        throw err;
    }
}
