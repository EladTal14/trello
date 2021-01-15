export const utilService = {
  getRandomInt,
  makeId,
  createTime,
  getDueDate,
  convertName,
  getTodoProgress
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 7) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function createTime() {
  var timeNow = new Date();
  var hours = timeNow.getHours();
  var minutes = timeNow.getMinutes();
  var seconds = timeNow.getSeconds();
  var timeString = "" + ((hours > 12) ? hours - 12 : hours);
  timeString += ((minutes < 10) ? ":0" : ":") + minutes;
  timeString += ((seconds < 10) ? ":0" : ":") + seconds;
  return timeString;
}

function getDueDate(timeStamp) {
  var stampDate = new Date(timeStamp);
  const allMonths = ["Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const month = allMonths[stampDate.getMonth()]
  const day = stampDate.getDate()
  const date = `${month} ${day}`
  return date
}

function convertName(fullname) {
  const names = fullname.split(' ')
  const letterName = names[0][0].toUpperCase() + names[1][0].toUpperCase()
  return letterName
}

function getTodoProgress(card) {
  if (card.checklist) {
    const { todos } = card.checklist
    let doneTodos = todos.filter(todo => todo.isDone)
    const progress = { total: todos.length, done: doneTodos.length }
    return progress
  }
  else return

}