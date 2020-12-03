import {combineReducers} from 'redux'
import tableDataReducer, {moduleName as tabelDataModule} from '../models/tableData'
import formReducer, {moduleName as formModule} from '../UI/forms/forms-model'
import tableViewReducer, {moduleName as tableViewModule} from '../models/tableView'

export default combineReducers({
  [tabelDataModule]: tableDataReducer,
  [formModule]: formReducer,
  [tableViewModule]: tableViewReducer,
})