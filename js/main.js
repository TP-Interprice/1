const BASE_URL = 'http://192.168.1.105:8080/messenger/webapi';
const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000
});

var modal = document.getElementById("myModal");

var logIn = document.querySelector('#login')
var register = document.querySelector('#register')
var btn = document.querySelector('#btn')
var formBox = document.querySelector(".form-box")
var toggle = document.querySelectorAll(".toggle-btn")

var Name = document.getElementById('firstname')
var surName = document.getElementById('surname')
var birthday = document.getElementById('data')
var userId = document.getElementById('userId')
var userEmail = document.getElementById('userEmail')
var passwords = document.getElementById('password')

var editName = document.getElementById('editFirstname')
var editSurName = document.getElementById('editSurname')
var editBirthday = document.getElementById('editData')
var editUserId = document.getElementById('editUserId')
var editUserEmail = document.getElementById('editUserEmail')
var editPasswords = document.getElementById('editPassword')

function reg() {
    logIn.style.left = '-400px';
    register.style.left = '50px';
    btn.style.left = '110px';
    formBox.style.height = "600px"
    formBox.style.transition = "0.5s"
    toggle[1].style.color = 'white'
    toggle[0].style.color = 'black'
    toggle[1].style.transition = '0.5s'
    toggle[0].style.transition = '0.5s'

}
function log() {
    logIn.style.left = '50px';
    register.style.left = '450px';
    btn.style.left = '0px';
    formBox.style.height = "400px"
    formBox.style.transition = "0.5s"
    toggle[1].style.color = 'black'
    toggle[0].style.color = 'white'
    toggle[1].style.transition = '0.5s'
    toggle[0].style.transition = '0.5s'
}


function email() {
    let mail = userEmail.value.toLowerCase()+"";
    let eror = 'Email ni kiriting';
    if(mail !== ""){
        if (mail.indexOf('@gmail.com') !== -1 || mail.indexOf("@mail.ru") !== -1 ) {
           return true
        }
        else {
            alert(eror);
            return false
        }
    }
}

function check() {
    if (passwords.value.length < 6) {
        alert("Parol 6 belgidan kam bo'lmasligi kerak");
        return false;
    }
    return true;
};

let registered = document.getElementById("registered")
function save(){
    if (check() && email()) {
        var data={};
        data.firstName = Name.value
        data.lastName = surName.value
        data.birthday = birthday.value
        data.email = userEmail.value
        data.login = userId.value
        data.password = passwords.value
        addUser(data);
    }
}
const addUser = async (data)=>{
    try {
        const response = await instance.post('/users', data, {headers:{'Signup':"Y"}})
        // alert(response.data.msg); 
        if(response.data.msg != 0){
            modal.style.display = "block"
            document.querySelector(".modalContent").textContent = "Ro'yhatdan o'tdingiz!!!"
        }
    } 
    catch (error) {
        console.log("POST", error);
    }
}


const getUsers = async () => {
    try {
        const response = await instance.get('/users',{headers:{'Signup':"Y"}})
        const todoItems = response.data;
        let table = document.getElementById("grid");
        let html = "<table><tr>"
        html += "<th>ID</th>"
        html += "<th>FIRSTNAME</th>"
        html += "<th>LASTNAME</th>"
        html += "<th>EMAIL</th>"
        html += "<th>BIRTHDAY</th>";
        html += "<th>LOGIN</th>";
        html += "<th>PASSWORD</th>";
        html += "<th>CREATED_ON</th>";
        html += "<th>STATE</th>";
        html += "<th>&nbsp;</th>";
        html += "</tr>";
        for (var d of todoItems) {
            html += "<tr>";
            html += "<td>" + d.id + "</td>";
            html += "<td>" + d.firstName + "</td>";
            html += "<td>" + d.lastName + "</td>";
            html += "<td>" + d.email + "</td>";
            html += "<td>" + d.birthday + "</td>";
            html += "<td>" + d.login + "</td>";
            html += "<td>" + d.password + "</td>";
            html  += "<td>" + d.createdOn + "</td>";
            html += "<td>" + d.state + "</td>";
            html += "<td><input type='button' value='REMOVE' onclick='removeUser(" + d.id + ")'/>" +
            "<input type='button' value='UPDATE' onclick='editUser(" + d.id + ")'/></td>";
            html += "</tr>";
        }
        html + "</table>";
        table.innerHTML = html;
        // return todoItems;
    } catch (errors) {
        console.error(errors);
    }
};


let myModalEdit = document.getElementById("myModalEdit")
// function editUser(){
//     console.log(dates);
//     myModalEdit.style.display = "block"
//         editName.value = dates.firstName
//         editSurName.value = dates.lastName 
//         editBirthday.value = dates.birthday
//         editUserEmail.value = dates.email
//         editUserId.value = dates.login
//         editPasswords.value = 0
// }
const editUser = async()=>{
    // var data={};
    // data.firstName = editName.value
    // data.lastName = editSurName.value
    // data.birthday = editBirthday.value
    // data.email = editUserEmail.value
    // data.login = editUserId.value
    // data.password = editPasswords.value
    try {
        const response = await instance.put(BASE_URL+'/users', data);
        console.log(response);
    } catch (errors) {
        console.error(errors);
    }
};
const updateUser = async(id)=>{
    try {
        const response = await instance.get(BASE_URL + '/users/' + id);
        console.log(response);
    } catch (errors) {
        console.error(errors);
    }    
}
const removeUser = async(id) => {
    try {
        const response = await instance.delete(BASE_URL + '/users/' + id);
        if(response.data.code == 0){
        getUsers();
        }else{
           alert(response.data.msg); 
        }
    } catch (errors) {
        console.error(errors);
    } finally {
        console.log("Finally");
    }
};

let signID = document.getElementById("signID")
let signPass = document.getElementById("signPass");
let changedPass = document.getElementById("changedPass")
function change() {
    if(signPass.value.length == 0){
        changedPass.textContent = null
    }
    else if(signPass.value.length < 6){
        changedPass.textContent = "Parol 6 ta belgidan kam bo'lmasligi kerak!"
        changedPass.style.fontSize = "13px"
        changedPass.style.color = "red"
        return false
    }
    else if(signPass.value.length >= 6){
        changedPass.textContent = null
        return true
    }
}
function checkSign() {
    
    if(change()){
        if(signID.value === "" && signPass.value === "") {
            alert("Login va parolingizni kiriting");
            return false;
        }
        else if((signID.value === "" && signPass.value !== "") || (signID.value !== "" && signPass.value === "")) {
            alert("Login yoki Parolni kiritmadingiz!")
            return false;
        }
    }else {
        if(signID.value === "" && signPass.value === "") {
            alert("Login va parolingizni kiriting");
            return false;
        }
        else if((signID.value === "" && signPass.value !== "") || (signID.value !== "" && signPass.value === "")) {
            alert("Login yoki Parolni kiritmadingiz!");
            return false;
        }
   }
   return true;
}

function signIn() {
  
        var user={};
        user.login = document.getElementById("signID").value
        user.password = document.getElementById("signPass").value
        Login(user);
    }
const Login=async(user)=>{
    try {
        const data = 'login='+encodeURIComponent(user.login) + '&' + 'password=' + encodeURIComponent(user.password);
        const response = await instance.post('/login',
            data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            );
        if(response.data.code==0){
            localStorage.setItem("token",response.data.token);
            location.href = "./chat.html"
        }else{
            alert(response.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
}

// Get the modal
window.onclick = function(event) {
  if (event.target == myModalEdit) {
    myModalEdit.style.display = "none";
  }
}