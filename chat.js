



  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD_BrdVjXD1kBoFXxKpbtM97TpcNCyd-1A",
    authDomain: "chatapp-31d9a.firebaseapp.com",
    databaseURL: "https://chatapp-31d9a-default-rtdb.firebaseio.com",
    projectId: "chatapp-31d9a",
    storageBucket: "chatapp-31d9a.appspot.com",
    messagingSenderId: "33659136759",
    appId: "1:33659136759:web:086f498d5a9933576f81f2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


//   IMPORTING THE REQUIRED FUNCTIONS
  import {getDatabase, ref, set, onChildAdded, onChildRemoved, remove} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

  const db = getDatabase()
        

  var sender;

  if (localStorage.getItem("sender")) {
      sender = localStorage.getItem("sender");
  } else if (sessionStorage.getItem("sender")) {
      // If the name is found in sessionStorage, move it to localStorage
      sender = sessionStorage.getItem("sender");
      localStorage.setItem("sender", sender);
  } else {
      // If the name is not found in either localStorage or sessionStorage, prompt for it
      sender = prompt("Please Enter Your Preferred Name");
      localStorage.setItem("sender", sender);
  }

        let textArea = document.getElementById('textArea')
        let sendBtn = document.getElementById('Send')



//   SENDING MESSAGE TO THE FIREBASE DATABASE

    sendBtn.addEventListener('click', () => {
        let messageValue = textArea.value
        if(textArea.value == ''){
            return
        }else{
            let timestamp = new Date().getTime()
            set(ref(db, 'newMessage/' + timestamp), {
                message: messageValue,
                sender: sender
            })
        }
        textArea.value = ''
        console.log(messageValue)
    
    })

    // FUNTION TO RECEIVE NOTIFICATION
    let WebName = "Student's Support"

    function notificationIn(){
            Notification.requestPermission()
            .then(permission => {
                if(permission == 'granted'){
                    var notificationNow = new Notification(WebName, {
                         body: Math.round(Math.random() * 25),
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
        newDiv.setAttribute('class', 'newDiv')
        newDiv.setAttribute('id', deleteKey); 

        outgoingText.setAttribute('id', 'outgoingMessages');
        outgoingText.textContent = 'You : ' + snapshot.val().message;
        outgoingText.appendChild(deleteBtn);
        newDiv.appendChild(outgoingText);
        incoming.appendChild(newDiv);

        deleteBtn.addEventListener('click', () => {
            remove(ref(db, 'newMessage/' + deleteKey));
        });
    } else {
        let incomingText = document.createElement('li');
        incomingText.setAttribute('class', 'incomingMessages');
        incomingText.textContent = snapshot.val().sender + ' : ' + snapshot.val().message;
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





