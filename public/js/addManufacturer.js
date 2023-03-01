let manufacturer_name;
const addManufacturerButtonHandler = async (event) => {
  event.preventDefault()
  manufacturer_name = document.querySelector('#manufacturer-name').value.trim()

  if (manufacturer_name) {
    const response = await fetch('/api/users/addManufacturer', {
      method: 'POST',
      body: JSON.stringify({ manufacturer_name }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      document.location.replace('/profile')
    } else {
      alert(response.statusText)
    }
  }
}
document.querySelector('#submit-manufacturer').addEventListener('click', addManufacturerButtonHandler)
