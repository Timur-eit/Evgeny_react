import React, {useState, useEffect} from 'react';
import './App.css';
import Table from './components/table';

const inputs = ['name', 'class', 'author', 'version'];

const getInitialState = () => Object.fromEntries(inputs.map(inputName => [inputName, '']));

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

function App() {
  const [tableData, setTableData] = useState([]);
  const [inputData, setData] = useState(() => getInitialState());

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/7bdb672721f7526844e137ad41f1f1bf31df4e0a/Evgeny_table.json')
      .then(response => response.json())
      .then(data => setTableData(data))
  }, [])

  function handleChange(event) {
    const { name, value } = event.target;
    setData(prev => ({id: tableData.length + 1, ...prev, [name]: value}));
  }

  function handleSubmit(event) {
    alert('Entered data: ' + inputData.name);
    setTableData([...tableData].concat([inputData]))
    event.preventDefault();
  }

  // console.log(tableData);
  console.log(inputData);

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
        <Table data={tableData}/>
        {/* <Table data={[inputData]}/> */}
      </header>
    </div>
  );
}

export default App;
