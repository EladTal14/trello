export function setCard(card) {
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_CARD', card })

    } catch (err) {
      console.log('err cardAction SET CARD', err);
    }
  }
}

export function setGroup(group) {
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_GROUP', group })
    } catch (err) {
      console.log('err cardAction SET GROUP', err);
    }
  }
}

export function clearState(clear) {
  return (dispatch) => {
    try {
      dispatch({ type: 'CLEAR_STATE', clear })
    } catch (err) {
      console.log('err cardAction CLEAR STATE', err);
    }
  }
}