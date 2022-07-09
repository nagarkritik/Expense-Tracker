const email = document.querySelector('#email')

const resetBtn = document.querySelector('#resetBtn')

resetBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    if(email.value === ''){
        email.placeholder = "Please enter your email"
        email.classList.add("empty")
    }else{
        axios.post('http://localhost:3000/login/forgotpassword', {email:email.value})
        .then(res=>{
            console.log(res)
        })
        .catch(err=>{
            showPopupMessage()
        })
    }

})



function showPopupMessage(){
    const popContainer = document.querySelector('.popup-container')
    const popMessage = document.querySelector('.popup-message')

    popMessage.innerHTML = `
    <p>User does not exist</p>
        `
    popContainer.classList.add('active')

    setTimeout(()=>{
        popContainer.classList.remove('active')
    }, 3000)
}