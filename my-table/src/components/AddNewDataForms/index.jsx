import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
// import { connect } from 'react-redux'

const inputs = ['name', 'class', 'author', 'version']

let AddNewDataForms = ({
  handleSubmit,
  initialize,
  initialData,
}) => {

  useEffect(() => {
    initialize(initialData)
  }, [initialize, initialData])

  return (
    <>
      <p>Please input and submit to add new data</p>
      <form onSubmit={handleSubmit}>
        {inputs.map((item, key) =>
          <div key={key}>
            <label htmlFor={item}>{item}</label>            
            <Field name={item} component='input' type='text' />            
          </div>)}
        <button type="submit">Submit data</button>
      </form>
    </>
  )
}

export default AddNewDataForms = reduxForm({
  form: 'addNewDataForm',
})(AddNewDataForms)

// AddNewDataForms = connect(
//   state => ({
//     initialValues: state.router.location.query
//   })
// )(AddNewDataForms)

// export default AddNewDataForms