
//  button to get data from /api/FDARoutes
const getDataButton = document.createElement('button')
getDataButton.innerText = 'Get Data'
getDataButton.addEventListener('click', async () => {
  const id = 1 
  const response = await fetch(`/api/FDARoutes=${id}`)
  if (response.ok) {
    const data = await response.json()
    console.log(data) 
  } else {
    console.error('Failed to fetch data')
  }
})
document.body.appendChild(getDataButton)

//  button to save data to /api/FDARoutes 
const saveDataButton = document.createElement('button')
saveDataButton.innerText = 'Save Data'
saveDataButton.addEventListener('click', async () => {
  const id = 1 
  const data = {}
   
  
  const response = await fetch(`/api/FDARoutes=${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
  if (response.ok) {
    console.log('Data saved successfully')
  } else {
    console.error('Failed to save data')
  }
})
document.body.appendChild(saveDataButton)





<script src="./js/login.js"></script>
