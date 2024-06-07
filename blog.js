import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDoc, doc, increment, updateDoc, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const db = getFirestore();



import {getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
const auth = getAuth()
let currentUser = null

onAuthStateChanged(auth, user => {
    if(user){
        currentUser = user.uid
        console.log(currentUser);
        listenWell(currentUser)
    }else{
      window.open('register.html')
    }
})
















let askName = document.getElementById('askName');
let question = document.getElementById('question');
let logQuestion = document.getElementById('logQuestion');
let incomingBlog = document.getElementById('incomingBlog');

async function addBlogPost() {
  let bloggerName = askName.value;
  let blogContent = question.value;

  const dateAndTimeOfBlog = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos'});

  try {
    // Add the blog post to the "BLOGS" collection
    const blogRef = collection(db, "BLOGS");
    await addDoc(blogRef, {
      writer: bloggerName,
      content: blogContent,
      timeStamp: dateAndTimeOfBlog
    });
    askName.value = '';
    question.value = '';
    // alert('Blog Posted Successfully');
  } catch (error) {
    console.error(error);
  }
}

function displayBlog(doc) {
  const data = doc.data();
  const newElement = document.createElement("div");
  newElement.setAttribute('class', 'questionName');
  const uniqueId = doc.id; // Use document ID for uniqueness

  newElement.innerHTML = `
    <h2>${data.writer}</h2>
    <p>${data.content}</p>
    <p>${data.timeStamp}</p>

    <div class="likeDislikeSection">
      <button class="likeBtn" data-doc-id="${doc.id}">Like</button>
      <span class="likeCount" id="likeCount-${doc.id}">${data.likes || 0}</span>
      <button class="dislikeBtn" data-doc-id="${doc.id}">Dislike</button>
      <span class="dislikeCount" id="dislikeCount-${doc.id}">${data.dislikes || 0}</span>
    </div>
    
    <div class="labelAndName">
      <label for="commenterName-${uniqueId}">Name:</label>
      <input type="text" id="commenterName-${uniqueId}">
      
      <label for="comment-${uniqueId}">Comment:</label>
      <textarea  id="comment-${uniqueId}" cols="20" rows="5"></textarea>
      
      <div class="loveAndComment">
        <div class="comme">
          <button class="commentBtn" data-doc-id="${doc.id}">Comment</button>
        </div>
      </div>
    </div>
  `;

  incomingBlog.appendChild(newElement);
}

  // LIKING AND DISLIKING BLOG SECTION

  // UPDATE COUNT
  async function updateCount(docId, field, currentUser) {
    const blogRef = doc(db, "BLOGS", docId);
  
    try {
          // Check if the user has already liked/disliked
    const docSnap = await getDoc(blogRef);
    const data = docSnap.data();
    if (data && data.users && data.users[currentUser] === field) {
      console.log("User already performed this action on this post.");
      return; // Prevent user from performing the same action again
    }


      await updateDoc(blogRef, {
        [field]: increment(1),
        [`users.${currentUser}`]: field
      });

    // After updating count in Firestore, update UI
    const countSpan = document.getElementById(`${field}Count-${docId}`);
    if (countSpan) {
      const currentCount = parseInt(countSpan.textContent, 10);
      countSpan.textContent = currentCount + 1;
    }
    } catch (error) {
      console.error("Error updating count:", error);
    }
  }

  // Function to disable like and dislike buttons for a specific user
function disableButtonsForUser(docId, userId) {
  const likeBtn = document.querySelector(`.likeBtn[data-doc-id="${docId}"][data-user-id="${userId}"]`);
  const dislikeBtn = document.querySelector(`.dislikeBtn[data-doc-id="${docId}"][data-user-id="${userId}"]`);

  if (likeBtn) {
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  }
  if (dislikeBtn) {
    dislikeBtn.disabled = true;
    likeBtn.disabled = true;
  }
}

  // LIKE BLOG
  async function likeBlog(event) {
    const likeBtn = event.target;
    const docId = likeBtn.dataset.docId;
  
    if (!docId) {
      console.error("Missing document ID for like");
      return;
    }
  
    await updateCount(docId, "likes");
  }

  // DISLIKE BLOG
  async function dislikeBlog(event) {
    const dislikeBtn = event.target;
    const docId = dislikeBtn.dataset.docId;
  
    if (!docId) {
      console.error("Missing document ID for dislike");
      return;
    }
  
    await updateCount(docId, "dislikes");
  }

  // Event listeners for liking and disliking
  function listenWell(currentUser){
  
    incomingBlog.addEventListener('click', async (event) => {
      // const user = firebase.auth().currentUser;
      if (!currentUser) {
        console.error("User not signed in.");
        return;
      }
      // const userId = user.uid;
    
      const clickedBtn = event.target;
      const docId = clickedBtn.dataset.docId;
  
    if (clickedBtn.classList.contains('likeBtn')) {
      await updateCount(docId, "likes", currentUser);
      disableButtonsForUser(docId, currentUser); // Disable buttons for this user after action
    } else if (clickedBtn.classList.contains('dislikeBtn')) {
      await updateCount(docId, "dislikes", currentUser);
      disableButtonsForUser(docId, currentUser); // Disable buttons for this user after action
    }
    });
  }












function displayComments(commentSnapshot, commentContainer) {
  commentContainer.innerHTML = ''
  commentSnapshot.forEach(commentDoc => {
    const commentData = commentDoc.data();
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.innerHTML = `
      <h3>${commentData.commenterName}</h3>
      <p>${commentData.comment}</p>
    `;
    commentContainer.appendChild(commentElement);
  });
}

// Listen for new blogs

const blogRef = collection(db, "BLOGS");
onSnapshot(blogRef, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      displayBlog(change.doc);
      
      // Fetch comments for this blog post
      const commentContainer = document.createElement('div');
      commentContainer.classList.add('comments-section');
      const commentRef = collection(change.doc.ref, "Comments");
      onSnapshot(commentRef, (commentSnapshot) => {
        displayComments(commentSnapshot, commentContainer);
      });
      incomingBlog.appendChild(commentContainer);
    }

        // Update UI for changes in likes and dislikes
        if (change.type === "modified") {
          const data = change.doc.data();
          const docId = change.doc.id;
          const likeCountSpan = document.getElementById(`likeCount-${docId}`);
          const dislikeCountSpan = document.getElementById(`dislikeCount-${docId}`);
          if (likeCountSpan && dislikeCountSpan) {
            likeCountSpan.textContent = data.likes || 0;
            dislikeCountSpan.textContent = data.dislikes || 0;
          }
        }

  });
});

async function addComment(event) {
  const commentBtn = event.target;
  const docId = commentBtn.dataset.docId; 

  if (!docId) {
    console.error("Missing document ID for comment");
    return;
  }

  const commenterNameElementId = `commenterName-${docId}`; 
  const commenterName = document.getElementById(commenterNameElementId).value;
  const commentElementId = `comment-${docId}`; 
  const mainComment = document.getElementById(commentElementId).value;

  const dateAndTime = new Date().toLocaleString('en-NG', {timeZone: 'Africa/Lagos'});

  const commentRef = collection(db, "BLOGS", docId, "Comments");

  await addDoc(commentRef, {
    commenterName: commenterName,
    comment: mainComment,
    timestamp: dateAndTime,
  });
  // alert('Comment logged successfully');
  document.getElementById(commentElementId).value = '';
  document.getElementById(commenterNameElementId).value = '';
  
}

// Event listeners
logQuestion.addEventListener('click', addBlogPost);
incomingBlog.addEventListener('click', (event) => {
  if (event.target.classList.contains('commentBtn')) {
    addComment(event);
  }
});
