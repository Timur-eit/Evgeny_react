import {combineReducers} from 'redux'
import tableDataReducer, {moduleName as tabelDataModule} from '../models/tableData'

export default combineReducers({
  [tabelDataModule]: tableDataReducer,
})