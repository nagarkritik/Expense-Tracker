const email = document.querySelector('#email')

const resetBtn = document.querySelector('#resetBtn')

resetBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    if(email.value === ''){
        email.placeholder = "Please enter your email"
        email.classList.add("empty")
    }

})