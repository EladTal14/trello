import { utilService } from "./utilService"

export const cardService = {
  createTodo,
  createChecklist
}

function createTodo(title) {
  return {
    id: utilService.makeId(),
    title,
    isDone: false
  }
}

function createChecklist() {
  return {
    id: utilService.makeId(),
    title: '',
    todos: [createTodo('')]
  }
}


