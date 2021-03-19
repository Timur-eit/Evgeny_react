import { connect } from 'react-redux'
import {
  search,
  fixInitialTableData,
} from 'models/tableData'
import { withRouter } from 'react-router'
import SearchField from './SearchField'

let SearchFieldContatiner = connect(state =>({
  initialValues: state.router.location.query
}), {
  search,
  fixInitialTableData,
})(SearchField)

SearchFieldContatiner = withRouter(SearchFieldContatiner)

export default SearchFieldContatiner