import React from 'react';
import 'App.css';

function DeleteButton({ reduxChekedIndexes, deleteMarkedItem }) {
  return (
    <div>
      {reduxChekedIndexes && reduxChekedIndexes.length ? (
        <button className='deleteButton' onClick={() => deleteMarkedItem()}>Delete data</button>
      ) : null}
    </div>
  )
}

export default DeleteButton