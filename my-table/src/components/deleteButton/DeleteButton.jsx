import React from 'react';
import './style.scss'
import deleteImage from 'shared/img/cross-svgrepo-com.svg';

function DeleteButton({ reduxCheckedIndexes, deleteMarkedItem }) {
  return (
    <div>
      <button className='delete-button' disabled={reduxCheckedIndexes.length < 1} onClick={() => deleteMarkedItem()}>
        <img src={deleteImage} alt='Удалить' />
        <span>Удалить</span>
      </button>
    </div>
  )
}

export default DeleteButton