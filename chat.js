



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


//   IMPORTING THE REQUIRED FUNCTIONS
  import {getDatabase, ref, set, onChildAdded, onChildRemoved, remove} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
  import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
  import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
  const firedb = getFirestore()
  const db = getDatabase()
  const auth = getAuth()
  
  //   FUNTION TO CHECK IF USER IS LOGGED IN OR OUT
  function stateChanged(){
      onAuthStateChanged(auth, (user) => {
        if(user){
            let userId = user.uid
            logUserDetails(userId)
        }else{
            window.location.href = 'signIn.html'
        }
    })
  }
  stateChanged()
  

  //   FUNCTION TO GET DATA FROM DATABASE AND DISPLAY IT
  var sender;
  async function logUserDetails(userId){
    var ref = doc(firedb, "Registered_Users", userId)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
      sender = docSnap.data().Username
      let chatOwner = document.getElementById('chatOwner')
      let profilePicture = document.getElementById('profileImage')
      chatOwner.textContent = sender

      profilePicture.src = docSnap.data().profilePicture
    }else{
        alert('data does not exist')
    }
}


  var sender;



        let textArea = document.getElementById('textArea')
        let sendBtn = document.getElementById('Send')
        const dateAndTimeOfMessage = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos'});



//   SENDING MESSAGE TO THE FIREBASE DATABASE

    sendBtn.addEventListener('click', () => {
        let messageValue = textArea.value
        if(textArea.value == ''){
            return
        }else{
            let timestamp = new Date().getTime()
            set(ref(db, 'newMessage/' + timestamp), {
                message: messageValue,
                sender: sender,
                timestamp : dateAndTimeOfMessage
            })
        }
        textArea.value = ''
    
    })

    // FUNTION TO RECEIVE NOTIFICATION
    let WebName = "Student's Support"

    function notificationIn(messageOut){
            Notification.requestPermission()
            .then(permission => {
                if(permission == 'granted'){
                    var notificationNow = new Notification(WebName, {
                         body: messageOut,
                         icon: "images/profile image.png",
                         tag: 'same text'
                    })
                    notificationNow.addEventListener('click', () => {
                        window.location.href = 'chat.html'
                    })
                }else{
                    alert('you wont receive notification')
                }
            })
    }
notificationIn()



// RECEIVING REALTIME FEEDBACK FROM THE DATABASE

    let incoming = document.getElementById('incoming');

onChildAdded(ref(db, 'newMessage'), snapshot => {
    let deleteKey = snapshot.key;

    if (snapshot.val().sender == sender) {
        let deleteBtn = document.createElement('span');
        deleteBtn.setAttribute('class', 'deleteBtn');
        deleteBtn.innerHTML = '\u00d7';

        let outgoingText = document.createElement('li');
        let newDiv = document.createElement('div');
        let dateAndTime = document.createElement('p')
        newDiv.setAttribute('class', 'newDiv')
        newDiv.setAttribute('id', deleteKey); 

        outgoingText.setAttribute('id', 'outgoingMessages');
        outgoingText.textContent = 'You : ' + snapshot.val().message;
        dateAndTime.textContent = snapshot.val().timestamp
        outgoingText.appendChild(deleteBtn);
        newDiv.append(outgoingText, dateAndTime);
        incoming.appendChild(newDiv);

        let messageOut = snapshot.val().message
        notificationIn(messageOut)

        deleteBtn.addEventListener('click', () => {
            remove(ref(db, 'newMessage/' + deleteKey));
        });
    } else {
        let incomingText = document.createElement('li');
        incomingText.setAttribute('class', 'incomingMessages');
        incomingText.textContent = snapshot.val().sender + ' : ' + snapshot.val().message;
        let messageOut = snapshot.val().message
        notificationIn(messageOut)
        incoming.appendChild(incomingText);
    }
});

// UPDATING THE DOM AFTER A USER DELETES A MESSAGE
onChildRemoved(ref(db, 'newMessage'), (snapshot) => {
    
    let deleteKey = snapshot.key;
    let deletedDiv = document.getElementById(deleteKey);
    if (deletedDiv) {
        incoming.removeChild(deletedDiv);
    }
});





