import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/table';
// import data from './data/data.json';
// import { addCookie, getCookie, deleteCookie } from './cookie'

const inputs = ['name', 'class', 'author', 'version'];

const getInitialState = () => Object.fromEntries(inputs.map(inputName => [inputName, '']));

const useCurentData = (tableData, tableFilterData, setTableData, setTableFilterData) => {
  if (tableData && tableData.length) {
    return [tableFilterData, setTableFilterData]
  } else {
    return [tableData, setTableData]
  }
}

function App() {
  const [tableData, setTableData] = useState([])
  const [tableFilterData, setTableFilterData] = useState([])
  const [inputData, setData] = useState(getInitialState)
  const [currentTableData, setCurrentTableData] = useCurentData(tableData, tableFilterData, setTableData, setTableFilterData)

  const [checkIndexes, setcheckIndexes] = useState([])

  const currentTable = currentTableData && currentTableData.length


  useEffect(() => {
    // const cookie = getCookie('table')
    const localTable = window.localStorage.getItem('table')

    if (localTable) {
      setTableData(() => JSON.parse(localTable))
    } else {
      fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/c809ff8ccbc22376ea6397a3460ea423ac5b40b3/Evgeny_table.json')
        .then(response => response.json())
        .then(data => setTableData(() => data))
      }
  }, [])


  function handleChange(event) {
    const { name, value } = event.target

    // console.log(tableData)

    setData(prev => {
      let obj = { ...prev, id: tableData.length + 1, [name]: value, isChecked: false }
      const { id, ...rest } = obj
      return { id, ...rest }
    })
  }

  function handleSubmit(event) {
    const newTableData = [...tableData].concat([inputData])
    setTableData(() => newTableData)
    event.preventDefault()
    // addCookie('table', JSON.stringify(newTableData))
    window.localStorage.setItem('table', JSON.stringify(newTableData))
  }

  function sortTable(field, direction) { // direction: one of [1, -1]
    setTableData(prev => [...prev].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction * -1;
      }
      else if (a[field] > b[field]) {
        return direction * 1;
      }
      return 0;
    }));
  }

  function search(event) {
    const value = event.target.value

    let resultData = [...tableData].filter(item => {

      let result = null

      for (const key in item) {
        if (isInputInData(value, item[key])) {
        result = item
        }
      }
      return result
    })

    setCurrentTableData(() => resultData)
  }


  function checkCurrentLine(lineId) {
    // console.log(lineId)

    // let newTableData = currentTableData ? currentTableData.map(item => ({...item})) : tableData.map(item => ({...item}))
    // let newTableData = currentTableData.map(item => ({...item}))

    // let newTableData = null

    // if (currentTable) {
    //   newTableData = currentTableData.map(item => ({...item}))
    // } else {
    //   newTableData = tableData.map(item => ({...item}))
    // }

    // newTableData = newTableData.map((item, i) => {
    //   if (i === lineId) {
    //     item.isChecked = !item.isChecked
    //   }
    //   return item
    // })

    // setCurrentTableData(() => newTableData)

    // console.log(lineId)


    setcheckIndexes(prev => {
      if (prev.includes(lineId)) {
        return prev.filter(item => item !== lineId)
      } else {
        const newCheckIndexes = [...checkIndexes]
        newCheckIndexes.push(lineId)
        return newCheckIndexes
      }
    })

  }
  // console.log(checkIndexes)

  function deleteRow() {

    const filteredDataTable = [...tableData].filter((_, i) => !checkIndexes.includes(i))

    let dataItemId = 0

    const updatedDataTable = filteredDataTable.map(item => {
      let obj = { ...item }
      dataItemId++
      obj.id = dataItemId
      return obj
    })

    setCurrentTableData(() => updatedDataTable)
    setTableData(() => updatedDataTable)
    window.localStorage.setItem('table', JSON.stringify(updatedDataTable))

    setcheckIndexes(() => [])

    // ?? насколько неправильный такой подход ↓
    let checkBoxes = document.querySelectorAll('input#checkbox')
    checkBoxes.forEach((item) => item.checked = false)
  }


  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <div>
            {inputs.map((item, key) =>
              <input type='text' key={key} name={item} value={inputData[item]} onChange={handleChange} />)}
          </div>
          <button type="submit">Отправить</button>
        </form>


        <div>
          <label>
            Search
            <input type='text' onChange={search}/>
          </label>
        </div>

        <div>
          {checkIndexes && checkIndexes.length ? (<button className='deleteButton' onClick={() => deleteRow()}>delete row</button>) : null}
        </div>

        <Table
          data={currentTable ? currentTableData : tableData}
          handleCheck={checkCurrentLine}
          handleSort={sortTable}

          checkedRowsIndexes={checkIndexes}
          handleSetCheckedRos={setcheckIndexes}
        />
      </header>
    </div>
  );
}


function isInputInData(input, data) {
  const dataToText = data.toString().toLowerCase()
  const inputToText = input.toString().toLowerCase()
  let i = 0

  for (const char of dataToText) {
    if (char === inputToText[0]) {
      if (inputToText === dataToText.slice(i, i + inputToText.length)) {
        return true
      } else {
        return false
      }
    }
    i++
  }
  return false
}

export default App;



// const [searchData, setSearchData] = useState({ searchValue: '' })

// function handleSearchInput(event) {
//   const value = event.target.value
//   setSearchData(prev => ({...prev, searchValue: value }))
// }

// const handleChange = useCallback((event) => {

//   const { name, value } = event.target
//     console.log({ id: tableData.length + 1, ...tableData, [name]: value})
//     setData({ id: tableData.length + 1, ...tableData, [name]: value})
//   }, [tableData, setData, inputData])



// class App extends React.Component{
//
//   constructor(props) {
//     super(props);
//
//   }
//
//   componentDidMount() {
//     fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/7bdb672721f7526844e137ad41f1f1bf31df4e0a/Evgeny_table.json')
//       .then(response => response.json())
//       .then(data => this.setState({tableData: data}))
//   }
//
//   componentDidUpdate(prevProps, prevState, snapshot) {
//     if(JSON.stringify(prevState) !== JSON.stringify(this.state)){
//
//     }
//   }
//
//   componentWillUnmount() {
//
//   }
//
//   state = {
//     tableData : [],
//     inputData : getInitialState
//   }
//
//   render(){
//
//     return (
//       <div className="App">
//         <header className="App-header">
//           <form onSubmit={handleSubmit}>
//             <div>
//               {inputs.map(item => (
//                 <input type='text' key={item} name={item} value={inputData[item]} onChange={handleChange} />
//               ))}
//             </div>
//             <button type="submit">Отправить</button>
//           </form>
//           <Table data={tableData}/>
//           {/* <Table data={[inputData]}/> */}
//         </header>
//       </div>
//     );
//   }
//
// }
