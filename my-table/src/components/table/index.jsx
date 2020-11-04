import React, { useState } from 'react'
import PropTypes from 'prop-types'

const columns = ['id', 'name', 'class', 'author', 'current version', 'isChecked'];

const Table = ({ data, handleSort, handleCheck }) => {

  // const [arrowDisplay, setArrowDisplay] = useState(false)
  const [arrowDisplay, setArrowDisplay] = useState('')

  function changeArrowDisplayState(fieldName) {
    setArrowDisplay(() => {
      if (arrowDisplay !== fieldName) {
        return fieldName
      } else {
        return ''
      }
    })
    // console.log(fieldName)
  }

  return(
    <table border="1">
      <thead>
        <tr>
        {/* !!! состояние работает для всех сразу - как исправить ? */}
          {columns.map((item, i) => (
            <th key={i}>
              {`${item}`}
              <SortButton
                displayState={arrowDisplay}
                // displayHandeler={() => changeArrowDisplayState(item)}
                sort={handleSort}
                field={item}

                onClick={() => {
                  changeArrowDisplayState(item)
                  arrowDisplay ? handleSort(item, 1) : handleSort(item, -1)}
                }
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data.length ? data.map(
          (item, i) => (
            <tr key={i}>
              {Object.keys(item).map((cell, key) => {

                if (cell === 'isChecked') {
                  return <td key={key}><input type="checkbox" onClick={() => handleCheck(i)} checked={item[cell]}/></td>
                } else {
                  return <td key={key}>{item[cell]}</td>
                }

              })}
            </tr>)
        ) : null}
      </tbody>
    </table>
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
      {console.log(displayState)}
    </>
  );
}

export default Table






/* <th>id<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='id'/></th>
<th>name<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='name'/></th>
<th>class<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='class'/></th>
<th>author<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='author'/></th>
<th>current versiont<SortButton arrowDisplayHandler={changeArrowDisplayState} displayState={arrowDisplay} {...rest} field='current versiont'/></th> */