import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Table = ({data, ...rest}) => {
  const [arrowDisplay, setArrowDisplay] = useState(false)

  function changeArrowDisplayState() {
    setArrowDisplay(state => !state)
  }

  return(
    <table border="1">
      <thead>
        <tr>
          <th>id<SortButton arrowDisplayHandler={changeArrowDisplayState} displayStaty={arrowDisplay} {...rest} field='id'/></th>
          <th>name<SortButton arrowDisplayHandler={changeArrowDisplayState} displayStaty={arrowDisplay} {...rest} field='name'/></th>
          <th>class<SortButton arrowDisplayHandler={changeArrowDisplayState} displayStaty={arrowDisplay} {...rest} field='class'/></th>
          <th>author<SortButton arrowDisplayHandler={changeArrowDisplayState} displayStaty={arrowDisplay} {...rest} field='author'/></th>
          <th>current versiont<SortButton arrowDisplayHandler={changeArrowDisplayState} displayStaty={arrowDisplay} {...rest} field='current versiont'/></th>
        </tr>
      </thead>
      <tbody>{
        data && data.length ? data.map((item, i) => <tr key={i}>{
          Object.keys(item).map((cell, key) => <td key={key}>{item[cell]}</td>)
        }</tr>) : null
      }</tbody>
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

const SortButton = ({ field, handleSort, arrowDisplayHandler, displayStaty }) => {
  return (
    <>
      <span onClick={() => {
        arrowDisplayHandler()
        handleSort(field, 1)}
      }
        style={{'display' : displayStaty ? 'inline' : 'none'}}
      >
        ↓
      </span>
      <span onClick={() => {
        arrowDisplayHandler()
        handleSort(field, -1)}
      }
        style={{'display' : !displayStaty ? 'inline' : 'none'}}
      >
        ↑
      </span>
    </>
  );
}

export default Table