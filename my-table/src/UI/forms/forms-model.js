import { createSelector } from 'reselect'

// Constants

export const moduleName = 'app-form'
const prefix = moduleName

export const SET_INITIAL_FIELDS = `${prefix}/SET_INITIAL_FIELDS`
export const CHANGE_INPUTS = `${prefix}/CHANGE_INPUTS`

// Reducer

export const ReducerRecord = {
  reduxInputsData: [],
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case SET_INITIAL_FIELDS:
      return Object.assign({}, state, {
        reduxInputsData: payload,
      })
    case CHANGE_INPUTS:
      return Object.assign({}, state, {
        reduxInputsData: payload,
      })
    default:
      return state
  }
}

// Selectors

export const stateSelector = state => state[moduleName]
export const reduxInputsDataSelector = createSelector(stateSelector, state => state.reduxInputsData)


// Action creators

export function setInitialFields(inputs) {
  console.log('setInitialFields')
  return (dispatch) => {
    dispatch({
      type: SET_INITIAL_FIELDS,
      payload: Object.fromEntries(inputs.map(inputName => [inputName, ''])),
    })
  }
}

export function inputDataChange(event) {
  return (dispatch, getState) => {
    const { name, value } = event.target
    const { reduxInputsData } = getState()[moduleName]

    let previousInputsState = reduxInputsData
    let newInputData = {
      ...previousInputsState,
      id: Math.trunc(Math.random() * 100),
      [name]: value,
      isChecked: false
    }

    const { id, ...rest } = newInputData

    dispatch({
      type: CHANGE_INPUTS,
      payload: { id, ...rest },
    })
  }
}

