const searchFDAButtonHandler = async (event) => {
  event.preventDefault()

  const response = await fetch('/api/FDARoutes/search', {
    method: 'GET'
  })

  if (response.ok) {
    document.location.replace('/api/FDARoutes')
  } else {
    alert(response.statusText)
  }
}
document.querySelector('#recalls-btn').addEventListener('click', searchFDAButtonHandler)
