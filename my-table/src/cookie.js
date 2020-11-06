export function addCookie(name, value, options) {
  options = options || {}
  
  let expires = options.expires
  
  if (typeof expires === "number" && expires) {
    const d = new Date()
    d.setTime(d.getTime() + expires * 1000)
    expires = options.expires = d
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString()
  }
  
  value = encodeURIComponent(value)
  
  let updatedCookie = name + "=" + value
  
  for (var propName in options) {
    updatedCookie += "; " + propName
    var propValue = options[propName]
    if (propValue !== true) {
      updatedCookie += "=" + propValue
    }
  }
  //console.log(updatedCookie)
  document.cookie = updatedCookie
}

export function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ))
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function deleteCookie(name) {
  addCookie(name, "", {
    expires: -1, path: '/'
  })
}