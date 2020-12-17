import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import {
  search,
  fixInitialTableData,
} from 'models/tableData'
import 'App.css';
import { withRouter } from 'react-router'
import { Field, reduxForm } from 'redux-form'
// import { useLocation } from 'react-router-dom'

let SearchField = ({ search, fixInitialTableData, history, initialValues }) => {

  // const useQuery = () => new URLSearchParams(useLocation().search)
  // const setQuery = useQuery()

  const searchInput = useRef(null)

  useEffect(() => {
    if (initialValues && initialValues.search) {
      console.log(searchInput)
      const event = { target: { value: initialValues.search } }
      console.log(event)
      fixInitialTableData()
      search(event)
      
    }
  }, [initialValues, search, fixInitialTableData])

  function changeHandler(event) {
    fixInitialTableData()
    search(event)
    const { value } = event.target

    if (value.length > 0) {
      history.push({ search: `?search=${value}` })
    } else {
      history.push({ search: '' })
    }
    // setQuery.set('search', value)
    // console.log(setQuery.get('search'))
    // window.location.search = `?${value}`
    // console.log(initialValues)
  }


  return (
    <div>
      <label>
        Search
        <Field name={'search'} ref={searchInput} component='input' type='text' onChange={(event) => changeHandler(event)}/>
      </label>
    </div>
  )
}

SearchField = reduxForm({
  form: 'searchField',
}, {
})(SearchField)

SearchField = connect(state =>({
  initialValues: state.router.location.query
}), {
  search,
  fixInitialTableData,
})(SearchField)

SearchField = withRouter(SearchField)

export default SearchField