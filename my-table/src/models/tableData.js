import { createSelector } from 'reselect'
import { addCookie, getCookie } from 'shared/utils/cookie'
import isInputInData from "shared/utils/search";

// Constants

export const moduleName = 'pl-table'
const prefix = moduleName

export const GET_TABLE_DATA = `${prefix}/GET_TABLE_DATA`
export const SORT_TABLE = `${prefix}/SORT_TABLE`
export const ADD_NEW_TABLE_DATA = `${prefix}/ADD_NEW_TABLE_DATA`
export const CORRECT_TABLE_DATA = `${prefix}/CORRECT_TABLE_DATA`
export const SET_CHECKED_INDEX = `${prefix}/SET_CHECKED_INDEX`
export const SET_ALL_CHECKED_INDEXES = `${prefix}/SET_ALL_CHECKED_INDEXES`
export const DELETE_MARKED_DATA = `${prefix}/DELETE_MARKED_DATA`
export const FIX_INITIAL_TABLE_DATA = `${prefix}/FIX_INITIAL_TABLE_DATA`
export const SEARCH = `${prefix}/SEARCH`

export const CHANGE_MARKED_DATA = `${prefix}/CHANGE_MARKED_DATA`

// Reducer

export const ReducerRecord = {
  reduxTableData: [],
  reduxCheckedIndexes: [],
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
    case CORRECT_TABLE_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload.reduxTableData,
        reduxCheckedIndexes: payload.reduxCheckedIndexes,
      })
    case SET_CHECKED_INDEX:
      return Object.assign({}, state, {
        reduxCheckedIndexes: payload,
      })
    case SET_ALL_CHECKED_INDEXES:
      return Object.assign({}, state, {
        reduxCheckedIndexes: payload,
      })
    case DELETE_MARKED_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload.reduxTableData,
        reduxCheckedIndexes: payload.reduxCheckedIndexes,
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
    case CHANGE_MARKED_DATA:
      return Object.assign({}, state, {
        reduxTableData: payload.reduxTableData,
        reduxCheckedIndexes: payload.reduxCheckedIndexes,
      })
    default:
      return state
  }
}

// Selectors

export const stateSelector = state => state[moduleName]
export const reduxTableDataSelector = createSelector(stateSelector, state => state.reduxTableData)
export const reduxCheckedIndexesSelector = createSelector(stateSelector, state => state.reduxCheckedIndexes)
export const savedTableDataSelector = createSelector(stateSelector, state => state.savedTableData)

// Action creators

export function getReduxTableData() {
  return async (dispatch) => {
    let newReduxTableData = []
    // const { query } = getState()['router'].location
    // console.log(query)

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

export function correctTableData(formData) {
  // console.log('redux submit')

  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
    const currentId = formData.id
    // const currentTableItem = { ...reduxTableData.filter(item => item.id === currentId) }
    const newCurrentTableItem = { id: currentId, ...formData}

    const currentItemIndex = reduxTableData.findIndex(item => item.id === currentId)
    const newTableData = [...reduxTableData]
    newTableData[currentItemIndex] = {...newCurrentTableItem}

    addCookie('table', JSON.stringify(newTableData))

    dispatch({
      type: CORRECT_TABLE_DATA,
      payload: { reduxTableData: newTableData, reduxCheckedIndexes: [] }
    })
  }
}



export function setCheckedItemIndex(itemIndex) {
  return (dispatch, getState) => {
    const { reduxCheckedIndexes } = getState()[moduleName]
    let newCheckedIndexes
    if (reduxCheckedIndexes.includes(itemIndex)) {
      newCheckedIndexes = reduxCheckedIndexes.filter(item => item !== itemIndex)
    } else {
      newCheckedIndexes = [...reduxCheckedIndexes, itemIndex]
    }
    dispatch({
      type: SET_CHECKED_INDEX,
      payload: newCheckedIndexes
    })
  }
}

export function setAllItemsCheked() {
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
    const { reduxCheckedIndexes } = getState()[moduleName]
    const allItemsIndexes = [...reduxTableData].map((_, i) => i)
    let newReduxCheckedIndexes
    if (reduxCheckedIndexes.length === reduxTableData.length) {
      newReduxCheckedIndexes = []
    } else {
      newReduxCheckedIndexes = allItemsIndexes
    }
    dispatch({
      type: SET_ALL_CHECKED_INDEXES,
      payload: newReduxCheckedIndexes,
    })
  }
}

export function deleteMarkedItem() {
  return (dispatch, getState) => {
    const { reduxTableData } = getState()[moduleName]
    const { reduxCheckedIndexes } = getState()[moduleName]
    // eslint-disable-next-line array-callback-return
    const newTableData = [...reduxTableData].filter((_, i) => !reduxCheckedIndexes.includes(i))
    const newReduxCheckedIndexes = []
    
    addCookie('table', JSON.stringify(newTableData))
    
    dispatch({
      type: DELETE_MARKED_DATA,
      payload: { reduxTableData: newTableData, reduxCheckedIndexes: newReduxCheckedIndexes }
    })
  }
}

export function fixInitialTableData() {
  return (dispatch, getState) => {    
    const { reduxTableData } = getState()[moduleName]
    const { savedTableData } = getState()[moduleName]

    let newSavedData
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
  return (dispatch, getState) => {
    const { value } = event.target    
    const { reduxTableData } = getState()[moduleName]
    const { savedTableData } = getState()[moduleName]
    let resultData
    let newSavedData = [...savedTableData]

    if (value.length > 0) {
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
