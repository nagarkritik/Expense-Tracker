
var addExpenseBtn = document.querySelector(".submit-btn")
var itemList = document.querySelector("#items") 
var filter = document.querySelector("#filter")


addExpenseBtn.addEventListener("click", addItem)
itemList.addEventListener("click", removeElement)
filter.addEventListener("keyup", filterItems)

let amount= document.querySelector("#amount")
let description = document.querySelector("#description")
let category = document.querySelector('#category')



window.addEventListener('DOMContentLoaded', (e)=>{
    const token = localStorage.getItem('token')
    axios.get('http://localhost:3000/home/getExpenses', { headers: {"Authorization" : token} })
    .then(res=>{
        console.log(res)

        let expenses = res.data.expenses

        for(let i=0; i<expenses.length; i++){
            let expAmount = expenses[i].amount
            let expCategory = expenses[i].category
            let expDescription = expenses[i].description
            let expDate = expenses[i].createdAt.slice(0,10)

            displayExpense(expAmount, expCategory, expDescription, expDate)

        }
    })
})

function addItem(e){
    e.preventDefault()
    let expense = {amount: amount.value, description: description.value, category: category.value}
    const token = localStorage.getItem('token')
    axios.post('http://localhost:3000/home/addExpense',{expense},{ headers: {"Authorization" : token} })
    .then(res=>{
        let addedExpense = res.data.result
        let date = addedExpense.createdAt.slice(0,10)

        displayExpense(addedExpense.amount, addedExpense.category, addedExpense.description, date)

        
    })
    .catch(err=>{
        console.log(err)
    })


}

function removeElement(e){
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure?")){
            var li = e.target.parentElement
            itemList.removeChild(li)
        }
    }
}

var n = itemList.children.length

for(i=0; i<n; i++){
    var editBtn = document.createElement("button")

    editBtn.appendChild(document.createTextNode("Edit"))
    editBtn.className = "btn btn-sm float-right edit"

    itemList.children[i].appendChild(editBtn)
}

function filterItems(e){
    
    var text = e.target.value.toLowerCase()
    //console.log(text)

    // Get List
    var items = itemList.querySelectorAll("li")
    //console.log(item)

    Array.from(items).forEach(item => {
        var itemName = item.firstChild.textContent
        
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = "block"
        }else{
            item.style.display = "none"
        }

    });
}

function displayExpense(expAmount, expCategory, expDescription, expDate){
    let newExpense = `
            ${expAmount} : ${expCategory} : ${expDescription} : ${expDate}

        `
        // Creating new list element
        var li = document.createElement("li")
        li.className = "list-group-item"
        
        // Adding text node with input value
        li.appendChild(document.createTextNode(newExpense))

        // Creating del button element
        var delBtn = document.createElement("button")
        delBtn.className = "btn btn-danger btn-sm float-right delete"

        delBtn.appendChild(document.createTextNode("X"))

        li.appendChild(delBtn)

        itemList.appendChild(li)
}