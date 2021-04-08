export function isInputInData(input, data) {
  const dataToText = data.toString().toLowerCase()
  const inputToText = input.toString().toLowerCase()
  let i = 0
  for (const char of dataToText) {
    if (char === inputToText[0]) {
        return inputToText === dataToText.slice(i, i + inputToText.length)
    }
  	i++
  }
  return false
}