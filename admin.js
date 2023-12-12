
let signOutBtn = document.getElementById('signOut')

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
    var ref = doc(db, "Admin", userId)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
      let adminName = document.getElementById('adminName')
      let FirstName = docSnap.data().Firstname
      let Lastname = docSnap.data().Lastname

      adminName.textContent = FirstName + " " + Lastname

        console.log(docSnap.data())
    }else{
        alert('data does not exist')
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
            window.location.href = 'signIn.html'
        }
    })
  }
  stateChanged()

//   GETTING THE BUTTONS AND INPUT
// ALL INPUTS

// FOR SUG PPRESIDENT
let sugDeparment = document.getElementById('sugDeparment')
let sugfirstname = document.getElementById('sugfirstname')
let sugLastname = document.getElementById('sugLastname')
let sugNickname = document.getElementById('sugNickname')
let sugPhone = document.getElementById('sugPhone')
let sugWhatsapp = document.getElementById('sugWhatsapp')
let sugFacebook = document.getElementById('sugFacebook')
let sugwrite = document.getElementById('sugwrite')
let sugUpdate = document.getElementById('sugUpdate')
let sugRead = document.getElementById('sugRead')
let sugDelete = document.getElementById('sugDelete')

// WRITE FOR SUG

// UPDATE FOR SUG

// READ FOR SUG

// UPDATE FOR SUG

// FOR SUG SECRETARY
let genDeparment = document.getElementById('genDeparment')
let genfirstname = document.getElementById('genfirstname')
let genLastname = document.getElementById('genLastname')
let genNickname = document.getElementById('genNickname')
let genPhone = document.getElementById('genPhone')
let genWhatsapp = document.getElementById('genWhatsapp')
let genFacebook = document.getElementById('genFacebook')
let genwrite = document.getElementById('genwrite')
let genUpdate = document.getElementById('genUpdate')
let genRead = document.getElementById('genRead')
let genDelete = document.getElementById('genDelete')

// FOR SUG PUBLIC RELATION OFFICER
let proDeparment = document.getElementById('proDeparment')
let profirstname = document.getElementById('profirstname')
let proLastname = document.getElementById('proLastname')
let proNickname = document.getElementById('proNickname')
let proPhone = document.getElementById('proPhone')
let proWhatsapp = document.getElementById('proWhatsapp')
let proFacebook = document.getElementById('proFacebook')
let prowrite = document.getElementById('prowrite')
let proUpdate = document.getElementById('proUpdate')
let proRead = document.getElementById('proRead')
let proDelete = document.getElementById('proDelete')

// FOR SCHOOL PRESIDENT
let schoolDeparment = document.getElementById('schoolDeparment')
let schoolfirstname = document.getElementById('schoolfirstname')
let schoolLastname = document.getElementById('schoolLastname')
let schoolNickname = document.getElementById('schoolNickname')
let schoolPhone = document.getElementById('schoolPhone')
let schoolWhatsapp = document.getElementById('schoolWhatsapp')
let schoolFacebook = document.getElementById('schoolFacebook')
let schoolwrite = document.getElementById('schoolwrite')
let schoolUpdate = document.getElementById('schoolUpdate')
let schoolRead = document.getElementById('schoolRead')
let schoolDelete = document.getElementById('schoolDelete')

// FOR DEPARTMENTAL PRESIDENT
let departmentDeparment = document.getElementById('departmentDeparment')
let departmentfirstname = document.getElementById('departmentfirstname')
let departmentLastname = document.getElementById('departmentLastname')
let departmentNickname = document.getElementById('departmentNickname')
let departmentPhone = document.getElementById('departmentPhone')
let departmentWhatsapp = document.getElementById('departmentWhatsapp')
let departmentFacebook = document.getElementById('departmentFacebook')
let departmentwrite = document.getElementById('departmentwrite')
let departmentUpdate = document.getElementById('departmentUpdate')
let departmentRead = document.getElementById('departmentRead')
let departmentDelete = document.getElementById('departmentDelete')

// FOR DEPARTMENTAL GOVERNOR
let govDeparment = document.getElementById('govDeparment')
let govfirstname = document.getElementById('govfirstname')
let govLastname = document.getElementById('govLastname')
let govNickname = document.getElementById('govNickname')
let govPhone = document.getElementById('govPhone')
let govWhatsapp = document.getElementById('govWhatsapp')
let govFacebook = document.getElementById('govFacebook')
let govwrite = document.getElementById('govwrite')
let govUpdate = document.getElementById('govUpdate')
let govRead = document.getElementById('govRead')
let govDelete = document.getElementById('govDelete')











