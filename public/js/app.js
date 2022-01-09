console.log("client side javescript loaded in")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  e.preventDefault();
  fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
  //console.log(res.json())
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