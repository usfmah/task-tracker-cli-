import { argv } from 'node:process';

interface ParsedArgs {
    command: string | undefined;
    id: string | undefined;
    description: string | undefined;
}

function parseArgs(args: readonly string[]): ParsedArgs {
    const [rawCommand, ...rest] = args;
    const command = rawCommand?.toLowerCase();

    if (command === 'add') {
        return {
            command,
            id: undefined,
            description: rest.join(' ') || undefined,
        };
    }

    if (command === 'update') {
        const [id, ...descParts] = rest;
        return {
            command,
            id,
            description: descParts.join(' ') || undefined,
        };
    }

    const [id, ...descParts] = rest;
    return {
        command,
        id,
        description: descParts.join(' ') || undefined,
    };
}

const parsedArgs = parseArgs(argv.slice(2));

export { parseArgs, parsedArgs };
