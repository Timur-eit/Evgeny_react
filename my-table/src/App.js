import React, {useState, useEffect} from 'react';
import './App.css';
import Table from './components/table'

function App() {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/Greyewi/b6da020196da66028c3058ea0746a08f/raw/7bdb672721f7526844e137ad41f1f1bf31df4e0a/Evgeny_table.json')
      .then(response => response.json())
      .then(data => setTableData(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Table data={tableData}/>
      </header>
    </div>
  );
}

export default App;
