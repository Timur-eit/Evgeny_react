import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const inputs = ['name', 'class', 'author', 'version']

let ReduxFormsExample = ({
  handleSubmit,
  initialize,
  initialData,
  // reduxInputsData,
  // inputDataChange,
  // setInitialFields,
  // submit,
  // addNewTableData,

}) => {

  // useEffect(() => {
  //   initialize(initialData)
  // }, [initialize, initialData])

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

ReduxFormsExample = reduxForm({
  form: 'reduxFormExample',
})(ReduxFormsExample)

ReduxFormsExample = connect(
  state => ({
    initialValues: state.router.location.query
  })
)(ReduxFormsExample)

export default ReduxFormsExample