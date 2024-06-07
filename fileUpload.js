
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

    import {getStorage, listAll, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
    import {getFirestore, doc, onSnapshot, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
    import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
    const db = getFirestore()
    const auth = getAuth()
    const storage = getStorage()
    let currentUser = null

    onAuthStateChanged(auth, user => {
        if(user){
            currentUser = user.uid
            console.log(currentUser);
            readAllDocuments()
        }
    })

    let uploadBtn = document.getElementById('uploadBtn')
    let fileToUpload = document.getElementById('fileToUpload')
    let htfileName = document.getElementById('htfileName')

    // CHECK IF THE STORAGE SPACE ALREADY EXIST

    function checkFolder(){

        const storageRef = ref(storage, currentUser)
        listAll(storageRef)
        .then(result => {
    
            if(result.items.length ===0){
                createStudentFolder(currentUser)
                console.log('Such Folder doesnt exist')
            }else{
    
                createStudentFolder(currentUser)
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    // FUNCITON TO CREATE THE STORAGE FOLDER IF IT DOESNT EXIST
        function createStudentFolder(currentUser){
            let file = fileToUpload.files[0]
            let fileName = file.name

             const storagePath = ref(storage, `${currentUser}/` + fileName)
             const uploadTask = uploadBytesResumable(storagePath, file)
             
             uploadTask.on('state_changed', snapshot => {
                let progressDigit = document.getElementById('progressDigit')
                var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
                progressDigit.textContent = progress + "%"
                htfileName.textContent = fileName

                // console.log(snapshot);
             }, error => {
                console.error(error);
             }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                const ref = collection(db, "DOCUMENTS", currentUser, "MYDOCUMENTS");
                // const ref = doc(db, currentUser, fileName)
                await addDoc(ref, {
                    fileName: fileName,
                    fileURL : downloadURL
                })
                alert('fil uploaded successfully')
                progressDigit.textContent = ''
                htfileName.textContent = ''
             }
             )
        }

            // console.log(currentUser);
    uploadBtn.addEventListener('click', checkFolder)

    // FUNCTION TO DISPLAY ALL FILES UNDER THE CURRENT USER

    let displayfiles = document.getElementById('displayfiles');
    async function readAllDocuments() {
        // const myCollection = collection(db, currentUser);
        const myCollection = collection(db, "DOCUMENTS", currentUser, "MYDOCUMENTS");
    
        try {
            onSnapshot(myCollection, (querySnapshot) => {
                displayfiles.innerHTML = '';
    
                querySnapshot.forEach((documee) => {
                    console.log(documee.data());
                    let newDiv = document.createElement('div');
                    newDiv.setAttribute('class', 'mainet');
                    newDiv.innerHTML = `
                        <label for="filename">File Name</label>
                        <p>${documee.data().fileName}</p>
                        <a href="${documee.data().fileURL}" download="${documee.data().fileURL}">
                            <img src="${documee.data().fileURL}" class="imageMain" alt="${documee.data().fileName}" />
                        </a>
                        `;
                        displayfiles.appendChild(newDiv);
                    });
                    
                    // <button data-doc-id=njc9d"${documee.id}" class="delete">Delete</button>
                // ADD EVENT LISTENER TO THE DELETE BUTTON
                // newDiv.querySelector('.delete').addEventListener('click', async (event) => {
                //     const docId = event.target.dataset.docId;
            
                //     try {
                //       const myCollection = doc(db, "DOCUMENTS", currentUser, "MYDOCUMENTS", docId);
                //       await deleteDoc(noteRef);
                //       alert("Note deleted successfully!");
                //     } catch (error) {
                //       console.error("Error deleting note:", error);
                //       alert("Error deleting note!");
                //     }
                //   });

            });
        } catch(error) {
            console.error(error);
        }
    }
    
 