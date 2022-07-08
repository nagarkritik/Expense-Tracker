const token = localStorage.getItem('token')

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

window.addEventListener('DOMContentLoaded', (e)=>{
    axios.get('http://localhost:3000/home', { headers: {"Authorization" : token} })
    .then(user=>{

        console.log(user.data.premium)

        let isPremium = user.data.premium

        if(isPremium){
            let premiumDiv = document.querySelector(".premium-feature")

            premiumDiv.innerHTML = `
            <li><a href="../LeaderboardPage/leaderboard.html" id="leaderboard">Leaderboard</a></li>
            <li><button id="darkmode">Dark Mode</button></li>
            `
        }
    })
})

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});