import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './style.css'

const modalElem = document.querySelector('#portal')
const element = document.createElement('div')

function Modal( { children, defaultOpen = false } ) {
  const [isOpen, setOpen] = useState(defaultOpen)
  const [coords, setCoords] = useState({})

  useEffect(() => {
    modalElem.appendChild(element)
    // когда перешли на др страницу => willUnMount
    // т.е. modal исчезнет
    return () => {
      modalElem.removeChild(element)
    }
    // return - willUnMount
  }, [])

  useEffect(() => {
    if (isOpen) {
      const modal = document.querySelector('.modal')
      if (modal && Object.keys(coords).length === 0) {
        setCoords(() => getCoords(modal))
      }
    }
  }, [isOpen, coords])


  return (
    <div className='modal__container'>
      <button onClick={() => setOpen(!isOpen)}>Open</button>
      {isOpen && ReactDom.createPortal(
        <div className='wrap' onClick={() => setOpen(!isOpen)}>
          <div className='modal' style={coords.left ? { left: coords.left - coords.width / 2, top: coords.top - coords.height / 2 } : {}} onClick={(event) => {
              event.stopPropagation()
              // console.log('click')
              // console.log(event.target)
              console.log('width ' + coords.width)
              console.log('left ' + coords.left)
            }}>
            <button onClick={() => setOpen(!isOpen)}>X</button>
            {children}
          </div>
        </div>, element
      )}
    </div>
  )
}

export default Modal

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