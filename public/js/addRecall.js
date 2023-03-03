const searchFDAButtonHandler = async (event) => {
  event.preventDefault()

  const response = await fetch('/api/FDARoutes/search', {
    method: 'GET'
  })

  if (!response.ok) {
    alert(response.statusText)
  }
}
document.querySelector('#recalls-btn').addEventListener('click', searchFDAButtonHandler)
