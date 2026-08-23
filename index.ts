import {commandArgument, commandDescription} from './src/commandExetractor.ts';
import {add, update, del, list} from './src/taskOperation.ts'

if(commandArgument === 'add' && commandDescription) {
    add(commandDescription)
  } else if (commandArgument === 'add' && !commandDescription) {
    console.log('Description is missed')
  }


