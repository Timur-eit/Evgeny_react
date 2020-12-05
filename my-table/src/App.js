import React, { useEffect } from 'react';
import './App.css';
import Table from './components/table';
import Modal from './UI/Modal'
import Forms from './UI/forms'
import DeleteButton from './components/deleteButton'
import SearchField from './components/searchField'

import { connect } from 'react-redux'

import {
  reduxTableDataSelector,
  getReduxTableData,
  sortReduxTable,
  addNewTableData, 
  search,  
  reduxChekedIndexesSelector,
  setChekedItemIndex,
  setAllItemsCheked,
} from './models/tableData'


const inputs = ['name', 'class', 'author', 'version']
const tableColumns = ['id', 'name', 'class', 'author', 'current version', 'isChecked']


function App({
  reduxTableData,
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  reduxChekedIndexes,
  setChekedItemIndex,
  setAllItemsCheked,  
}) {

  useEffect(() => {
    getReduxTableData()
  }, [getReduxTableData])

  
  return (
    <div className="App">
      <header className="App-header">
          <SearchField />
        <div>
          <DeleteButton />
        </div>
        <Table
          data={reduxTableData}
          columns={tableColumns}
          checkboxHandle={setChekedItemIndex}
          chekedItemIndexs={reduxChekedIndexes}
          checkAllCheckboxes={setAllItemsCheked}
          handleSort={sortReduxTable}          
        />
        <Modal
          disableEnforceFocus={true} // ???
          children={<div>Hello Moto</div>}
        />
        <Forms
          inputs={inputs}
          submit={addNewTableData}
        />
      </header>
    </div>
  );
}

export default connect(state => ({
  reduxTableData: reduxTableDataSelector(state),
  reduxChekedIndexes: reduxChekedIndexesSelector(state),  
}), {
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  setChekedItemIndex,
  setAllItemsCheked,
  search,  
})(App)
