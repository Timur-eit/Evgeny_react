import { connect } from 'react-redux'
import {  
  reduxCheckedIndexesSelector,
  deleteMarkedItem,
} from 'models/tableData'

import DeleteButton from './DeleteButton.jsx'

export default connect(state=> ({
  reduxCheckedIndexes: reduxCheckedIndexesSelector(state),
}), {
  deleteMarkedItem,
})(DeleteButton)