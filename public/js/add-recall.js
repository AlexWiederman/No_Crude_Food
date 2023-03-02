
const searchFDAButtonHandler = async (event) => {
  event.preventDefault()

  var response = await fetch('https://api.fda.gov/food/enforcement.json?search=recalling_firm:"Pharmatech+LLC"+AND+status.exact:Ongoing&limit=5', {
    method: 'GET'
  })

  if (response.ok) {
    response = response.json();
    console.log(response)
    // document.location.replace('/api/FDARoutes')
  } else {
    alert(response.statusText)
  }
}

document.querySelector('#search-fda').addEventListener('click', searchFDAButtonHandler)
