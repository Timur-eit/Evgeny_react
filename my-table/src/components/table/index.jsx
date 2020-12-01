import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {
  reduxArrowDisplaySelector,
  changeReduxArrowDisplayState,
} from '../../models/tableData'

const columns = ['id', 'name', 'class', 'author', 'current version', 'isChecked'];

export const Table = ({
  data,
  handleSort,
  handleCheck,
  handleSetCheckedRows,
  checkedRowsIndexes,

  reduxArrowDisplay,
  changeReduxArrowDisplayState,
  }) => {


  function checkAll() {
    const allIndexes = [...data].map((item, i) => item = i)
    handleSetCheckedRows(() => allIndexes)
  }

  return(
    <table border="1">
      <thead>
        <tr>
          {columns.map((item, i) => {
              if (item === 'isChecked') {
                return <th key={i}>{`${item}`} <button onClick={() => checkAll()}>Check all</button></th>
              } else {
                return <th key={i}>{`${item}`}
                  <SortButton
                    displayState={reduxArrowDisplay}
                    field={item}
                    onClick={() => {
                      changeReduxArrowDisplayState(item)
                      reduxArrowDisplay ? handleSort(item, 1) : handleSort(item, -1)
                    }}
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
                  return <td key={key}><input id="checkbox" checked={ checkedRowsIndexes.includes(i) } type="checkbox" onChange={() => handleCheck(i)}/></td>
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


const SortButton = ({
  displayState,
  onClick,
  field,

  // reduxArrowDisplay,
}) => {

  console.log(displayState)

  return (
    <>
      <span onClick={onClick}>{displayState === field ? '↑' : '↓'}</span>
    </>
  );
}

export default connect(state => ({ // куда экспортируется ?
  reduxArrowDisplay: reduxArrowDisplaySelector(state) // второй арнумент?
}), {
  changeReduxArrowDisplayState
})(Table)






// const [arrowDisplay, setArrowDisplay] = useState('')

  // function changeArrowDisplayState(fieldName) {
  //   setArrowDisplay(() => {
  //     if (arrowDisplay !== fieldName) {
  //       return fieldName
  //     } else {
  //       return ''
  //     }
  //   })
  // }
