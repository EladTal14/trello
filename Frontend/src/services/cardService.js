import { utilService } from "./utilService"

export const cardService = {
  createTodo
}

function createTodo(title) {
  return {
    id: utilService.makeId(),
    title,
    isDone: false
  }
}