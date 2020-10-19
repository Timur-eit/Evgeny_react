import React, {useState, useEffect} from 'react';
import './App.css';
import Table from './components/table';

const inputs = ['id', 'name', 'class', 'author', 'version'];

const getInitialState = () => Object.fromEntries(inputs.map(inputName => [inputName, '']));

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
    setData(prev => ({...prev, [name]: value}));

    // console.log(event.target);
  }

  function handleSubmit(event) {
    alert('Entered data: ' + inputData);
    event.preventDefault();
  }

  // console.log(tableData);
  console.log(inputData);


  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleSubmit}>
        <div>
          {inputs.map(item => (
            <input type='text' key={item} name={item} value={inputData[item]} onChange={handleChange} />
          ))}
        </div>
        <button type="submit">Отправить</button>
      </form>
        <Table data={tableData}/>
      </header>
    </div>
  );
}

export default App;
