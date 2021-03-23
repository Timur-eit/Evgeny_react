import { createSelector } from 'reselect'

// Constants

export const moduleName = 'pl-table-view'
const prefix = moduleName

export const CHANGE_ARROW_ID = `${prefix}/CHANGE_ARROW_ID`


// Reducer

export const ReducerRecord = {
  arrowId: '',
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {    
    case CHANGE_ARROW_ID:
      return Object.assign({}, state, {
        arrowId: payload
      })    
    default:
      return state
  }
}

// Selectors

export const stateSelector = state => state[moduleName]
export const arrowIdSelector = createSelector(stateSelector, state => state.arrowId)


// Action creators

export function changeArrowId(fieldName) {
  return (dispatch, getState) => {
    const { arrowId } = getState()[moduleName]
    let newArrowId = null
    if (arrowId !== fieldName) {
      newArrowId = fieldName
    } else {
      newArrowId = ''
    }
    dispatch({
      type: CHANGE_ARROW_ID,
      payload: newArrowId
    })
  }
}

