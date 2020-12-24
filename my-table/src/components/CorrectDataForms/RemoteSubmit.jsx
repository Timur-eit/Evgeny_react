import React from 'react';
import { connect } from 'react-redux'
import { submit } from 'redux-form';
import { reduxCheckedIndexesSelector } from 'models/tableData'
import './style.scss'
import searchImg from 'shared/img/edit-text-svgrepo-com.svg'

const RemoteSubmitButton = ({ submit, reduxCheckedIndexes }) => (
    <button className='correct-button' disabled={reduxCheckedIndexes.length < 1}    
      type="button"
      onClick={() => submit('correctDataForm')}
    >
      <img src={searchImg} alt='поиск' />
      <span>Редактировать</span>
    </button>
)

export default connect(
  state => ({
  reduxCheckedIndexes: reduxCheckedIndexesSelector(state),
}), {
  submit,
})(RemoteSubmitButton)
