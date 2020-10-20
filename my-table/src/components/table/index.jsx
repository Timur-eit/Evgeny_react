import React from 'react'

const Table = ({data}) => {
  return(
    <table border="1">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>class</th>
          <th>author</th>
          <th>current version</th>
        </tr>
      </thead>
      <tbody>{
        data && data.length && data.map((item, i) => <tr key={i}>{
          Object.keys(item).map((cell, key) => <td key={key}>{item[cell]}</td>)
        }</tr>)
      }</tbody>
    </table>
  )
}

export default Table