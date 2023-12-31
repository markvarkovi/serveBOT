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
    let msgCounter = 0;
    const inputElement = document.querySelector('input')
    const submitBtnElement = document.querySelector('#submit-btn')

    submitBtnElement.addEventListener('click', () => {
        const messageBoxElement = document.querySelector('.msg-box')
        messageBoxElement.style.display = "none"
        const messageFieldElement = document.querySelector('#msg-field')
        inputElement.value.length > 0 ? messageFieldElement.insertAdjacentHTML('beforeend', `<div class="user-msg"><p id="um">${inputElement.value}</p></div>`) : undefined
        
        inputElement.value = '';
        
    })
    inputElement.addEventListener("keypress", (e) => {
        e.key === "Enter" ? submitBtnElement.click() : undefined
    })
}

function addBotMessage (content) {
    const messageFieldElement = document.querySelector('#msg-field')
    return setTimeout(() => { messageFieldElement.insertAdjacentHTML('beforeend', `<div class="bot-msg"><p id="bm">${content}</p></div>`)}, 1200 )
}

async function greetUser () {
    const answers = await fetchAnswers(answersURL)
    const greetings = answers.greetings
    const randomGreeting = Math.round(Math.random() * greetings.length)
    return addBotMessage(greetings[randomGreeting])
}

function handleUserOrder () {

}

async function generateAnswers () {
    let userMsgCounter = 0;
    const submitBtnElement = document.querySelector('#submit-btn')
    submitBtnElement.addEventListener('click', () => {
        const allUserMessages = document.querySelectorAll('#um')
        const lastUserMessage = allUserMessages[allUserMessages.length -1].textContent

        userMsgCounter++
    userMsgCounter < 2 && !lastUserMessage.toLowerCase().includes("order")  ? greetUser() : undefined;
    
    if (userMsgCounter > 1)  { 
    const allBotMessages = document.querySelectorAll('#bm')
    const lastBotMessage = allBotMessages[allBotMessages.length -1].textContent

    if (lastUserMessage.toLowerCase().includes("order")) { 
        addBotMessage('Please provide your order number')
    }
    if (/^[0-9]+$/.test(lastUserMessage)) {
        addBotMessage('Thank you, it looks like your order is on its way! Is there anything else I can help you with?')
    } else if (!/^[0-9]+$/.test(lastUserMessage) && lastBotMessage.includes("provide")) {
        addBotMessage("Please provide a correct order number")
    }
}
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