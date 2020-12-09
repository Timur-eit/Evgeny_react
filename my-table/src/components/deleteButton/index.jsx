import { connect } from 'react-redux'
import {  
  reduxChekedIndexesSelector,
  deleteMarkedItem,
} from 'models/tableData'

import DeleteButton from './DeleteButton.jsx'

export default connect(state=> ({
  reduxChekedIndexes: reduxChekedIndexesSelector(state),  
}), {
  deleteMarkedItem,
})(DeleteButton)