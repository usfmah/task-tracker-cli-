import { argv } from 'node:process';

interface ParsedArgs {
    command: string | undefined;
    id: string | undefined;
    description: string | undefined;
}

function parseArgs(args: readonly string[]): ParsedArgs {
    const [command, id, ...rest] = args;

    return {
        command: command?.toLowerCase(),
        id,
        description: rest.length > 0 ? rest.join(' ') : undefined,
    };
}

const parsedArgs = parseArgs(argv.slice(2));

export { parseArgs, parsedArgs };
