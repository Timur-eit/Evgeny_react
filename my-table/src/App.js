import React, { useEffect } from 'react';
import Table from 'components/table';
import Modal from 'shared/ui/Modal'
import DeleteButton from 'components/deleteButton'
// import SearchFieldContatiner from 'components/searchField'
import AddNewDataForms from 'components/AddNewDataForms'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'

import RemoteSubmitButton from 'components/CorrectDataForms/RemoteSubmit'

import ControlPanel from "components/ControlPanel/ControlPanel";

import 'reset.scss'
import 'App.scss'

import {
  reduxTableDataSelector,
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  search,
  reduxCheckedIndexesSelector,
  setCheckedItemIndex,
  setAllItemsCheked,
  // correctTableData,
} from './models/tableData'


// const inputs = ['name', 'class', 'author', 'version']
const tableColumns = ['id', 'name', 'class', 'author', 'current version', 'isChecked']

function App({
  reduxTableData,
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  reduxCheckedIndexes,
  setCheckedItemIndex,
  setAllItemsCheked,  
  location,
  // correctTableData,
}) {
  
  console.log(process.env)
  
  useEffect(() => {
    getReduxTableData()
  }, [getReduxTableData])


  return (
    <div className="App">
      <Link to='/table'>Table</Link>
      <Switch>
        <Route path='/table'>
          <AddNewDataForms initialData={location.query} onSubmit={(data) => addNewTableData(tableColumns, data)} />
          <Table
            data={reduxTableData}
            columns={tableColumns}
            checkboxHandle={setCheckedItemIndex}
            checkedItemIndexes={reduxCheckedIndexes}
            checkAllCheckboxes={setAllItemsCheked}
            handleSort={sortReduxTable}
          />
          {/*<Modal*/}
          {/*  disableEnforceFocus={true} // ???*/}
          {/*  children={<div>Hello Moto</div>}*/}
          {/*/>*/}
          <ControlPanel />
        </Route>
        <Route exact path='/'>
        </Route>
        <Route path='*'>
          404
          Doesn't exist
        </Route>
      </Switch>
    </div>
  );
}

export default connect(state => ({
  reduxTableData: reduxTableDataSelector(state),
  reduxCheckedIndexes: reduxCheckedIndexesSelector(state),
  location: state.router.location,
}), {
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  setCheckedItemIndex,
  setAllItemsCheked,
  search,
})(App)
