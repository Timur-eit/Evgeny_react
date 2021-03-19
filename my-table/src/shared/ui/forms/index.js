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
      <p>Please input and submit to add new data</p>
      <form onSubmit={submit}>
        <div>
          {inputs.map((item, key) =>
            <div key={key}>
              <label htmlFor={item}>{item}</label>
              {/* <input type='text' name={item} value={reduxInputsData[item]} onChange={inputDataChange} /> */}
              <input type='text' name={item} defaultValue={reduxInputsData[item]} onChange={inputDataChange} />
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

