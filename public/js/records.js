
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
function saveData (event) {
  event.preventDefault()
  const comment = document.querySelector('#comment_name').value.trim()
  const product_description = document.querySelector('#description')
  const reason_for_recall = document.querySelector('#reason')
  const recalling_firm = document.querySelector('#recall-firm')
  const recall_number = document.querySelector('#recall-number')

  fetch('/api/records', {
    method: 'POST',
    body: JSON.stringify({ comment, product_description, reason_for_recall, recalling_firm, recall_number }),
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
const saveButton = document.querySelectorAll('#save-data-button')
for (const i of saveButton) {
  i.addEventListener('click', saveData)
}
