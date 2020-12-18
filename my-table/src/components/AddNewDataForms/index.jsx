import React, { useEffect } from 'react';
import { Field, reduxForm } from 'redux-form'
import './style.scss'

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
      <form className='new-data-forms' onSubmit={handleSubmit}>
        {inputs.map((item, key) =>
          <div key={key}>
            <Field className='field' name={item} component='input' type='text' placeholder={`enter ${item}`} />
          </div>)}
        <button className='submit-button' type="submit">Добавить</button>
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