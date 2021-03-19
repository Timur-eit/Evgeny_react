import { createSelector } from 'reselect'
import { addCookie, getCookie } from '../cookie'

// Constants

export const moduleName = 'pl-table'
const prefix = moduleName

export const GET_TABLE_DATA = `${prefix}/GET_TABLE_DATA`
export const SORT_TABLE = `${prefix}/SORT_TABLE`
export const ADD_NEW_TABLE_DATA = `${prefix}/ADD_NEW_TABLE_DATA`
export const SET_CHEKED_INDEX = `${prefix}/SET_CHEKED_INDEX`
export const SET_ALL_CHEKED_INDEXES = `${prefix}/SET_ALL_CHEKED_INDEXES`
export const DELETE_MARKED_DATA = `${prefix}/DELETE_MARKED_DATA`
export const FIX_INITIAL_TABLE_DATA = `${prefix}/FIX_INITIAL_TABLE_DATA`
export const SEARCH = `${prefix}/SEARCH`

// Reducer

export const ReducerRecord = {
  reduxTableData: [],
  reduxChekedIndexes: [],
  savedTableData: [],
}

export default function reducer(state = ReducerRecord, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TABLE_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload,
      })
    case SORT_TABLE:
      return Object.assign({}, state, {
        reduxTableData: payload
      })
    case ADD_NEW_TABLE_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload,
      })
    case SET_CHEKED_INDEX:
      return Object.assign({}, state, {
        reduxChekedIndexes: payload,
      })
    case SET_ALL_CHEKED_INDEXES:
      return Object.assign({}, state, {
        reduxChekedIndexes: payload,
      })
    case DELETE_MARKED_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload.reduxTableData,
        reduxChekedIndexes: payload.reduxChekedIndexes,
      })
    case FIX_INITIAL_TABLE_DATA:
      return Object.assign({}, state, {
        savedTableData: payload,
      })
    case SEARCH:
      return Object.assign({}, state, {
        reduxTableData: payload.reduxTableData,
        savedTableData: payload.savedTableData,
      })
    default:
      return state
  }
}

// Selectors

export const stateSelector = state => state[moduleName]
export const reduxTableDataSelector = createSelector(stateSelector, state => state.reduxTableData)
export const reduxChekedIndexesSelector = createSelector(stateSelector, state => state.reduxChekedIndexes)
export const savedTableDataSelector = createSelector(stateSelector, state => state.savedTableData)

// Action creators

export function getReduxTableData() {
  return async (dispatch) => {
    let newReduxTableData = []
    const cookie = getCookie('table')
    if (cookie) {
      newReduxTableData.push(...JSON.parse(cookie))
    } else {
      await fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/c809ff8ccbc22376ea6397a3460ea423ac5b40b3/Evgeny_table.json')
        .then(response => response.json())
        .then((data) => newReduxTableData.push(...data))
      addCookie('table', JSON.stringify(newReduxTableData))
    }
    dispatch({
      type: GET_TABLE_DATA,
      payload: newReduxTableData,
    })
  }
}

export function sortReduxTable(field, direction) { // direction: one of [1, -1]
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
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

// export function addNewTableData() {
//   return (dispatch, getState) => {
//     const { reduxTableData } = getState()[moduleName]
//     const { reduxInputsData } = getState()['app-form']
//     const newTableData = [...reduxTableData].concat([reduxInputsData])
//     addCookie('table', JSON.stringify(newTableData))

//     dispatch({
//       type: ADD_NEW_TABLE_DATA,
//       payload: newTableData,
//     })
//   }
// }

export function addNewTableData(fieldsNames, formData) {
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]    
    const newTableItem = fieldsNames.reduce((obj, currKey) => {
      if (currKey === 'id') {
        obj[currKey] = Math.trunc(Math.random() * 100)
      } else if (currKey === 'isChecked') {
        obj[currKey] = false
      } else if (currKey === 'current version') {
        obj[currKey] = formData['version']
      } else {
        obj[currKey] = formData[currKey]
      }
      return obj
    }, {})

    const newTableData = [...reduxTableData].concat([newTableItem])
    addCookie('table', JSON.stringify(newTableData))

    dispatch({
      type: ADD_NEW_TABLE_DATA,
      payload: newTableData,
    })
  }
}

export function setChekedItemIndex(itemIndex) {
  return (dispatch, getState) => {
    const { reduxChekedIndexes } = getState()[moduleName]
    let newChekedIndexes = []
    if (reduxChekedIndexes.includes(itemIndex)) {
      newChekedIndexes = reduxChekedIndexes.filter(item => item !== itemIndex)
    } else {
      newChekedIndexes = [...reduxChekedIndexes, itemIndex]
    }
    dispatch({
      type: SET_CHEKED_INDEX,
      payload: newChekedIndexes
    })
  }
}

export function setAllItemsCheked() {
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
    const { reduxChekedIndexes } = getState()[moduleName]
    const allItemsIndexe = [...reduxTableData].map((item, i) => item = i)
    let newReduxChekedIndexes = []
    if (reduxChekedIndexes.length === reduxTableData.length) {
      newReduxChekedIndexes = []
    } else {
      newReduxChekedIndexes = allItemsIndexe
    }
    dispatch({
      type: SET_ALL_CHEKED_INDEXES,
      payload: newReduxChekedIndexes,
    })
  }
}

export function deleteMarkedItem() {
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
    const { reduxChekedIndexes } = getState()[moduleName]
    // eslint-disable-next-line array-callback-return
    const newTableData = [...reduxTableData].filter((_, i) => !reduxChekedIndexes.includes(i))
    const newreduxChekedIndexes = []
    dispatch({
      type: DELETE_MARKED_DATA,
      payload: { reduxTableData: newTableData, reduxChekedIndexes: newreduxChekedIndexes }
    })
  }
}

export function fixInitialTableData() {
  return (dispatch, getState) => {
    console.log('invoke inner fixInitialTableData')
    const { reduxTableData } = getState()[moduleName]
    const { savedTableData } = getState()[moduleName]

    let newSavedData = []

    console.log('length of savedTableData ' + savedTableData.length)

    if (savedTableData.length < 1) {
      newSavedData = [...reduxTableData]
    } else {
      newSavedData = [...savedTableData]
    }

    dispatch({
      type: FIX_INITIAL_TABLE_DATA,
      payload: newSavedData,
    })
  }
}


export function search(event) {
  // fixInitialTableData() нельзя вызвать экшн отсюда
  return (dispatch, getState) => {
    const { value } = event.target
    const { reduxTableData } = getState()[moduleName]
    const { savedTableData } = getState()[moduleName]
    let resultData = null
    let newSavedData = [...savedTableData]

    if (value.length > 0) {
      // eslint-disable-next-line array-callback-return
      resultData = [...reduxTableData].filter(item => {
        let result = null
        for (const key in item) {
          if (isInputInData(value, item[key])) {
            result = item
          }
        }
        return result
      })
    } else {
      resultData = [...savedTableData]
      newSavedData = []
    }

    dispatch({
      type: SEARCH,
      payload: { reduxTableData: resultData, savedTableData: newSavedData }
    })
  }
}

export function isInputInData(input, data) {
  const dataToText = data.toString().toLowerCase()
  const inputToText = input.toString().toLowerCase()
  let i = 0

  for (const char of dataToText) {
    if (char === inputToText[0]) {
      if (inputToText === dataToText.slice(i, i + inputToText.length)) {
        return true
      } else {
        return false
      }
    }
    i++
  }
  return false
}

