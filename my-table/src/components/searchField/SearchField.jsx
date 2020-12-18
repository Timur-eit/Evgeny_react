import React, {useEffect, useRef, useState} from 'react';
import { Field, reduxForm } from 'redux-form'
// import { useLocation } from 'react-router-dom'

import './style.scss'
// import 'App.scss';

let SearchField = ({ search, fixInitialTableData, history, initialValues }) => {
  
  // const useQuery = () => new URLSearchParams(useLocation().search)
  // const setQuery = useQuery()
  
  const [showSearchFieldState, setShowSearchFieldState] = useState(false)
  
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
      {showSearchFieldState && <label>
        <Field name={'search'} ref={searchInput} component='input' type='text' onChange={(event) => changeHandler(event)}/>
      </label>}
      <button className='sear-button' onClick={() => setShowSearchFieldState(state => !state)}>
        Найти
      </button>
    </div>
  )
}

SearchField = reduxForm({
  form: 'searchField',
}, {
})(SearchField)

export default SearchField