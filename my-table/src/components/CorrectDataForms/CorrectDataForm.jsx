import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
import { correctTableData } from 'models/tableData'
import './style.scss'

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

