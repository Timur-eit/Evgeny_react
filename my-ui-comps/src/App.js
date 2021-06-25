// import './App.css';
import { useState } from 'react';
import List from './ui/List';
import { Tabs } from './ui/Tabs_states';
import { Tabs2 } from './ui/Tabs_routing';
import { Accordion } from './ui/Accordion';
import { Accordion2 } from './ui/Accordion_2';
import { ColorPicker } from './ui/ColorPicker';
import { tabsData } from './tabsContent/tabsData'
import {
  BrowserRouter as Router, // глобальня обертка (можно в индекс джс)
  Switch,
  Route,
  Link
} from "react-router-dom";

// частные случаи в конце свитча !

const items = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

function App() {
  const [inpitValue, setInputValue] = useState('');

  return (
    <Router>
      <div className='links'>
        <div className='links__link'>
          <Link to='/tabs_states'>
            Tabs with states
          </Link>
        </div>
        <div className='links__link'>
          <Link to='/tabs_router'>
            Tabs with routing
          </Link>
        </div>
        <div className='links__link'>
          <Link to='/list'>
            list
          </Link>
        </div>
        <div className='links__link'>
          <Link to='/accord1'>
            Accordion with one state
          </Link>
        </div>
        <div className='links__link'>
          <Link to='/accord2'>
            Accordion with several states
          </Link>
        </div>
        <div className='links__link'>
          <Link to='/color-picker'>
            Color Picker
          </Link>
        </div>
      </div>
      <Switch>        
        <Route path='/tabs_states'>
          <h2>Tabs</h2>
          <Tabs dataTabs={tabsData} />
        </Route>
        <Route path='/tabs_router'>
          <h2>Tabs</h2>
          <Tabs2 dataTabs={tabsData} originPath={'/tabs_router'} />
        </Route>
        <Route path='/list'>
        <h2>List</h2>
          <List
            items={items.map((item, i) => <div key={i} onClick={() => setInputValue(item)}>{item}</div>)}
            inputValue={inpitValue}
          />
        </Route>
        <Route path='/accord1'>
          <h2>Accordion</h2>
          <Accordion dataTabs={tabsData} />
        </Route>
        <Route path='/accord2'>
          <h2>Accordion 2</h2>
          <Accordion2 dataTabs={tabsData} />
        </Route>
        <Route path='/color-picker'>
          <h2>Color Picker (gradinet)</h2>
          <ColorPicker />
        </Route>        
        <Route exact path='/ui-comps/index.html'>
          <h2>Please choose link</h2>
        </Route>
        <Route path='*'>
          404
          Doesn't exist
          {/* {component 404 with gifs} */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;







// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }