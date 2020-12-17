import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
import './style.css'
import { correctTableData } from 'models/tableData'

let CorrectDataForm = ({
  handleSubmit,
  initialize,
  initialData,
  fieldName,
}) => {
  
  useEffect(() => {
    initialize(initialData)
  }, [initialize, initialData])
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field name={fieldName} defaultValue={initialData} component='textarea' type='text' className='table-input' />
      </form>
    </>
  )
}

CorrectDataForm = reduxForm({
  form: 'correctDataForm',
  onSubmit: correctTableData,
})(CorrectDataForm)

export default CorrectDataForm

