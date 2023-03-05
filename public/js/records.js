const saveData = async (event) => {
  event.preventDefault()

  // Targeting the data that is with the save button that is clicked

  const id = event.target.getAttribute('data-id')
  
  // Making sure the recall number is on all data to know it is the correct data
  const commentRaw = document.querySelector(`.comment_name.${id}`)
  const comment = commentRaw.value.trim()

  // const comment = "comment"
  const product_description = document.querySelector(`.description.${id}`).innerHTML.trim()
  const reason_for_recall = document.querySelector(`.reason.${id}`).innerHTML.trim()
  const recalling_firm = document.querySelector(`.recall-firm.${id}`).innerHTML.trim()
  const recall_number = document.querySelector(`.recall-number.${id}`).innerHTML.trim()

  console.warn(comment)
  console.warn(product_description)
  console.warn(recalling_firm)
  console.warn(recall_number)

  if (
    comment &&
    product_description &&
    reason_for_recall &&
    recalling_firm &&
    recall_number
  ) {
    const response = await fetch('/api/FDARoutes/comment', {
      method: 'POST',
      body: JSON.stringify({
        comment,
        product_description,
        reason_for_recall,
        recalling_firm,
        recall_number
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
      document.location.replace('/api/records')
    } else {
      alert(response.statusText)
    }
  }
}

// Add event listener to each button
const saveButton = document.querySelectorAll('#save-data-button')
console.log(saveButton)
for (const i of saveButton) {
  i.addEventListener('click', saveData)
}
