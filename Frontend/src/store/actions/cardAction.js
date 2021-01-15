export function setCard(card) {
  return (dispatch) => {
      dispatch({ type: 'SET_CARD', card })
  }
}

export function setGroup(group) {
  return (dispatch) => {
      dispatch({ type: 'SET_GROUP', group })
  }
}

export function clearState(clear) {
  return (dispatch) => {
      dispatch({ type: 'CLEAR_STATE', clear})
  }
}