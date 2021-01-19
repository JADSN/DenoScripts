// import { readJsonFileContent } from "./fs.ts";

// import { dirname, fromFileUrl } from "https://deno.land/std@0.83.0/path/mod.ts";

interface Todo {
  description: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

// const moduleDir = dirname(fromFileUrl(import.meta.url));

// * UTILS
// * Ver: Deno linux clear
function clearScreen() {
  console.clear();
}

function parseBool(input: string): boolean {
  return input === "true" ? true : false;
}

console.log("===============");
console.log("TODO MANAGER");
console.log("===============");

const data: Todo[] = [];

console.log();

function showMenu() {
  console.log();

  console.log("===============");
  console.log("MENU");
  console.log("===============");

  console.log("1 - SHOW TODOS");
  console.log("2 - CREATE TODO");
  console.log("3 - UDPATE TODO");
  console.log("4 - DELETE TODO");
  console.log("5 - EXIT");
}

showMenu();

// * CRUD
function readCount(todos: Todo[]): number {
  return todos.length;
}

function readAll(todos: Todo[]) {
  clearScreen();

  todos.forEach((todo) => {
    console.log(todo);
  });
}

function insertOne(todos: Todo[], todo: Todo) {
  todos.push(todo);
}

function updateOne(todos: Todo[], todo: Todo, idx: number) {
  const tempTodo: Todo = todos[idx - 1];

  const todoToUpdate: Todo = {
    description: todo.description,
    done: todo.done,
    createdAt: tempTodo.createdAt,
    updatedAt: todo.updatedAt,
  };

  todos[idx - 1] = todoToUpdate;
}

function deleteOne(todos: Todo[], idx: number) {
  todos.splice(idx - 1, 1);
}

function createTodoOption() {
  console.log();

  const descInsert = prompt("NAME:", "")!;

  const todoToInsert = {
    description: descInsert,
    done: false,
    createdAt: new Date(),
    updatedAt: null,
  };

  insertOne(data, todoToInsert);

  clearScreen();

  // setTimeout(() => {
  showMenu();
  // }, 1000);
}

function updateOneTodoOption() {
  console.log();

  const idUpdate = prompt("ID:", "")!;
  const idUpdateNumber = parseInt(idUpdate);

  const descUpdate = prompt("DESCRIPTION:", "NO DESCRIPTION")!;

  const done = prompt("DONE:", "false")!;
  const doneBoolean = parseBool(done);

  const todoToUpdate = {
    description: descUpdate,
    done: doneBoolean,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  updateOne(data, todoToUpdate, idUpdateNumber);
  clearScreen();

  showMenu();
}

function deleteOneTodoOption() {
  const idDelete = prompt("ID:", "")!;
  const idDeleteNumber = parseInt(idDelete);

  deleteOne(data, idDeleteNumber);

  clearScreen();
  showMenu();
}

while (true) {
  const option = prompt("OPTION:", "")!;
  const optionNumber = parseInt(option);

  switch (optionNumber) {
    case 1:
      readAll(data);
      showMenu();
      break;

    case 2:
      createTodoOption();
      break;

    case 3:
      updateOneTodoOption();
      break;

    case 4:
      deleteOneTodoOption();
      break;

    case 5:
      console.log("EXIT");
      Deno.exit(0);
      break;

    default:
      showMenu();
      break;
  }
}
