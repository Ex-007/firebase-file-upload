
  const firebaseConfig = {
    apiKey: "AIzaSyA__OlBlpTBcnrzydomsA_bKdJMXZbjfYw",
    authDomain: "fir-storage-8146b.firebaseapp.com",
    projectId: "fir-storage-8146b",
    storageBucket: "fir-storage-8146b.appspot.com",
    messagingSenderId: "762235258163",
    appId: "1:762235258163:web:66372d5abf469e916d2a46"
  };

 
  firebase.initializeApp(firebaseConfig);

  let fileIn = document.getElementById('fileIn')
  let uploadBtn = document.getElementById('uploadBtn')

  uploadBtn.addEventListener('click', () => {
    let file = fileIn.files[0]
    console.log(file)
    var fileName = file.name
    console.log(fileName)

    const storageRef = firebase.storage().ref('Files/' + fileName)

    const uploadTask = storageRef.put(file)

    uploadTask.on('state_changed', snapshot => {
        let progressWidth = document.getElementById('progressWidth')
        let progressDigit = document.getElementById('progressDigit')

        var progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
        progressDigit.textContent = progress + "%"
        progressWidth.style.width = progress
        console.log(progress)
    }, error => {
        console.error(error.message);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL()
        .then(downloadURL => {
            console.log(downloadURL)
        })
    })
  })