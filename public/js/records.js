const saveData = async (event) => {
  event.preventDefault()

  const comment = document.querySelector('#comment_name').value.trim()
  const product_description = document.querySelector('#description').innerHTML.trim()
  const reason_for_recall = document.querySelector('#reason').innerHTML.trim()
  const recalling_firm = document.querySelector('#recall-firm').innerHTML.trim()
  const recall_number = document.querySelector('#recall-number').innerHTML.trim()

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
for (const i of saveButton) {
  i.addEventListener('click', saveData)
}
