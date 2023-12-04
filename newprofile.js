

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

  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import {child, ref, get, getDatabase} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

  let auth = getAuth()
  let signOutBtn = document.getElementById('signOut')

  function signOutUser(){
    signOut(auth)
    .then(response => {
        alert("You've signed out")
        window.location.href = 'account.html'
        console.log(response)
    })
    .catch(error => {
        console.error(error);
    })
  }

  const db = getDatabase()
  const dbRef = ref(db)

//   FUNCTION TO GET DATA FROM DATABASE AND DISPLAY IT
  function logUserDetails(userId){
    get(child(dbRef, 'newUser/' + userId))
    .then(snapshot => {
        if(snapshot.exists()){
            let usernamed = document.getElementById('usernamed')
            let Firstname = snapshot.val().FirstName
            let Lastname = snapshot.val().LastName

            usernamed.textContent = Firstname + " " + Lastname
            console.log(snapshot.val())
        }else{
            alert('Please update your profile')
        }
    })
  }








//   FUNTION TO CHECK IF USER IS LOGGED IN OR OUT
  function stateChanged(){
    onAuthStateChanged(auth, (user) => {
        if(user){
            let userId = user.uid
            logUserDetails(userId)
            console.log(userId)
        }else{
            window.location.href = 'signIn.html'
        }
    })
  }
  stateChanged()

  signOutBtn.addEventListener('click', signOutUser)


