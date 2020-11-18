import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

// в UI пропсы только принимаются !

// console.log(tabsData);

function TabButton({ name, tabNumberChanger }) {
  return (
    <button onClick={tabNumberChanger}>{name}</button>
  )
};

export function Tabs({ dataTabs = [] }) { // [{tabName, component}]
  const [activeTabName, setActiveTabName] = useState(dataTabs[0].tabName)

  return (
    <div className='tabs'>
      <div className='tabs__buttons'>
        {dataTabs.map((item, i) => {
          return <TabButton key={i} name={item.tabName} tabNumberChanger={() => setActiveTabName(item.tabName)} />
        })}
      </div>
      <div className='tabs__content-box'>
        {dataTabs.map((item, i) => {
          if (activeTabName === item.tabName) {
            return <div key={i}>{item.component}</div>
          }
        })}
      </div>
    </div>
  )
}

Tabs.defaultProps = {
  dataTabs: [{}]
}

Tabs.propTypes = {
  dataTabs: PropTypes.arrayOf(PropTypes.shape({
    tabName: PropTypes.string,
    // tabName: PropTypes.string.isRequired,
    content: PropTypes.element,
    // content: PropTypes.element.isRequired,
  }))
}

// element = jsx