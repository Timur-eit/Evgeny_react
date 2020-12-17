import React, { useEffect } from 'react';
import 'App.css';
import Table from 'components/table';
import Modal from 'shared/ui/Modal'
import DeleteButton from 'components/deleteButton'
import SearchField from 'components/searchField'
import AddNewDataForms from 'components/AddNewDataForms'
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom'

import {
  reduxTableDataSelector,
  getReduxTableData,
  sortReduxTable,
  addNewTableData,
  search,
  reduxCheckedIndexesSelector,
  setCheckedItemIndex,
  setAllItemsCheked,  
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
}) {

  useEffect(() => {
    getReduxTableData()
  }, [getReduxTableData])


  return (
    <div className="App">
      <header className="App-header">
        <Link to='/table'>Table</Link>
        <Switch>
          <Route path='/table'>
            <div>
              <SearchField />
              <DeleteButton />
              <Table
                data={reduxTableData}
                columns={tableColumns}
                checkboxHandle={setCheckedItemIndex}
                checkedItemIndexes={reduxCheckedIndexes}
                checkAllCheckboxes={setAllItemsCheked}
                handleSort={sortReduxTable}
              />
              <Modal
                disableEnforceFocus={true} // ???
                children={<div>Hello Moto</div>}
              />
              {/*<AddNewDataForms onSubmit={(data) => addNewTableData(tableColumns, data)} />*/}
              <AddNewDataForms initialData={location.query} onSubmit={(data) => addNewTableData(tableColumns, data)} />
            </div>
          </Route>
          <Route exact path='/'>
            <p>Please choose link</p>
          </Route>
          <Route path='*'>
            404
            Doesn't exist
          </Route>
        </Switch>
      </header>
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
