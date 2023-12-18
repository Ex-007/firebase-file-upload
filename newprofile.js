let signOutBtn = document.getElementById('signOut')
let openMenu = document.getElementById('openMenu')
let closeMenu = document.getElementById('closeMenu')
let headerTwoNav = document.getElementById('headerTwoNav')

openMenu.addEventListener('click', () => {
  if(headerTwoNav.style.display == 'none'){
      headerTwoNav.style.display = 'block'
  }else{
    headerTwoNav.style.display = 'none'
  }
  // console.log("Open menu is clicked");
})

closeMenu.addEventListener('click', () => {
  if(headerTwoNav.style.display == 'block'){
    headerTwoNav.style.display = 'none'
}else{
  headerTwoNav.style.display = 'block'
}
})


  // Import the functions you need from the SDKs you need
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
  import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  const db = getFirestore()
  let auth = getAuth()


  // FUNTION TO SIGNOUT USER

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

  

//   FUNCTION TO GET DATA FROM DATABASE AND DISPLAY IT

  async function logUserDetails(userId){
    var ref = doc(db, "Registered_Users", userId)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
      let usernamed = document.getElementById('usernamed')
      let FirstName = docSnap.data().Firstname
      let Lastname = docSnap.data().Lastname

      usernamed.textContent = FirstName + " " + Lastname

        console.log(docSnap.data())
    }else{
        alert('data does not exist')
        window.location.href = 'account.html'
    }
}





//   FUNTION TO CHECK IF USER IS LOGGED IN OR OUT
  function stateChanged(){
    onAuthStateChanged(auth, (user) => {
        if(user){
            let userId = user.uid
            logUserDetails(userId)
            console.log(userId)
        }else{
            window.location.href = 'account.html'
        }
    })
  }
  stateChanged()

  signOutBtn.addEventListener('click', signOutUser)


