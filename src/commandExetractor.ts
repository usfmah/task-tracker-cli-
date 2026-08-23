import { argv } from 'node:process';

const commandArgument: string | undefined = argv[2]?.toLowerCase();
const commandDescription: string | undefined = argv[3]

export {commandArgument, commandDescription}; 