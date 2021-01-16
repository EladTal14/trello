import { utilService } from "./utilService"

export const cardService = {
  createTodo
}

function createTodo(title) {
  try {
    return {
      id: utilService.makeId(),
      title,
      isDone: false
    }
  } catch (err) {
    console.log('err cardService CREATE TODO', err)
  }
}