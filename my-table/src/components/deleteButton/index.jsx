import React from 'react';
import { connect } from 'react-redux'
import {  
  reduxChekedIndexesSelector,
  deleteMarkedItem,
} from '../../models/tableData'
import '../../App.css';


function DeleteButton({ reduxChekedIndexes, deleteMarkedItem }) {
  return (
    <div>
      {reduxChekedIndexes && reduxChekedIndexes.length ? (
        <button className='deleteButton' onClick={() => deleteMarkedItem()}>Delete data</button>
      ) : null}
    </div>
  )
}

export default connect(state=> ({
  reduxChekedIndexes: reduxChekedIndexesSelector(state),  
}), {
  deleteMarkedItem,
})(DeleteButton)