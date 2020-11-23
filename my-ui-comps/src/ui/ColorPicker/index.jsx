import { useState } from 'react'
import './style.css'

export function ColorPicker() {
  const defaultColor = '#c2c2c2'
  const defaultGradient = [defaultColor, defaultColor]
  const [backgroundColors, setBackgroundColor] = useState(defaultGradient)

  let [caughtColor1, caughtColor2] = backgroundColors
  let gradinetValue = backgroundColors.join(', ')

  function catchColorValue1(event) {
    const color = event.target.value
    caughtColor1 = color
  }

  function catchColorValue2(event) {
    const color = event.target.value
    caughtColor2 = color
  }
  
  // масштабироварие !
  
  return (
    <>
      <input id='color1' type='color' defaultValue={defaultColor} onChange={(event) => catchColorValue1(event)}></input>
      <input id='color2' type='color' defaultValue={defaultColor} onChange={(event) => catchColorValue2(event)}></input>
      <button className='color-changer'  onClick={() => setBackgroundColor([caughtColor1, caughtColor2])}>Paint below filed</button>
      <div className='field' style={ {background: `linear-gradient(${gradinetValue})` }}></div>
    </>
  )
}

