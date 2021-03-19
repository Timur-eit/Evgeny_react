import {isInputInData} from './models/tableData'
import data from './data/mock'

it('isInputInData has worked', () => {
  const value = 'Java'
  const firstLine = data()[0]
  const secondLine = data()[1]

  expect(typeof isInputInData(value, firstLine.name)).toBe('boolean')
  expect(isInputInData(value, firstLine.name)).toBeTruthy()
  expect(isInputInData(value, secondLine.name)).toBeFalsy()
})