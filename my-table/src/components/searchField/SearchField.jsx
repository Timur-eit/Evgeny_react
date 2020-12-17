// import React, {useEffect, useRef} from "react";
// import {Field, reduxForm} from "redux-form";
//
// export SearchField = ({ search, fixInitialTableData, history, initialValues, change, touch }) => {
//
//   // const useQuery = () => new URLSearchParams(useLocation().search)
//   // const setQuery = useQuery()
//
//   const searchInput = useRef(null)
//
//   useEffect(() => {
//     if (initialValues && initialValues.search) {
//       console.log(searchInput)
//       // change("searchField", 'search', initialValues.search)
//       // const newEvent = new CustomEvent('change')
//       // newEvent.target = initialValues.search
//       // console.log(newEvent)
//       // searchInput.current.props.onChange(newEvent) // как назначить newEvent.target
//       const event = { target: { value: initialValues.search } }
//       console.log(event)
//       fixInitialTableData()
//       search(event)
//
//     }
//   }, [change, initialValues, search, fixInitialTableData])
//
//   function changeHandler(event) {
//     fixInitialTableData()
//     search(event)
//     const { value } = event.target
//
//     if (value.length > 0) {
//       history.push({ search: `?search=${value}` })
//     } else {
//       history.push({ search: '' })
//     }
//     // setQuery.set('search', value)
//     // console.log(setQuery.get('search'))
//     // window.location.search = `?${value}`
//     // console.log(initialValues)
//   }
//
//
//   return (
//     <div>
//       <label>
//         Search
//         <Field name={'search'} ref={searchInput} component='input' type='text' onChange={(event) => changeHandler(event)}/>
//       </label>
//     </div>
//   )
// }
//
