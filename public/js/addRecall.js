const searchFDAButtonHandler = async (event) => {
  event.preventDefault()

  const response = await fetch('/api/FDARoutes', {
    method: 'GET'
  })

  if (response.ok) {
    document.location.replace('/seeRecalls')
  } else {
    alert(response.statusText)
  }
}
document.querySelector('#recalls-btn').addEventListener('click', searchFDAButtonHandler)
