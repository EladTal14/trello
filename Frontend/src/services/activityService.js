import { utilService } from "./utilService"

export const activityService = {
  createActivity
}

function createActivity(user, txt, card, group, action) {
  let byMember = null
  if (user) { 
    byMember = {
      _id: user._id ,
      fullname: user.fullname,
      imgUrl: user.imgUrl
    }
  } 
    
  return {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember,
    card: {
      id: card.id,
      title: `${card.title} ${action}`
    },
    group: {
      id: group.id,
      title: group.title
    }
  }
}