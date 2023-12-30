const chatBtnElement = document.querySelector('.chat-btn')

function redirect (button, endpoint) {

button.addEventListener('click', () => {
    location.href = `http://localhost:8080${endpoint}`
})
}


function loadEvent () {
    redirect(chatBtnElement, '/chat')
}

window.addEventListener('load', loadEvent)