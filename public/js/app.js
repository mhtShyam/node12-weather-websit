const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  ///http://localhost:3000/weather?address

  e.preventDefault();
  fetch(`/weather?address=${search.value}`).then((res) => {
  res.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error;
    } else {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    }
  })
})
})