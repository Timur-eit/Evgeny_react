import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

const columns = ['id', 'name', 'class', 'author', 'current version', 'isChecked'];


const Table = ({ data, handleSort, handleCheck, handleSetCheckedRos, checkedRowsIndexes }) => {
  const [arrowDisplay, setArrowDisplay] = useState('')

  function changeArrowDisplayState(fieldName) {
    setArrowDisplay(() => {
      if (arrowDisplay !== fieldName) {
        return fieldName
      } else {
        return ''
      }
    })
  }

  function checkAll() {
    const allIndexes = [...data].map((item, i) => item = i)    
    handleSetCheckedRos(() => allIndexes)    
    
    let checkBoxes = document.querySelectorAll('input#checkbox')    
    checkBoxes.forEach((item) => item.checked = true)
  }  

  return(
    <Fragment>

    <table border="1">
      <thead>
        <tr>
          {columns.map((item, i) => {

              if (item === 'isChecked') {
                return <th key={i}>{`${item}`} <button onClick={() => checkAll()}>Check all</button></th>
              } else {
                return <th key={i}>{`${item}`}
                  <SortButton
                    displayState={arrowDisplay}
                    sort={handleSort}
                    field={item}
                    onClick={() => {
                      changeArrowDisplayState(item)
                      arrowDisplay ? handleSort(item, 1) : handleSort(item, -1)}
                    }
                  />
                </th>
              }
          })}
        </tr>
      </thead>
      <tbody>
        {data && data.length ? data.map(
          (item, i) => (
            <tr key={i}>
              {Object.keys(item).map((cell, key) => {
                if (cell === 'isChecked') {
                  return <td key={key}><input id="checkbox" defaultChecked={ checkedRowsIndexes.includes(i) } type="checkbox" onClick={() => handleCheck(i)}/></td>
                } else {
                  return <td key={key}>{item[cell]}</td>
                }
              })}
            </tr>)
        ) : null}
      </tbody>
    </table>
    </Fragment>
  )
}


Table.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
}

Table.defaultProps = {
  data: []
}


const SortButton = ({ displayState, onClick, field }) => {
  return (
    <>
      {/* <span style={{'display' : displayState ? 'inline' : 'none'}}>↓</span>
      <span style={{'display' : !displayState ? 'inline' : 'none'}}>↑</span> */}

      <span onClick={onClick}>{displayState === field ? '↑' : '↓'}</span>
    </>
  );
}

export default Table

// checked={item[cell]}




/* <th>id<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='id'/></th>
<th>name<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='name'/></th>
<th>class<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='class'/></th>
<th>author<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='author'/></th>
<th>current versiont<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='current versiont'/></th> */