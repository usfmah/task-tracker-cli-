# Task Tracker CLI

A simple file-based task tracker CLI built with **TypeScript** and **Node.js native APIs** — no external dependencies. Tasks are persisted as JSON on disk via buffered streams.

## Features

- `add` — create a task
- `update` — edit description
- `delete` — remove a task
- `mark-in-progress` / `mark-done` — change status
- `list` — show all tasks or filter by `todo` / `in-progress` / `done`
- `help` — show usage and examples

## Tech Stack

- **TypeScript 5.9** (`strict`, `noUncheckedIndexedAccess`, `moduleResolution: nodenext`)
- **Node.js 22+** — native `fs` streams + `Buffer`, `pipeline`, `for-await`
- No frameworks — only `typescript`, `@types/node`

## Project Structure

```
.
├── index.ts                 # CLI entry — parses args, dispatches commands
├── src/
│   ├── commandExtractor.ts  # parseArgs(args) → {command, id, description}
│   ├── storage.ts           # read()/write() — Buffer + Read/Write streams
│   ├── taskOperation.ts     # add/update/del/list/mark*  business logic
│   ├── types.ts             # Task interface
│   └── utils/
│       ├── helpers.ts       # isErrnoException, nextId, nowISO, findTaskIndex, logNotFound
│       ├── paths.ts         # tasksFilePath / tasksDirPath
│       └── help.ts          # printHelp()
├── database/
│   └── tasks.json           # created on first write
├── package.json             # bin: { "task-cli": "./index.ts" }
└── tsconfig.json            # module/moduleResolution: nodenext
```

## Data Model

```ts
interface Task {
  id: string;                // incremental max+1, never reused
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;         // ISO 8601
  updatedAt: string;
}
```

## Installation

```bash
git clone https://github.com/usfmah/task-tracker-cli-.git
cd taskTrackerCli
npm install
```

### Use as `task-cli` command

```bash
chmod +x index.ts
npm link           # installs `task-cli` globally (requires Node >=22)
# now `task-cli` is on PATH
```

Or without linking:

```bash
node index.ts add "Buy milk"
npm start -- add "Buy milk"   # via package.json
```

## Usage

```bash
task-cli add <description>
task-cli update <id> <description>
task-cli delete <id>
task-cli mark-in-progress <id>
task-cli mark-done <id>
task-cli list [status]        # status: todo | in-progress | done
task-cli help                 # show help
task-cli                      # shows help
```

### Examples

```bash
task-cli add "Buy groceries"
# Task added successfully (ID: 1)

task-cli add "Walk dog"
# Task added successfully (ID: 2)

task-cli list
# [
#   { "id": "1", "description": "Buy groceries", "status": "todo", ... },
#   { "id": "2", "description": "Walk dog", "status": "todo", ... }
# ]

task-cli update 1 "Buy groceries and milk"
# Task updated successfully (ID: 1)

task-cli mark-in-progress 1
# Task marked as in-progress (ID: 1)

task-cli mark-done 1
# Task marked as done (ID: 1)

task-cli list done
# [ { "id": "1", ... status: "done" } ]

task-cli delete 2
# Task deleted successfully (ID: 2)

task-cli list
# [ { "id": "1", ... } ]
```

## How It Works

1. `commandExtractor.ts` — pure `parseArgs()` (testable, per-command branching, `join(' ')` for unquoted descriptions)
2. `index.ts` — `switch(command)` validates args, `await`s operations
3. `taskOperation.ts` — `read()` → `findTaskIndex` → mutate → `write()`
4. `storage.ts` — `createReadStream` → `Buffer.concat` → `toString('utf8')` → `JSON.parse` (`read`); `Buffer.from(JSON)` → `pipeline(Readable, WriteStream)` (`write`)

## Scripts

```bash
npm start            # node index.ts
npx tsc --noEmit     # typecheck
```

## Requirements

- Node.js >= 22 (for native TS stripping and `node:process` / `node:stream/promises`)
