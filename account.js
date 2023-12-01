
// REFERENCE TO THE EYE BUTTONS
let crossedEye = document.getElementById('crossedEye') 
let openedEye = document.getElementById('openedEye') 


// REFERENCE TO THE INPUT ELEMENTS
let firstName = document.getElementById('firstName') 
let lastName = document.getElementById('lastName') 
let username = document.getElementById('username') 
let emailIn = document.getElementById('email') 
let dateOfBirth = document.getElementById('dateOfBirth') 
let gender = document.getElementById('gender') 
let passwordIn = document.getElementById('password') 
let conPassword = document.getElementById('conPassword') 
let signUpBtn = document.getElementById('signUpBtn') 


// CODE TO REVEAL OR HIDE PASSWORD

function revealPassword(){
    if(passwordIn.type == 'password' || conPassword.type == 'password'){
        passwordIn.type = 'text'
        conPassword.type = 'text'
        openedEye.style.display = 'none'
        crossedEye.style.display = 'block'
    }else{
        passwordIn.type = 'password'

    }
}
function hidePassword(){
    if(passwordIn.type == 'text' || conPassword.type == 'text'){
        passwordIn.type = 'password'
        conPassword.type = 'password'
        openedEye.style.display = 'block'
        crossedEye.style.display = 'none'
    }else{
        passwordIn.type = 'password'
    }
}

crossedEye.addEventListener('click', hidePassword)
openedEye.addEventListener('click', revealPassword)


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";


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

    // IMPORTING THE NEEDED FIREBASE FUNCTION
  import {getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
  
  const auth = getAuth()
  const db = getDatabase()

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
    if(!emailregex.test(emailIn.value)){
        alert('Please Enter correct Email address')
        return false
    }
    if(!uerregex.test(username.value)){
        alert('Username should be at least 5 characters')
        return false
    }
    if(firstName.value == '' || conPassword.value == '' || passwordIn.value == '' || dateOfBirth.value == '' || lastName.value == '' || username.value == '' || emailIn.value == ''){
        alert('Please fill every details')
        return false
    }
    if(passwordIn.value !== conPassword.value){
        alert('password do not match')
        return false
    }
    return true
  }


    //   FUNCION TO REGISTER USER/CREATE USER
    function createUser(){
        if(!validationUser()){
            return
        }
        let firstNameInput = firstName.value
        let lastNameInput = lastName.value
        let usernameInput = username.value
        let email = emailIn.value
        let dateOfBirthInput = dateOfBirth.value
        let genderInput = gender.value
        let password = passwordIn.value

        createUserWithEmailAndPassword(auth, email, password)
        .then(credentials => {
            alert('User Created. Waiting for Redirect')
            let userId = credentials.user.uid

            // SAVING THE USER CREDENTIALS TO FIREBASE
            set(ref(db, 'newUser/' + userId), {
                FirstName : firstNameInput,
                LastName : lastNameInput,
                Username : usernameInput,
                Email : email,
                Date_Of_Birth : dateOfBirthInput,
                Gender : genderInput,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                alert(error)
                console.error(error);
            })

            // REDIRECTING THE NEW USER TO THE PROFILE
            setTimeout(() => {
                window.location.href =  'newprofile.html'
            }, 3000);

            console.log(userId)
            // console.log(credentials);
        })
        .catch(error => {
            alert(error)
            console.error('The error is ' + error.message);
        })
    }

    // ADDING THE EVENT TO THE BUTTON
    signUpBtn.addEventListener('click', createUser)