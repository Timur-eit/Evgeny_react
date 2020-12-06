import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'

const inputs = ['name', 'class', 'author', 'version']

function ReduxFormsExample({
  handleSubmit,
  initialize,
  initialData,
  // reduxInputsData,
  // inputDataChange,
  // setInitialFields,
  // submit,
  // addNewTableData,
}) {

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

export default reduxForm({
  form: 'reduxFormExample',
})(ReduxFormsExample)