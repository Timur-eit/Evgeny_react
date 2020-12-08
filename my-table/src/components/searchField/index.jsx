import React, { useCallback } from 'react';
import { connect } from 'react-redux'
import {
  search,
  fixInitialTableData,
} from '../../models/tableData'
import '../../App.css';

import { withRouter } from 'react-router'

import { useLocation } from 'react-router-dom'

let SearchField = ({ search, fixInitialTableData, history }) => {

  // const useQuery = () => new URLSearchParams(useLocation().search)
  // const setQuery = useQuery()

  const chanheHandler = useCallback((event) => {
    fixInitialTableData()
    search(event)
    const { value } = event.target
    history.push({ search: `?search=${value}` })   

    // setQuery.set('search', value)
    // console.log(setQuery.get('search'))
  }, [fixInitialTableData, search])

  // function chanheHandler(event) {


    // event.preventDefault()
    // window.location.search = `?${value}`
  // }

  return (
    <div>
      <label>
        Search
        <input type='text' onChange={(event) => chanheHandler(event)}/>
      </label>
    </div>
  )
}

SearchField = connect(null, {
  search,
  fixInitialTableData,
})(SearchField)

SearchField = withRouter(SearchField)

export default SearchField