import React from 'react'
import PropTypes from 'prop-types'

const Table = ({data, ...rest}) => {
  return(
    <table border="1">
      <thead>
        <tr>
          <th>id<SortButton {...rest} field='id'/></th>
          <th>name<SortButton {...rest} field='name'/></th>
          <th>class<SortButton {...rest} field='class'/></th>
          <th>author<SortButton {...rest} field='author'/></th>
          <th>current versiont<SortButton {...rest} field='current versiont'/></th>
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

const SortButton = ({ field, handleSort }) => {
  return <> <span onClick={() => handleSort(field, 1)}>↓</span><span onClick={() => handleSort(field, -1)}>↑</span> </>;
}

export default Table