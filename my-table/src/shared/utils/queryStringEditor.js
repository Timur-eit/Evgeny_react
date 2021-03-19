export function queryStringEditor(event, fieldName, history) {
  const { value } = event.target
  // const search = history.location.search
  const search = window.location.search
  const regexp = new RegExp(`(\\??&?${fieldName})=(\\w+)`)
  const match = search.match(regexp)
  let newSearch

  if (value.length > 0) {
    if (search.length > 0) {
      if (match !== null) {
        newSearch = search.replace(regexp, `$1=${value}`)
        history.replace({ search: newSearch })
      } else {
        newSearch = `${search}&${fieldName}=${value}`
        history.replace({ search: newSearch })
      }
    } else {
      history.push({ search: `?${fieldName}=${value}` })
    }
  } else {
    if (match[1].match(/\?/)) {
      const regexpForQuestion = RegExp(`(&?${fieldName})=(\\w+&?)`)
      newSearch = search.replace(regexpForQuestion, '')
      history.replace({ search: newSearch })
    } else {
      newSearch = search.replace(regexp, '')
      history.replace({ search: newSearch })
    }
  }
}

