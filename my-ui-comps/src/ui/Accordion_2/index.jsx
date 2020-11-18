import React, { useState } from 'react';
// import PropTypes, { func } from 'prop-types';
import './style.css';
import arrow from './up-arrow.svg';

// в UI пропсы только принимаются !

// console.log(tabsData);

function Content({ name, content, contentItemId }) {
  const [contentIndex, setContentIndex] = useState([])
  
  function displayContent(contentItemId) {
    setContentIndex(prev => {
      if (prev.includes(contentItemId)) {
        return prev.filter(item => item !== contentItemId)
      } else {
        const newContentIndex = [...contentIndex]
        newContentIndex.push(contentItemId)
        return newContentIndex
      }
    })  
  }
  

  const checkId = (contentItemId) => contentIndex.includes(contentItemId)

  return (
    <div>
      <div className={checkId(contentItemId) ? 'according__title discloses' : 'according__title'} onClick={() => displayContent(contentItemId)}>
        <div>{name}</div>
        <img className={checkId(contentItemId) ? null : 'arrow-down'} src={arrow} width={10} height={10} alt=''/>
      </div>
      <div className='accordion__content'>
        {checkId(contentItemId) && (
          <div className='content__value'>{content}</div>
        )}        
      </div>
    </div>
  )
}

export function Accordion2({ dataTabs = [] }) { // [{tabName, component}]
  return (
    <div className='accordion'>
      {dataTabs.map((item, i) => {
        return <Content
          key={i}
          name={item.tabName}
          content={item.component}
          contentItemId={i}
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