import React from 'react';
import 'App.css';

function DeleteButton({ reduxCheckedIndexes, deleteMarkedItem }) {
  return (
    <div>
      {reduxCheckedIndexes && reduxCheckedIndexes.length ? (
        <button className='deleteButton' onClick={() => deleteMarkedItem()}>Delete data</button>
      ) : null}
    </div>
  )
}

export default DeleteButton