import { createSelector } from 'reselect'
import { addCookie, getCookie } from '../cookie'
// import data from '../data/data.json';

// Constants

export const moduleName = 'pl-table'
const prefix = moduleName

export const CHECK_INITIAL_TABLE_DATA = `${prefix}/CHECK_INITIAL_TABLE_DATA`
export const GET_INITIAL_TABLE_DATA = `${prefix}/GET_INITIAL_TABLE_DATA`
export const CHANGE_ARROW_DISPLAY_STATE = `${prefix}/CHANGE_ARROW_DISPLAY_STATE`
export const SORT_TABLE = `${prefix}/SORT_TABLE`

// Reducer

export const ReducerRecord = {
  reduxTableData: [],
  reduxArrowDisplay: '',
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case GET_INITIAL_TABLE_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload
      })
    case CHECK_INITIAL_TABLE_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload
      })
    case CHANGE_ARROW_DISPLAY_STATE:
      return Object.assign({}, state, {
        reduxArrowDisplay: payload
      })
    case SORT_TABLE:
      return Object.assign({}, state, {
        reduxTableData: payload
      })
    default:
      return state
  }
}

// Selectors

export const stateSelector = state => state[moduleName]
export const reduxTableDataSelector = createSelector(stateSelector, state => state.reduxTableData)
export const reduxArrowDisplaySelector = createSelector(stateSelector, state => state.reduxArrowDisplay)

// Action creators

export function checkReduxTableData() {
  return async (dispatch) => {
    let newReduxTableData = []
    const cookie = getCookie('table')
    if (cookie) {
      newReduxTableData.push(...JSON.parse(cookie))
    }
    dispatch({
      type: CHECK_INITIAL_TABLE_DATA,
      payload: newReduxTableData
    })
  }
}

export function getReduxTableData() {
  return async (dispatch) => {
    let newReduxTableData = []
    await fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/c809ff8ccbc22376ea6397a3460ea423ac5b40b3/Evgeny_table.json')
      .then(response => response.json())
      .then((data) => newReduxTableData.push(...data))
    addCookie('table', JSON.stringify(newReduxTableData))

    dispatch({
      type: GET_INITIAL_TABLE_DATA,
      payload: newReduxTableData
    })
  }
}

export function changeReduxArrowDisplayState(fieldName) {
  return (dispatch, getState) => {
    const { reduxArrowDisplay } = getState()['pl-table']
    let newReduxArrowDisplay = null
    if (reduxArrowDisplay !== fieldName) {
      newReduxArrowDisplay = fieldName
    } else {
      newReduxArrowDisplay = ''
    }
    dispatch({
      type: CHANGE_ARROW_DISPLAY_STATE,
      payload: newReduxArrowDisplay
    })
  }
}


export function sortReduxTable(field, direction) { // direction: one of [1, -1]
  return (dispatch, getState) => {
    const { reduxTableData } = getState()['pl-table']
    let sortedTableData = [...reduxTableData].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction * -1
      } else if (a[field] > b[field]) {
        return direction * 1
      } else {
        return 0
      }
    })
    dispatch({
      type: SORT_TABLE,
      payload: sortedTableData,
    })
  }
}