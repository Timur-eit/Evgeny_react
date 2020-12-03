import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {  
  arrowIdSelector,
  changeArrowId,
} from '../../models/tableView'

export const Table = ({
  columns,
  data,
  handleSort,
  
  checkboxHandle,
  chekedItemIndexs,  
  checkAllCheckboxes,

  arrowId,
  changeArrowId,

  }) => {


  // function checkAllChekboxes() {    
  //   data.forEach((_, i) => {      
  //     checkboxHandle(i)
  //   })
  // }

  return(
    <table border="1">
      <thead>
        <tr>
          {columns.map((item, i) => {
              if (item === 'isChecked') {
                return <th key={i}>{`${item}`} <button onClick={() => checkAllCheckboxes()}>Check all</button></th>
              } else {
                return <th key={i}>{`${item}`}
                  <SortButton
                    arrowDisplayState={arrowId}
                    field={item}
                    onClick={() => {
                      changeArrowId(item)
                      arrowId ? handleSort(item, 1) : handleSort(item, -1)
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
                  return <td key={key}><input id="checkbox" checked={ chekedItemIndexs.includes(i) } type="checkbox" onChange={() => checkboxHandle(i)}/></td>
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

const SortButton = ({
  arrowDisplayState,
  onClick,
  field,  
}) => {
  return (    
    <span onClick={onClick}>{arrowDisplayState === field ? '↑' : '↓'}</span>    
  );
}



Table.propTypes = {
  data: PropTypes.array,
  handleSort: PropTypes.func,
}

Table.defaultProps = {
  data: []
}


export default connect(state => ({ // куда экспортируется ?
  arrowId: arrowIdSelector(state) // второй арнумент?
}), {
  changeArrowId
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
