import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import {
  reduxInputsDataSelector,
  inputDataChange,
  setInitialFields,
} from './forms-model'


function Forms({
  reduxInputsData,
  inputDataChange,
  setInitialFields,

  inputs,
  submit,
}) {

  useEffect(() => {
    setInitialFields(inputs)
  }, [setInitialFields, inputs])

  return (
    <>
      <h4>Please input and submit to add new data</h4>
      <form onSubmit={submit}>
        <div>
          {inputs.map((item, key) =>
            <div>
              <label for={item}>{item}</label>
              <input type='text' key={key} name={item} value={reduxInputsData[item]} onChange={inputDataChange} />
            </div>)}
        </div>
        <button type="submit">Submit data</button>
      </form>
    </>
  )
}

export default connect(state => ({
  reduxInputsData: reduxInputsDataSelector(state),
}), {
  inputDataChange,
  setInitialFields,
})(Forms)

