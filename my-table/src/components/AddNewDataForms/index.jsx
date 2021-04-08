import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { queryStringEditor } from 'shared/utils/queryStringEditor.js'
import './style.scss'

const inputs = ['name', 'class', 'author', 'version']

let AddNewDataForms = ({
  handleSubmit,
  initialize,
  initialData,
  history
}) => {

  // console.log('initData ' + JSON.stringify(initialData))
  console.log(history)
  
  function searchParamMatch() {
    const searchString = history.location.search
    const match = inputs.filter(fieldName => searchString.includes(fieldName))
    return match.length
  }



  useEffect(() => {
    initialize(initialData)
  }, [initialize, initialData])

  return (
    <>
      {/* <form className='new-data-forms' onSubmit={handleSubmit}> */}
      <form className='new-data-forms' onSubmit={handleSubmit}>
        {inputs.map((item, key) =>
          <div className='field' key={key}>
            <Field name={item} component='input' type='text' placeholder={`enter ${item}`} onChange={(event) => queryStringEditor(event, item, history)} />
          </div>)}
        <button className='submit-button' type="submit" disabled={!searchParamMatch()}>
          Добавить
        </button>
      </form>
    </>
  )
}

AddNewDataForms = reduxForm({
  form: 'addNewDataForm',
})(AddNewDataForms)

AddNewDataForms = connect(
  state => ({
    initialValues: state.router.location.query
  })
)(AddNewDataForms)

AddNewDataForms = withRouter(AddNewDataForms)

export default AddNewDataForms