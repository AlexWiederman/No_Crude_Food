let manufacturer_name
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

const deleteManufacButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id')

    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      location.reload()
    } else {
      alert('Failed to delete the manufacturer.')
    }
  }
}
document.querySelector('#submit-manufacturer').addEventListener('click', addManufacturerButtonHandler)

const deleteBtn = document.querySelectorAll('.delete-manuf-btn')
for (i of deleteBtn) {
  i.addEventListener('click', deleteManufacButtonHandler)
}
