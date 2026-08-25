import { parsedArgs } from './src/commandExetractor.ts';
import { add } from './src/taskOperation.ts'

const { command, description } = parsedArgs;

if (command === 'add' && description) {
  add(description);
} else if (command === 'add') {
  console.log('Description is missed');
}


