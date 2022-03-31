let leftMessageBase = [
     {text: "yaxshimisan", time: "21:30"},
     {text: "qaleysan", time: "21:30"},
     {text: "nma gap", time: "21:10"}
 ]
 let rightMessageBase = [
     {text: "yaxshimisan", time: "21:30"}
 ]

 let leftMessage = document.querySelector(".left-message")
 let rightMessage = document.querySelector(".right-message")

 function leftRender(array) {
     leftMessage.innerHTML = null 
     for(let element of array){
         
         let addLeft = document.createElement("div")
         let newTextL = document.createElement("p")
         let newTimeL = document.createElement("p")
       
         newTextL.textContent = element.text
         newTimeL.textContent = element.time

         addLeft.appendChild(newTextL)
         addLeft.appendChild(newTimeL)
         leftMessage.appendChild(addLeft)
         
     }
    }

leftRender(leftMessageBase)
    rightMessage.innerHTML = null
 function rightRender(array) {
     for(let element of array){ 
         let addRight = document.createElement("div")
         let newTextR = document.createElement("p")
         let newTimeR = document.createElement("p")
         newTextR.textContent = element.text
         newTimeR.textContent = element.time

         addRight.appendChild(newTextR)
         addRight.appendChild(newTimeR)
         rightMessage.appendChild(addRight)
         
     }
 }

 rightRender(rightMessageBase)

 let footer = document.querySelector(".footer")
 let Input = footer.children[0]
 let addBtn = footer.children[1]

 addBtn.addEventListener("click", () =>{
     if(Input.value !== ""){
         let addInput = Input.value
         let addTime = `${new Date().getHours()}:${new Date().getMinutes()}`
         let addbase = {
             text: addInput, 
             time: addTime
         }
         rightMessageBase.push(addbase)
         rightRender(rightMessageBase)
     }
     Input.value = null
     messageText.focus()
 })
var messageText = document.getElementById("messageText")
 window.onload = () => {
     messageText.focus();
 }

const rendererUsers = async () => {
    try {
        const response = await instance.get('/users')
        const todoItems = response.data;
        let div = document.querySelector(".main");
        let html = ""
        for (var d of todoItems) {
            html += '<li>'
            html += '<img src="./images/dekan.jpg" alt="">'
            html += '<span>'
            html += '<p class="name-text">'+ d.firstName +'</p>'
            html += '<p class="comment-text">Salom bo`la</p>'
            html += '</span>'
            html += '</li>'
        }
        div.innerHTML = html;
        console.log(html)
    } catch (errors) {
        console.error(errors);
    }
}

window.onload = rendererUsers

let logOut = document.getElementById('logOut')
logOut.onclick = () => {
    
}