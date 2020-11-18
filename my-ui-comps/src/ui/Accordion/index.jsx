import React, { useState } from 'react';
// import PropTypes, { func } from 'prop-types';
import './style.css';
import arrow from './up-arrow.svg';
import classNames from 'classnames';

// в UI пропсы только принимаются !

// console.log(tabsData);

function Content({ name, content, displayState, clickHandler }) {
  
  let accordingTitleClasses = classNames({
    according__title: true,
    discloses: displayState,
  })

  let arrowClasses = classNames({
    'arrow-down': !displayState,
  })
  
  return (
    <div>
      <div className={accordingTitleClasses} onClick={() => clickHandler(name)}>
        <div>{name}</div>
        <img className={arrowClasses} src={arrow} width={10} height={10} alt=''/>
      </div>
      <div className='accordion__content'>
        {displayState && (
          <div className='content__value'>{content}</div>
        )}
      </div>
    </div>
  )
}

export function Accordion({ dataTabs = [] }) { // [{tabName, component}]
  const [displayContentName, setDisplayContentName] = useState('')

  function displayContentNameHandler(titleName) {
    setDisplayContentName(() => {
      if (displayContentName !== titleName) {
        return titleName
      } else {
        return ''
      }
    })
  }

  const checkDisplayState = (titleName) => titleName === displayContentName

  return (
    <div className='accordion'>
      {dataTabs.map((item, i) => {
        return <Content
          key={i}
          name={item.tabName}
          content={item.component}
          displayState={checkDisplayState(item.tabName)}
          clickHandler={displayContentNameHandler}
        />
      })}   
    </div>
  )
}

// Tabs.defaultProps = {
//   dataTabs: [{}]
// }

// Tabs.propTypes = {
//   dataTabs: PropTypes.arrayOf(PropTypes.shape({
//     tabName: PropTypes.string,
//     // tabName: PropTypes.string.isRequired,
//     content: PropTypes.element,
//     // content: PropTypes.element.isRequired,
//   }))
// }

// element = jsx