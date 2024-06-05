
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
    
        const firebaseConfig = {
        apiKey: "AIzaSyBmY2XtNwXZrHeE5za2cp7sOFYOKjSvdCQ",
        authDomain: "school-newusersign.firebaseapp.com",
        projectId: "school-newusersign",
        storageBucket: "school-newusersign.appspot.com",
        messagingSenderId: "382800829354",
        appId: "1:382800829354:web:145aeb3f8e346c016129d3"
        };
    
const app = initializeApp(firebaseConfig);
import{getFirestore, onSnapshot, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";;
import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
    let db = getFirestore()
    let auth = getAuth()

    let currentUser = null;
    let unsubscribe = null;

// THE RESIZING OF THE TEXTAREA

let textAreaText = document.getElementById('textAreaText')
textAreaText.addEventListener('input', () => {
    textAreaText.style.height = 'auto'
    textAreaText.style.height = textAreaText.scrollHeight + 'px'
})


// THE LISTING ENVIROMENT
let logBtn = document.getElementById('logBtn')
let incomingOne = document.getElementById('incomingOne')
let noteTitleIn = document.getElementById('noteTitle')

onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = user.uid;
      startListeningForNotes();
    //   console.log(currentUser);
    } else {
    //   console.log("You're not logged in");
      stopListeningForNotes()
      window.location.href = 'index.html'
    }
  });

  const dateAndTimeOfBlog = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos'});
  
  async function saveNoteToFirestore() {
    try {
      const titleIn = noteTitleIn.value.trim(); // Trim leading/trailing spaces
      const contentIn = textAreaText.value.trim();
  
      if (!titleIn || !contentIn) {
        alert("Please enter both a title and content for your note!");
        return;
      }
  
      // Reference to the subcollection "NOTES" under the current user
      const notesRef = collection(db, "USERS", currentUser, "NOTES");
  
      // Add a new document with auto-generated ID
      await addDoc(notesRef, {
        title: titleIn,
        content: contentIn,
        timeStamp : dateAndTimeOfBlog
      });
  
      noteTitleIn.value = "";
      textAreaText.value = "";
  
    //   console.log("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  logBtn.addEventListener('click', saveNoteToFirestore)










//   FUNCTION TO RETRIEVE AND DISPLAT NOTES WITH REAL-TIME UPDATE
function startListeningForNotes() {
    if (!currentUser) {
      console.error("User not logged in, cannot listen for notes.");
      return;
    }
  
    const notesRef = collection(db, "USERS", currentUser, "NOTES");
    unsubscribe = onSnapshot(notesRef, (querySnapshot) => {
        incomingOne.innerHTML = ""; // Clear existing content (optional)
  
      querySnapshot.forEach((docume) => {
        const noteData = docume.data();
        const noteElement = document.createElement('div');
        noteElement.classList.add('incomingTwo');
  
        // Display title and content (modify based on your UI needs)
        noteElement.innerHTML = `

        <div class="innerOne">
            <h3>${noteData.title}</h3>
            <p>${noteData.content}</p>
        </div>
        <div class="innerTwo">
            <p>${noteData.timeStamp}</p>
            <span data-doc-id="${docume.id}" class="delete">delete</span>
        </div>

        `;
        //   <h2>${noteData.title}</h2>
        //   <p>${noteData.content}</p>
        //   <div class="note-buttons">
        //     <button data-doc-id="${docume.id}" class="delete">Delete</button>
        //   </div>
  
        incomingOne.appendChild(noteElement);
  
        // Add event listener for delete button
        noteElement.querySelector('.delete').addEventListener('click', async (event) => {
          const docId = event.target.dataset.docId;
          console.log("Delete note:", docId);
  
          try {
            // Create a reference to the specific note document
            const noteRef = doc(db, "USERS", currentUser, "NOTES", docId);
            await deleteDoc(noteRef);
            alert("Note deleted successfully!");
          } catch (error) {
            console.error("Error deleting note:", error);
            alert("Error deleting note!");
          }
        });
      });
    });
  }
  
  function stopListeningForNotes() {
    if (unsubscribe) {
      unsubscribe(); // Unsubscribe from the snapshot listener
      unsubscribe = null;
    }
  }