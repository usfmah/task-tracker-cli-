export function printHelp(): void {
    console.log(`Usage: task-cli <command> [args]

Commands:
  add <description>             Add a new task
  update <id> <description>     Update task description
  delete <id>                   Delete a task
  mark-in-progress <id>         Mark task as in-progress
  mark-done <id>                Mark task as done
  list [status]                 List tasks (status: todo | in-progress | done)
  help                          Show this help

Examples:
  task-cli add "Buy milk"
  task-cli update 1 "Buy milk and bread"
  task-cli mark-done 1
  task-cli list
  task-cli list done`);
}
