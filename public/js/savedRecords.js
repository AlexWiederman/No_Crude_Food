// function for opening the comment update form
const openUpdateForm = async (event) => {
  // define a variable for the section we want to make visible. records.handlebars is specifically formatted so that the target section is the next sibling element
  const updateRecordSection = event.target.nextElementSibling
  // remove the class making it invisible
  updateRecordSection.classList.remove('d-none')
  // add a class to the update button to make it invisible to avoid confusion
  event.target.classList.add('d-none')
}

// function for saving update comment data
const saveUpdate = async (event) => {

  // get id for the target data
  const id = event.target.getAttribute('data-id')

  // get text for updated comment
  const commentRaw = document.querySelector(`#update-comment-input-${id}`)
  const comment = commentRaw.value.trim()
  // get current date, will format in API
  const date_edited = new Date()

  // if there's text in the input section, run the code
  if (comment) {
    const response = await fetch(`/api/records/comment/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        comment,
        date_edited
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log("I did it, I'm the best")
    if (response.ok) {
      window.location.reload(true)
    } else {
      alert('Unable to update the record. Please try again.')
      console.log(response)
    }
  } else {
    // alert the user they need text if there isn't any
    alert('You must enter a new comment in order to update the record.')
  }
}

// function for closing the comment update section
const closeUpdateForm = async (event) => {
  // define a variable for the update section the button is part of
  const updateRecordSection = event.target.parentElement
  // use that variable to remove the class making the update button invisible
  updateRecordSection.previousElementSibling.classList.remove('d-none')
  // use the same variable to make the section itself invisible
  updateRecordSection.classList.add('d-none')
}

// add event listener to each .update-record-btn
const updateButton = document.querySelectorAll('.update-record-btn')
console.log(updateButton)
for (const i of updateButton) {
  i.addEventListener('click', openUpdateForm)
}

// Add event listener to each .save-update-btn
const saveButton = document.querySelectorAll('.save-update-btn')
console.log(saveButton)
for (const i of saveButton) {
  i.addEventListener('click', saveUpdate)
}

// Add event listener to each .cancel-update-btn
const cancelButton = document.querySelectorAll('.cancel-update-btn')
console.log(cancelButton)
for (const i of cancelButton) {
  i.addEventListener('click', closeUpdateForm)
}
