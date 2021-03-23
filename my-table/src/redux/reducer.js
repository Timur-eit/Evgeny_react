import {combineReducers} from 'redux'
import tableDataReducer, {moduleName as tabelDataModule} from '../models/tableData'
import formReducer, {moduleName as formModule} from '../shared/ui/forms/forms-model'
import tableViewReducer, {moduleName as tableViewModule} from '../models/tableView'

import { reducer as reduxFormReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import history from '../history'

export default combineReducers({
  [tabelDataModule]: tableDataReducer,
  [formModule]: formReducer,
  [tableViewModule]: tableViewReducer,  
  form: reduxFormReducer,
  router: connectRouter(history),
})