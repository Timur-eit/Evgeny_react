import React from 'react';
import './style.scss'

function DeleteButton({ reduxCheckedIndexes, deleteMarkedItem }) {
  return (
    <div>
      <button className='delete-button' disabled={reduxCheckedIndexes.length < 1} onClick={() => deleteMarkedItem()}>Удалить</button>
    </div>
  )
}

export default DeleteButton