import PropTypes from 'prop-types';
import './style.css';
import {
  BrowserRouter as Router, // глобальня обертка (можно в индекс джс)
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
// import { Fragment } from 'react';

// в UI пропсы только принимаются !

// console.log(tabsData);

function TabButton({ name }) {
  return (
    <button>{name}</button>
  )
};

export function Tabs2({ dataTabs, originPath = '/' }) { // [{tabName, component}]
  const formattTabName = (str) => str.replace(/\s/g, '').toLowerCase()

  const location = useLocation()
  // console.log(location)

  return (
    <Router>

      <div className='tabs'>
        <div className='tabs__buttons'>
          {dataTabs.map((item, i) => {
            return <Link to={`${location.pathname}/${formattTabName(item.tabName)}`} key={i}>
              <TabButton
                name={item.tabName}
              />
            </Link>
          })}
        </div>
        <div className='tabs__content-box'>
          <Switch>
            {dataTabs.map((item, i) => {
              return (              
                <Route key={i} path={`${location.pathname}/${formattTabName(item.tabName)}`} >
                  <div>{item.component}</div>
                </Route>              
            )})}
          </Switch>
        </div>
      </div>
      </Router>



  )
}

Tabs2.defaultProps = {
  dataTabs: [{}]
}

Tabs2.propTypes = {
  dataTabs: PropTypes.arrayOf(PropTypes.shape({
    tabName: PropTypes.string,
    // tabName: PropTypes.string.isRequired,
    content: PropTypes.element,
    // content: PropTypes.element.isRequired,
  }))
}

// // element = jsx