import React from 'react';
import { connect } from 'react-redux'
import {  
  search,
  fixInitialTableData,  
} from '../../models/tableData'
import '../../App.css';

function SearchField({ search, fixInitialTableData }) { 

  function chanheHandler(event) {
    fixInitialTableData()
    search(event)
  }  
  
  return (
    <div>
      <label>
        Search
        <input type='text' onChange={(event) => chanheHandler(event)}/>
      </label>
    </div>
  )
}

export default connect(null, {
  search,
  fixInitialTableData,
})(SearchField)