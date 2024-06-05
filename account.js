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

let lastNameIn = document.getElementById('lastName') 
let firstNameIn = document.getElementById('firstName') 
let usernameIn = document.getElementById('username') 
let PhoneNumberIn = document.getElementById('phoneNumber') 
let emailIn = document.getElementById('email') 
let dateOfBirth = document.getElementById('dateOfBirth') 
let genderIn = document.getElementById('gender') 
let passwordIn = document.getElementById('password') 
let conPassword = document.getElementById('conPassword') 
let signUpBtn = document.getElementById('signUpBtn') 
let photoImage = document.getElementById('image') 

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

    // IMPORTING THE NEEDED FIREBASE FUNCTION
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
  import {getStorage, listAll, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
  import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";;
  const db = getFirestore()
  const auth = getAuth()
  const storage = getStorage()

//   FUNCTION TO VALIDATE USER INPUT
  function validationUser(){
    let nameregex = /^[a-zA-Z\s]+$/
    let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/
    let uerregex = /^[a-zA-Z0-9]{5,}$/
    let imageRex = /\.(jpg|jpeg|png)$/i

    const photoImageIn = photoImage.files[0]

    if(!nameregex.test(firstNameIn.value)){
        alert('Firstname should contain only Alphabets')
        return false
    }
    if(!nameregex.test(lastNameIn.value)){
        alert('Lastname should contain only Alphabets')
        return false
    }
    if(!emailregex.test(emailIn.value)){
        alert('Please Enter correct Email address')
        return false
    }
    if(!uerregex.test(usernameIn.value)){
        alert('Username should be at least 5 characters')
        return false
    }
    if(!imageRex.test(photoImageIn.name)){
        alert('Only Image Files are Allowed')
        return false
    }
    if(firstNameIn.value == '' || conPassword.value == '' || passwordIn.value == '' || dateOfBirth.value == '' || lastNameIn.value == '' || usernameIn.value == '' || emailIn.value == ''){
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

    async function signUpUser() {
        if(!validationUser()){
            return
        }


        let dateOfBirthInput = dateOfBirth.value
        let email = emailIn.value
        let gender = genderIn.value
        let username =  usernameIn.value
        let Firstname = firstNameIn.value;
        let Lastname = lastNameIn.value;
        let PhoneNumber = PhoneNumberIn.value;
        let password = passwordIn.value
    
        const collectionRef = collection(db, "Registered_Users");
        const querySnapshot = await getDocs(query(collectionRef, where("PhoneNumber", "==", PhoneNumber)));
    
        if (!querySnapshot.empty) {
            // User with the same phone number already exists
            console.log(querySnapshot)
            alert("User with the same phone number already exists. Please use a different phone number.");
        } else {
            // Creating the new user
            createUserWithEmailAndPassword(auth, email, password)
                .then((credentials) => {
                    alert('User Created. Waiting for Redirect');
                    let userId = credentials.user.uid;
                    let file = photoImage.files[0]
                    let displayImageName = file.name

                    if(displayImageName == ''){
                        alert('Please choose a profile picture')
                    }

                    const storagePath = ref(storage, 'PROFILE PICTURE', + displayImageName)
                    const uploadTask = uploadBytesResumable(storagePath, file)

                    uploadTask.on('state_changed', snapshot => {
                        var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                        console.log(progress);
                    }, error => {
                        console.error(error)
                    }, async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                        const ref = doc(db, "Registered_Users", userId);

                        await setDoc(ref, {
                            Firstname: Firstname,
                            Lastname: Lastname,
                            Username: username,
                            PhoneNumber: PhoneNumber,
                            Gender: gender,
                            Email: email,
                            DateOfBirth : dateOfBirthInput,
                            profilePicture : downloadURL
                    })
                    }
                )    
                    // Redirecting the new user to the profile
                    setTimeout(() => {
                        window.location.href =  'newprofile.html'
                    }, 3000);
    
                })
                .catch((error) => {
                    alert(error.message);
                });
        }
    }


    // REFERENCE TO THE EYE BUTTONS
let crossedEye = document.getElementById('crossedEye') 
let openedEye = document.getElementById('openedEye') 

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

    // ADDING THE EVENT TO THE SIGN UP BUTTON
    signUpBtn.addEventListener('click', signUpUser)