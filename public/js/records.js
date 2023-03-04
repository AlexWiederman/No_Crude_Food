
//  button to get data from /api/FDARoutes
// const getDataButton = document.createElement('button')
// getDataButton.innerText = 'Get Data'
// getDataButton.addEventListener('click', async () => {
//   const id = 1
//   const response = await fetch(`/api/FDARoutes=${id}`)
//   if (response.ok) {
//     const data = await response.json()
//     console.log(data)
//   } else {
//     console.error('Failed to fetch data')
//   }
// })
// document.body.appendChild(getDataButton)

//  button to save data to /api/FDARoutes
function saveData (id) {
  const data = {}

  fetch(`/api/FDARoutes=${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }).then(response => {
    if (response.ok) {
      console.log('Data saved successfully')
    } else {
      console.error('Failed to save data')
    }
  })
}

// Add event listener to each button
const saveDataButtons = document.querySelectorAll('.save-data-button')
saveDataButtons.forEach(button => {
  const id = button.dataset.id

  button.addEventListener('click', () => {
    saveData(id)
  })
})
