console.log('Client side JS file loaded')

const weatherForm = document.querySelector('form')
const searchterm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchterm.value;
    messageOne.textContent = 'Loading.....';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `Error: ${data.error}`;
            }
            else {
                messageOne.textContent = `Location: ${data.location}`;
                messageTwo.textContent = `Forecast: ${data.forecast}`;
            }
        })
    })
})