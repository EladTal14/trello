import { utilService } from "./utilService"

export const activityService = {
  createActivity
}

function createActivity(user, txt, card, group, action, moveTo) {
  let byMember = null
  let toGroup = null

  if (user) {
    byMember = {
      _id: user._id,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    }
  }

  if (moveTo) {
    toGroup = {
      id: moveTo.id,
      title: moveTo.title
    }
  }

  if (card) {
    card =  {
      id: card.id,
      title: `${card.title} ${action}`
    }
  } else card = null


  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember,
    card,
    group: {
      id: group.id,
      title: group.title
    },
    toGroup
  }
}