import React from 'react'
import PropTypes from 'prop-types'
import CorrectDataForm from '../CorrectDataForms/CorrectDataForm'
// import RemoteSubmitButton from 'components/CorrectDataForms/RemoteSubmit'
import './reset.scss'
import './style.scss'

export const Table = ({
  columns,
  data,
  handleSort,
  checkboxHandle,
  checkedItemIndexes,
  // checkAllCheckboxes,
  arrowId,
  changeArrowId,
  correctTableData,
}) => {
  
  return(
    <>
    <table border="1">
      <thead>
        <tr>
          {columns.map((item, i) => {
              return <th key={i}>
                <SortButton
                  arrowDisplayState={arrowId}
                  field={item}
                  onClick={() => {
                    changeArrowId(item)
                    arrowId ? handleSort(item, 1) : handleSort(item, -1)
                  }}
                />
                {`${item}`}
              </th>
            }
          )}
        </tr>
      </thead>
      
      <tbody>
        {data && data.length ? data.map(
          (item, i) => (
            <tr key={i}>
              {Object.keys(item).map((cell, key) => {
                if (cell === 'isChecked') {
                  return <td key={key}>
                    <input id="checkbox" checked={ checkedItemIndexes.includes(i) } type="checkbox" onChange={() => checkboxHandle(i)}/>
                    {/*{checkedItemIndexes.includes(i) ? <RemoteSubmitButton /> : null }*/}
                  </td>
                } else {
                  return <td key={key}>{
                    checkedItemIndexes.includes(i) && cell !== 'id' ? <CorrectDataForm fieldName={cell} initialData={data[i]} onSubmit={(data) => correctTableData(data)}  /> : item[cell]
                  }</td>
                }
              })}
            </tr>)
        ) : null}
      </tbody>
    </table>
    
    {/*<div><RemoteSubmitButton /></div>*/}
  </>
  )
}

const SortButton = ({
  arrowDisplayState,
  onClick,
  field,
  }) => {
  return (
    <span onClick={onClick}>{arrowDisplayState === field ? <>&#9650;</> : <>&#9660;</>}</span>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
}

Table.defaultProps = {
  data: []
}

export default Table