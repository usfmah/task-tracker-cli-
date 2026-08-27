import { read, write } from './storage.ts';
import { nextId, nowISO, findTaskIndex, logNotFound } from './utils/helpers.ts';
import type { Task } from './types.ts';

async function add(description: string): Promise<void> {
    const tasks = await read();
    const now = nowISO();

    const task: Task = {
        id: nextId(tasks),
        description,
        status: 'todo',
        createdAt: now,
        updatedAt: now,
    };

    tasks.push(task);
    await write(tasks);

    console.log(`Task added successfully (ID: ${task.id})`);
}

async function update(id: string, description: string): Promise<void> {
    const tasks = await read();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
        logNotFound(id);
        return;
    }

    tasks[index]!.description = description;
    tasks[index]!.updatedAt = nowISO();

    await write(tasks);

    console.log(`Task updated successfully (ID: ${id})`);
}

async function del(id: string): Promise<void> {
    const tasks = await read();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
        logNotFound(id);
        return;
    }

    tasks.splice(index, 1);
    await write(tasks);

    console.log(`Task deleted successfully (ID: ${id})`);
}

async function list(status?: string): Promise<void> {
    const tasks = await read();

    let filtered = tasks;

    if (status) {
        const allowed: Task['status'][] = ['todo', 'in-progress', 'done'];
        if (!allowed.includes(status as Task['status'])) {
            console.log(`Invalid status "${status}". Use: todo, in-progress, done`);
            return;
        }
        filtered = tasks.filter((t) => t.status === status);
    }

    if (filtered.length === 0) {
        console.log(status ? `No tasks with status "${status}"` : 'No tasks found');
        return;
    }

    console.log(JSON.stringify(filtered, null, 2));
}

async function markInProgress(id: string): Promise<void> {
    const tasks = await read();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
        logNotFound(id);
        return;
    }

    tasks[index]!.status = 'in-progress';
    tasks[index]!.updatedAt = nowISO();

    await write(tasks);

    console.log(`Task marked as in-progress (ID: ${id})`);
}

async function markDone(id: string): Promise<void> {
    const tasks = await read();
    const index = findTaskIndex(tasks, id);

    if (index === -1) {
        logNotFound(id);
        return;
    }

    tasks[index]!.status = 'done';
    tasks[index]!.updatedAt = nowISO();

    await write(tasks);

    console.log(`Task marked as done (ID: ${id})`);
}

export { add, update, del, list, markInProgress, markDone };
