
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";


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
  
  import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";;
  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  const db = getFirestore()
  const auth = getAuth()

  onAuthStateChanged(auth, user => {
    if(user){
        displayNews()
    }else{
        alert('Please sign in to enjoy all funtions')
        setTimeout(() => {
            window.location.href = 'account.html'
        }, 1500)
    }
  })


let newIncoming = document.getElementById('newIncoming')

async function displayNews(){
    const collectionRef = collection(db, "NEWS");
    const docSnap = await getDoc(collectionRef)
    if(docSnap.exists()){
      
        let newDiv = document.createElement('div')
        newDiv.setAttribute('class', 'categories')
        newDiv.innerHTML = `
            <h3>${docSnap.data().category}</h3>
            <h3>${docSnap.data().title}</h3>
            <p>${docSnap.data().Content}</p>
            <p class="timeOfEve">${docSnap.data().timeAndDate}</p>
        `
        newIncoming.appendChild(newDiv)
    }else{
        alert('waiting for server network')
    }
}








// displayNews()