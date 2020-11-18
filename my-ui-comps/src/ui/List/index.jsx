import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import './style.css';

const selectELem = document.querySelector('#portal');
const element = document.createElement('div');

function List({ inputValue, items, defaultOpen = false }) {
  const [isOpen, setOpen] = useState(defaultOpen);
  const [coords, setCoords] = useState({});
  const [availableItems, setAvailableItems] = useState(items)

  useEffect(() => {
    selectELem.appendChild(element);    
    return () => {
      selectELem.removeChild(element);    
    }
  }, []);


  useEffect(() => {
    if (isOpen) {
      const input = document.querySelector('.list__input')
      if (input && Object.keys(coords).length === 0) {
        setCoords(() => getCoords(input))
      }
    }
  }, [isOpen, coords]);

  function handleFilterOptions(value) {
    const newItems = [...items].filter(item => item.props.children.indexOf(value) !== -1)
    setAvailableItems(newItems)
  }  

  return (
    <div className='list__container'>
      <input className='list__input' defaultValue={inputValue} type='text' onChange={(event) => handleFilterOptions(event.target.value)} onClick={() => setOpen(!isOpen)}></input>

      {isOpen && ReactDom.createPortal(
        <div className='list__wrap' onClick={() => setOpen(!isOpen)}>
          <div className='list' style={coords.top ? {left: coords.left + 20, top: coords.top + coords.height} : {}}>
            {availableItems}
            {console.log(items)}
          </div>
        </div>, element
      )}
      </div>
  )
}

export default List;


function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset, // pageYOffset - кол-во пикселей на сколько проскролено окно
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset,
    width: box.width,
    height: box.height,
  };
}