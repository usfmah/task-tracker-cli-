#!/usr/bin/env node
import { parsedArgs } from './src/commandExtractor.ts';
import { add, update, del, list, markInProgress, markDone } from './src/taskOperation.ts';
import { printHelp } from './src/utils/help.ts';

const { command, id, description } = parsedArgs;

switch (command) {
    case 'add': {
        if (!description) {
            console.log('Description is missed');
        } else {
            await add(description);
        }
        break;
    }
    case 'update': {
        if (!id || !description) {
            console.log('Usage: update <id> <description>');
        } else {
            await update(id, description);
        }
        break;
    }
    case 'delete': {
        if (!id) {
            console.log('Usage: delete <id>');
        } else {
            await del(id);
        }
        break;
    }
    case 'mark-in-progress': {
        if (!id) {
            console.log('Usage: mark-in-progress <id>');
        } else {
            await markInProgress(id);
        }
        break;
    }
    case 'mark-done': {
        if (!id) {
            console.log('Usage: mark-done <id>');
        } else {
            await markDone(id);
        }
        break;
    }
    case 'list': {
        await list(id);
        break;
    }
    case 'help': {
        printHelp();
        break;
    }
    case undefined: {
        printHelp();
        break;
    }
    default: {
        console.log(`Unknown command "${command}"\n`);
        printHelp();
        break;
    }
}
