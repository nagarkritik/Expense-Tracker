
var submitBtn = document.querySelector(".submit-btn")
var itemList = document.querySelector("#items") 
var filter = document.querySelector("#filter")


submitBtn.addEventListener("click", addItem)
itemList.addEventListener("click", removeElement)
filter.addEventListener("keyup", filterItems)


function addItem(e){
    e.preventDefault()

    // Getting input value

    let amount= document.querySelector("#amount").value
    let description = document.querySelector("#description").value

    let newExpense = amount+": "+ description
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