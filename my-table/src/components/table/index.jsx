import { connect } from 'react-redux'
import { arrowIdSelector, changeArrowId } from 'models/tableView'
import { correctTableData } from 'models/tableData'
import { Table } from './Table'

export default connect(state => ({
  arrowId: arrowIdSelector(state),
  
}), {
  changeArrowId,
  correctTableData,
})(Table)