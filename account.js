
// REFERENCE TO THE EYE BUTTONS
let crossedEye = document.getElementById('crossedEye') 
let openedEye = document.getElementById('openedEye') 


// REFERENCE TO THE INPUT ELEMENTS
let firstName = document.getElementById('firstName') 
let lastName = document.getElementById('lastName') 
let username = document.getElementById('username') 
let email = document.getElementById('email') 
let dateOfBirth = document.getElementById('dateOfBirth') 
let gender = document.getElementById('gender') 
let password = document.getElementById('password') 
let conPassword = document.getElementById('conPassword') 
let signUpBtn = document.getElementById('signUpBtn') 


// CODE TO REVEAL OR HIDE PASSWORD

function revealPassword(){
    if(password.type == 'password' || conPassword.type == 'password'){
        password.type = 'text'
        conPassword.type = 'text'
        openedEye.style.display = 'none'
        crossedEye.style.display = 'block'
    }else{
        password.type = 'password'

    }
}
function hidePassword(){
    if(password.type == 'text' || conPassword.type == 'text'){
        password.type = 'password'
        conPassword.type = 'password'
        openedEye.style.display = 'block'
        crossedEye.style.display = 'none'
    }else{
        password.type = 'password'
    }
}

crossedEye.addEventListener('click', hidePassword)
openedEye.addEventListener('click', revealPassword)


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBmY2XtNwXZrHeE5za2cp7sOFYOKjSvdCQ",
    authDomain: "school-newusersign.firebaseapp.com",
    projectId: "school-newusersign",
    storageBucket: "school-newusersign.appspot.com",
    messagingSenderId: "382800829354",
    appId: "1:382800829354:web:145aeb3f8e346c016129d3"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  const auth = getAuth()

//   FUNCTION TO VALIDATE USER INPUT
  function validationUser(){
    let nameregex = /^[a-zA-Z\s]+$/
    let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/
    let uerregex = /^[a-zA-Z0-9]{5,}$/

    if(!nameregex.test(firstName.value)){
        alert('Firstname should contain only Alphabets')
        return false
    }
    if(!nameregex.test(lastName.value)){
        alert('Lastname should contain only Alphabets')
        return false
    }
    if(!emailregex.test(email.value)){
        alert('Please Enter correct Email address')
        return false
    }
    if(!uerregex.test(username.value)){
        alert('Username should be at least 5 characters')
        return false
    }
    if(firstName.value == '' || conPassword.value == '' || password.value == '' || dateOfBirth.value == '' || lastName.value == '' || username.value == '' || email.value == ''){
        alert('Please fill every details')
        return false
    }
    if(password.value !== conPassword.value){
        alert('password do not match')
        return false
    }
    return true
  }



  function createUser(){
    if(!validationUser()){
        return
    }
    let firstNameInput = firstName.value
    console.log(firstNameInput)

    let lastNameInput = lastName.value
    console.log(lastNameInput)

    let usernameInput = username.value
    console.log(usernameInput)

    let emailInput = email.value
    console.log(emailInput)

    let dateOfBirthInput = dateOfBirth.value
    console.log(dateOfBirthInput)

    let genderInput = gender.value
    console.log(genderInput)

    let passwordInput = password.value
    console.log(passwordInput)

    let conPasswordInput = conPassword.value
    console.log(conPasswordInput)

  }
  signUpBtn.addEventListener('click', createUser)