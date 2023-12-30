const answersURL = 'http://localhost:8080/answers'

const homeBtnElement = document.querySelector('.home-btn')

const submitBtnContainerElement = document.querySelector('#submit-btn-container')

async function fetchAnswers (answers) {
    try {
    const response = await fetch(answers)
    const data = await response.json()
    return data
    } catch (e) {
        console.error('Error reading answers.json', e.message)
    }
}
function redirect (button, endpoint) {

button.addEventListener('click', () => {
    location.href = `http://localhost:8080${endpoint}`
})
}

function addButton (element, id, textContent) {
    return element.insertAdjacentHTML('beforeend', `<button id=${id}>${textContent}</button>` )
}

function handleUserInput () {
    const inputElement = document.querySelector('input')
    const submitBtnElement = document.querySelector('#submit-btn')

    submitBtnElement.addEventListener('click', () => {
        const messageBoxElement = document.querySelector('.msg-box')
        messageBoxElement.style.display = "none"
        const messageFieldElement = document.querySelector('#msg-field')
        inputElement.value.length > 0 ? messageFieldElement.insertAdjacentHTML('beforeend', `<div class="user-msg"><p>${inputElement.value}</p></div>`) : undefined
        
        inputElement.value = '';
        
    })
    inputElement.addEventListener("keypress", (e) => {
        e.key === "Enter" ? submitBtnElement.click() : undefined
    })
}


async function generateAnswers () {
    const answers = await fetchAnswers(answersURL)
    console.log(answers);
    const inputElement = document.querySelector('input')
    const messageFieldElement = document.querySelector('#msg-field')
    const submitBtnElement = document.querySelector('#submit-btn')
    submitBtnElement.addEventListener('click', () => {
        const greetings = answers.greetings
        const randomNumber = Math.round(Math.random() * greetings.length)
    setTimeout(() => {
        messageFieldElement.insertAdjacentHTML('beforeend', `<div class="bot-msg"><p>${greetings[randomNumber]}</p></div>`)
    }, 1200 )
    })
}



async function loadEvent () {
    await fetchAnswers(answersURL)
    redirect(homeBtnElement, '/')
    addButton(submitBtnContainerElement, 'submit-btn', '▶' )
    handleUserInput()
    await generateAnswers()
}

window.addEventListener('load', loadEvent)