import React from 'react';
import { connect } from 'react-redux'
import { submit } from "redux-form";
import { reduxCheckedIndexesSelector } from 'models/tableData'
import './style.scss'

const RemoteSubmitButton = ({ dispatch, reduxCheckedIndexes }) => (
    <button className='correct-button' disabled={reduxCheckedIndexes.length < 1}
      type="button"
      onClick={() => dispatch(submit('correctDataForm'))}
    >
      Редактировать
    </button>
)

export default connect(state => ({
  reduxCheckedIndexes: reduxCheckedIndexesSelector(state),
}), {
  // submit,
})(RemoteSubmitButton)
