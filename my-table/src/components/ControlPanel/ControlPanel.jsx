import React from 'react';
import RemoteSubmit from "components/CorrectDataForms/RemoteSubmit";
import SearchFieldContatiner from "components/searchField";
import DeleteButton from 'components/deleteButton';
import './style.scss'

function ControlPanel() {
  return (
    <div className='control-panel'>
      <RemoteSubmit />
      <SearchFieldContatiner />
      <DeleteButton />
    </div>
  )
}

export default ControlPanel