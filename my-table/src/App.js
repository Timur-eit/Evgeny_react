import React, { useEffect } from 'react';
import Table from 'components/table';
// import Modal from 'shared/ui/Modal'
import AddNewDataForms from 'components/AddNewDataForms'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'
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
  fixInitialTableData,
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
  search,
  fixInitialTableData,
  location,
  // correctTableData,
}) {

  const searchParamValue = location.query.search

  useEffect(() => {
    getReduxTableData()
    if (searchParamValue) {
      const event = { target: { value: searchParamValue } }
      fixInitialTableData()
      search(event)
    }

  }, [getReduxTableData, fixInitialTableData, search, searchParamValue])


  return (
    <div className="App">
      <Link to='/table'>Языкы программирования</Link>
      <Switch>
        <Route path='/table'>
          <AddNewDataForms initialData={location.query} disabledState={searchParamValue} onSubmit={(data) => addNewTableData(tableColumns, data)} />
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
          <ControlPanel className='control-panel'/>
        </Route>
        <Route exact path='/'>
        </Route>
        <Route path='*'>
          Code 404<br />
          Not found or doesn't exist :-(
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
  fixInitialTableData,
  search,
})(App)
