import {isInputInData} from './shared/utils/search.js'
import data from './data/mock'

it.skip('isInputInData has worked', () => { // it or test ?
  const value = 'Java'
  const firstLine = data()[0]
  const secondLine = data()[1]
  const thirdLine = data()[2]

  expect(typeof isInputInData(value, firstLine.name)).toBe('boolean')
  expect(isInputInData(value, firstLine.name)).toBeTruthy()
  expect(isInputInData('python', thirdLine.name)).toBe(true)
  expect(isInputInData('Гвидо', thirdLine.author)).toBe(true)
  expect(isInputInData('гвидо', thirdLine.author)).toBe(true)
  expect(isInputInData('p', thirdLine.name)).toBe(true)
  expect(isInputInData('p', secondLine.name)).toBe(true)

  expect(isInputInData(value, secondLine.name)).toBeFalsy()
  expect(isInputInData('script', secondLine.name)).toBe(false)
  expect(isInputInData('py', firstLine.name)).toBe(false)
  expect(isInputInData('javaScript', thirdLine.name)).toBe(false)
})