import React from 'react';
import { Field, reduxForm } from 'redux-form'
import './style.scss'
import searchImg from 'shared/img/search-svgrepo-com.svg'

let SearchField = ({ search, fixInitialTableData, history, initialValues }) => {  

  function changeHandler(event) {
    fixInitialTableData()
    search(event)
    const { value } = event.target

    if (value.length > 0) {
      history.push({ search: `?search=${value}` })
    } else {
      history.push({ search: '' })
    }
  }

  return (
    <div className='search-field'>
      <img src={searchImg} alt='Поиск'/>
      <span>Найти</span>
      <Field name={'search'} component='input' type='text' onChange={(event) => changeHandler(event)} placeholder={'enter text'}/>
    </div>
  )
}

SearchField = reduxForm({
  form: 'searchField',
}, {
})(SearchField)

export default SearchField


// const useQuery = () => new URLSearchParams(useLocation().search)
  // const setQuery = useQuery()

    // setQuery.set('search', value)
    // console.log(setQuery.get('search'))
    // window.location.search = `?${value}`
    // console.log(initialValues)


  // useEffect(() => {
  //   if (initialValues && initialValues.search) {
  //     const event = { target: { value: initialValues.search } }
  //     fixInitialTableData()
  //     search(event)
  //   }
  // }, [initialValues