export const utilService = {
  getRandomInt,
  makeId,
  createTime,
  getDueDate,
  convertName,
  getTodoProgress,
  getRandomColor
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
  if (!fullname) return
  let letterName;
  const names = fullname.split(' ')
  if (!names[1]) letterName = names[0][0].toUpperCase()
  else letterName = names[0][0].toUpperCase() + names[1][0].toUpperCase()
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
function getRandomColor() {
  var colors = ['#f9ed69', '#f08a5d', '#54e346', '#00adb5', '#6a2c70', '#b83b5e']

  return colors[getRandomInt(0, 6)];
}
