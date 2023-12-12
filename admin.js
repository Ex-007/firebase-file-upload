
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
  import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-storage.js";
  const db = getFirestore()
  let auth = getAuth()
  const storage = getStorage()


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
let photoImage = document.getElementById('photoImage')

async function writeForSug() {
    let Deparment = sugDeparment.value
    let firstname = sugfirstname.value
    let Lastname = sugLastname.value
    let Nickname = sugNickname.value
    let Phone = sugPhone.value
    let Whatsapp = sugWhatsapp.value
    let Facebook = sugFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = photoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "SUGPRESIDENT", Deparment);
            await setDoc(ref, {
                Department: Deparment,
                FirstName: firstname,
                LastName: Lastname,
                Nickname: Nickname,
                Phone: Phone,
                Whatsapp: Whatsapp,
                Facebook: Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            clearForm();
        });
    }
}

function clearForm() {
    // Clear form fields after successful upload
    sugDeparment.value = ''
    sugfirstname.value = ''
    sugLastname.value = ''
    sugNickname.value = ''
    sugPhone.value = ''
    sugWhatsapp.value = ''
    sugFacebook.value = ''
}

sugwrite.addEventListener('click', writeForSug);


// UPDATE FOR SUG
async function updateForSug(){

    let Deparment = sugDeparment.value
    let firstname = sugfirstname.value
    let Lastname = sugLastname.value
    let Nickname = sugNickname.value
    let Phone = sugPhone.value
    let Whatsapp = sugWhatsapp.value
    let Facebook = sugFacebook.value

    var ref = doc(db, "SUGPRESIDENT", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook,
        PhotoURL : PhotoURL
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    sugDeparment.value = ''
    sugfirstname.value = ''
    sugLastname.value = ''
    sugNickname.value = ''
    sugPhone.value = ''
    sugWhatsapp.value = ''
    sugFacebook.value = ''
}
sugUpdate.addEventListener('click', updateForSug)


// READ FOR SUG
async function readForSug(){

    let Deparment = sugDeparment.value

    var ref = doc(db, "SUGPRESIDENT", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        sugDeparment.value = docSnap.data().Deparment
        sugfirstname.value = docSnap.data().Firstname
        sugLastname.value = docSnap.data().Lastname
        sugNickname.value = docSnap.data().Nickname
        sugPhone.value = docSnap.data().Phone
        sugWhatsapp.value = docSnap.data().Whatsapp
        sugFacebook.value = docSnap.data().Facebook
        let photoSee = docSnap.data().downloadURL

        console.log(photoSee)
    }else{
        alert('data does not exist')
    }
}
sugRead.addEventListener('click', readForSug)

// DELETE FOR SUG
    async function deleteForSug(){
        let Deparment = sugDeparment.value
        var ref = doc(db, "SUGPRESIDENT", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    sugDelete.addEventListener('click', deleteForSug)



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
let genphotoImage = document.getElementById('genphotoImage')

// WRITE FOR SUG SECRETARY


async function writeForGen() {
    let Deparment = genDeparment.value
    let firstname = genfirstname.value
    let Lastname = genLastname.value
    let Nickname = genNickname.value
    let Phone = genPhone.value
    let Whatsapp = genWhatsapp.value
    let Facebook = genFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = genphotoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "SUG-GEN-SEC", Deparment);
            await setDoc(ref, {
                Deparment : Deparment,
                Firstname : firstname,
                Lastname : Lastname,
                Nickname : Nickname,
                Phone : Phone,
                Whatsapp : Whatsapp,
                Facebook : Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            genDeparment.value = ''
            genfirstname.value = ''
            genLastname.value = ''
            genNickname.value = ''
            genPhone.value = ''
            genWhatsapp.value = ''
            genFacebook.value = ''
        });
    }
}
genwrite.addEventListener('click', writeForGen)


// UPDATE FOR SUG SECRETARY
async function updateForGen(){

    let Deparment = genDeparment.value
    let firstname = genfirstname.value
    let Lastname = genLastname.value
    let Nickname = genNickname.value
    let Phone = genPhone.value
    let Whatsapp = genWhatsapp.value
    let Facebook = genFacebook.value

    var ref = doc(db, "SUG-GEN-SEC", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    genDeparment.value = ''
    genfirstname.value = ''
    genLastname.value = ''
    genNickname.value = ''
    genPhone.value = ''
    genWhatsapp.value = ''
    genFacebook.value = ''
}
genUpdate.addEventListener('click', updateForGen)


// READ FOR SUG SECRETARY
async function readForGen(){

    let Deparment = genDeparment.value

    var ref = doc(db, "SUG-GEN-SEC", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        genDeparment.value = docSnap.data().Deparment
        genfirstname.value = docSnap.data().Firstname
        genLastname.value = docSnap.data().Lastname
        genNickname.value = docSnap.data().Nickname
        genPhone.value = docSnap.data().Phone
        genWhatsapp.value = docSnap.data().Whatsapp
        genFacebook.value = docSnap.data().Facebook
    }else{
        alert('data does not exist')
    }
}
genRead.addEventListener('click', readForGen)

// DELETE FOR SUG SECRETARY
    async function deleteForGen(){
        let Deparment = sugDeparment.value
        var ref = doc(db, "SUG-GEN-SEC", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    genDelete.addEventListener('click', deleteForGen)












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
let prophotoImage = document.getElementById('prophotoImage')


// WRITE FOR SUG PRO


async function writeForPro() {
    let Deparment = proDeparment.value
    let firstname = profirstname.value
    let Lastname = proLastname.value
    let Nickname = proNickname.value
    let Phone = proPhone.value
    let Whatsapp = proWhatsapp.value
    let Facebook = proFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = prophotoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "SUG-PRO", Deparment);
            await setDoc(ref, {
                Deparment : Deparment,
                Firstname : firstname,
                Lastname : Lastname,
                Nickname : Nickname,
                Phone : Phone,
                Whatsapp : Whatsapp,
                Facebook : Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            proDeparment.value = ''
            profirstname.value = ''
            proLastname.value = ''
            proNickname.value = ''
            proPhone.value = ''
            proWhatsapp.value = ''
            proFacebook.value = ''
        });
    }
}
prowrite.addEventListener('click', writeForPro)


// UPDATE FOR SUG PRO
async function updateForPro(){

    let Deparment = proDeparment.value
    let firstname = profirstname.value
    let Lastname = proLastname.value
    let Nickname = proNickname.value
    let Phone = proPhone.value
    let Whatsapp = proWhatsapp.value
    let Facebook = proFacebook.value

    var ref = doc(db, "SUG-PRO", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    proDeparment.value = ''
    profirstname.value = ''
    proLastname.value = ''
    proNickname.value = ''
    proPhone.value = ''
    proWhatsapp.value = ''
    proFacebook.value = ''
}
proUpdate.addEventListener('click', updateForPro)


// READ FOR SUG PRO
async function readForPro(){

    let Deparment = proDeparment.value

    var ref = doc(db, "SUG-PRO", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        proDeparment.value = docSnap.data().Deparment
        profirstname.value = docSnap.data().Firstname
        proLastname.value = docSnap.data().Lastname
        proNickname.value = docSnap.data().Nickname
        proPhone.value = docSnap.data().Phone
        proWhatsapp.value = docSnap.data().Whatsapp
        proFacebook.value = docSnap.data().Facebook
    }else{
        alert('data does not exist')
    }
}
proRead.addEventListener('click', readForPro)

// DELETE FOR SUG PRO
    async function deleteForPro(){
        let Deparment = proDeparment.value
        var ref = doc(db, "SUG-PRO", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    proDelete.addEventListener('click', deleteForPro)






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
let schoolphotoImage = document.getElementById('schoolphotoImage')



// WRITE FOR SCHOOL PRESIDENT


async function writeForSchool() {
    let Deparment = schoolDeparment.value
    let firstname = schoolfirstname.value
    let Lastname = schoolLastname.value
    let Nickname = schoolNickname.value
    let Phone = schoolPhone.value
    let Whatsapp = schoolWhatsapp.value
    let Facebook = schoolFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = schoolphotoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "SCHOOL-PRESIDENT", Deparment);
            await setDoc(ref, {
                Deparment : Deparment,
                Firstname : firstname,
                Lastname : Lastname,
                Nickname : Nickname,
                Phone : Phone,
                Whatsapp : Whatsapp,
                Facebook : Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            schoolDeparment.value = ''
            schoolfirstname.value = ''
            schoolLastname.value = ''
            schoolNickname.value = ''
            schoolPhone.value = ''
            schoolWhatsapp.value = ''
            schoolFacebook.value = ''
        });
    }
}
schoolwrite.addEventListener('click', writeForSchool)


// UPDATE FOR SCHOOL PRESIDENT
async function updateForSchool(){

    let Deparment = schoolDeparment.value
    let firstname = schoolfirstname.value
    let Lastname = schoolLastname.value
    let Nickname = schoolNickname.value
    let Phone = schoolPhone.value
    let Whatsapp = schoolWhatsapp.value
    let Facebook = schoolFacebook.value

    var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    schoolDeparment.value = ''
    schoolfirstname.value = ''
    schoolLastname.value = ''
    schoolNickname.value = ''
    schoolPhone.value = ''
    schoolWhatsapp.value = ''
    schoolFacebook.value = ''
}
schoolUpdate.addEventListener('click', updateForSchool)


// READ FOR SCHOOL PRESIDENT
async function readForSchool(){

    let Deparment = schoolDeparment.value

    var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        schoolDeparment.value = docSnap.data().Deparment
        schoolfirstname.value = docSnap.data().Firstname
        schoolLastname.value = docSnap.data().Lastname
        schoolNickname.value = docSnap.data().Nickname
        schoolPhone.value = docSnap.data().Phone
        schoolWhatsapp.value = docSnap.data().Whatsapp
        schoolFacebook.value = docSnap.data().Facebook
    }else{
        alert('data does not exist')
    }
}
schoolRead.addEventListener('click', readForSchool)

// DELETE FOR SCHOOL PRESIDENT
    async function deleteForSchool(){
        let Deparment = proDeparment.value
        var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    schoolDelete.addEventListener('click', deleteForSchool)


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
let departmentphotoImage = document.getElementById('departmentphotoImage')




// WRITE FOR DEPARTMENTAL PRESIDENT


async function writeForDepartment() {
    let Deparment = departmentDeparment.value
    let firstname = departmentfirstname.value
    let Lastname = departmentLastname.value
    let Nickname = departmentNickname.value
    let Phone = departmentPhone.value
    let Whatsapp = departmentWhatsapp.value
    let Facebook = departmentFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = departmentphotoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "DEPARTMENT-PRESIDENT", Deparment);
            await setDoc(ref, {
                Deparment : Deparment,
                Firstname : firstname,
                Lastname : Lastname,
                Nickname : Nickname,
                Phone : Phone,
                Whatsapp : Whatsapp,
                Facebook : Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            departmentDeparment.value = ''
            departmentfirstname.value = ''
            departmentLastname.value = ''
            departmentNickname.value = ''
            departmentPhone.value = ''
            departmentWhatsapp.value = ''
            departmentFacebook.value = ''
        });
    }
}
departmentwrite.addEventListener('click', writeForDepartment)


// UPDATE FOR DEPARTMENTAL PRESIDENT
async function updateForDepartment(){

    let Deparment = departmentDeparment.value
    let firstname = departmentfirstname.value
    let Lastname = departmentLastname.value
    let Nickname = departmentNickname.value
    let Phone = departmentPhone.value
    let Whatsapp = departmentWhatsapp.value
    let Facebook = departmentFacebook.value

    var ref = doc(db, "DEPARTMENT-PRESIDENT", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    departmentDeparment.value = ''
    departmentfirstname.value = ''
    departmentLastname.value = ''
    departmentNickname.value = ''
    departmentPhone.value = ''
    departmentWhatsapp.value = ''
    departmentFacebook.value = ''
}
departmentUpdate.addEventListener('click', updateForDepartment)


// READ FOR DEPARTMENTAL PRESIDENT
async function readForDepartment(){

    let Deparment = departmentDeparment.value

    var ref = doc(db, "DEPARTMENT-PRESIDENT", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        departmentDeparment.value = docSnap.data().Deparment
        departmentfirstname.value = docSnap.data().Firstname
        departmentLastname.value = docSnap.data().Lastname
        departmentNickname.value = docSnap.data().Nickname
        departmentPhone.value = docSnap.data().Phone
        departmentWhatsapp.value = docSnap.data().Whatsapp
        departmentFacebook.value = docSnap.data().Facebook
    }else{
        alert('data does not exist')
    }
}
departmentRead.addEventListener('click', readForDepartment)

// DELETE FOR DEPARTMENTAL PRESIDENT
    async function deleteForDepartment(){
        let Deparment = departmentDeparment.value
        var ref = doc(db, "DEPARTMENT-PRESIDENT", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    departmentDelete.addEventListener('click', deleteForDepartment)


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
let govphotoImage = document.getElementById('govphotoImage')



// WRITE FOR DEPARTMENTAL GOVERNOR


async function writeForGov() {
    let Deparment = govDeparment.value
    let firstname = govfirstname.value
    let Lastname = govLastname.value
    let Nickname = govNickname.value
    let Phone = govPhone.value
    let Whatsapp = govWhatsapp.value
    let Facebook = govFacebook.value

    if (Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == '') {
        alert('Please fill all empty spaces');
    } else {
        let file = govphotoImage.files[0];
        const fileName = file.name;

        const storageRef = ref(storage, 'images/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
        }, (error) => {
            console.log(error);
        }, async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            const ref = doc(db, "DEPARTMENT-PRESIDENT", Deparment);
            await setDoc(ref, {
                Deparment : Deparment,
                Firstname : firstname,
                Lastname : Lastname,
                Nickname : Nickname,
                Phone : Phone,
                Whatsapp : Whatsapp,
                Facebook : Facebook,
                PhotoURL: downloadURL,  
            });

            alert("Uploading Successful");
            govDeparment.value = ''
            govfirstname.value = ''
            govLastname.value = ''
            govNickname.value = ''
            govPhone.value = ''
            govWhatsapp.value = ''
            govFacebook.value = ''
        });
    }
}
govwrite.addEventListener('click', writeForGov)


// UPDATE FOR DEPARTMENTAL GOVERNOR
async function updateForGov(){

    let Deparment = govDeparment.value
    let firstname = govfirstname.value
    let Lastname = govLastname.value
    let Nickname = govNickname.value
    let Phone = govPhone.value
    let Whatsapp = govWhatsapp.value
    let Facebook = govFacebook.value

    var ref = doc(db, "GOVERNORS", Deparment)
    await updateDoc(ref, {
        Deparment : Deparment,
        Firstname : firstname,
        Lastname : Lastname,
        Nickname : Nickname,
        Phone : Phone,
        Whatsapp : Whatsapp,
        Facebook : Facebook
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    govDeparment.value = ''
    govfirstname.value = ''
    govLastname.value = ''
    govNickname.value = ''
    govPhone.value = ''
    govWhatsapp.value = ''
    govFacebook.value = ''
}
govUpdate.addEventListener('click', updateForGov)


// READ FOR DEPARTMENTAL GOVERNOR
async function readForGov(){

    let Deparment = schoolDeparment.value

    var ref = doc(db, "GOVERNORS", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        govDeparment.value = docSnap.data().Deparment
        govfirstname.value = docSnap.data().Firstname
        govLastname.value = docSnap.data().Lastname
        govNickname.value = docSnap.data().Nickname
        govPhone.value = docSnap.data().Phone
        govWhatsapp.value = docSnap.data().Whatsapp
        govFacebook.value = docSnap.data().Facebook
    }else{
        alert('data does not exist')
    }
}
govRead.addEventListener('click', readForGov)

// DELETE FOR DEPARTMENTAL GOVERNOR
    async function deleteForGov(){
        let Deparment = govDeparment.value
        var ref = doc(db, "GOVERNORS", Deparment)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
    }

    govDelete.addEventListener('click', deleteForGov)

    // FOR CATALOGUE
    let projectName = document.getElementById('projectName')
    let projectAbstract = document.getElementById('projectAbstract')
    let projectPhone = document.getElementById('projectPhone')
    let projectAddress = document.getElementById('projectAddress')
    let projectId = document.getElementById('projectId')
    let projectWrite = document.getElementById('projectWrite')
    let projectUpdate = document.getElementById('projectUpdate')
    let projectRead = document.getElementById('projectRead')
    let projectDelete = document.getElementById('projectDelete')


    // WRITE FOR CATALOGUE
async function writeForProject(){
    let ProjectId = projectId.value
    let ProjectTopic = projectName.value
    let ProjectAbstract = projectAbstract.value
    let ProjectPhone = projectPhone.value
    let ProjectAddress = projectAddress.value
 
    if(ProjectId == '' || ProjectTopic == '' || ProjectAbstract == '' || ProjectPhone == '' || ProjectAddress == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "PROJECTS", ProjectId)
        const docRef = await setDoc(ref, {
            ID : ProjectId,
            Topic : ProjectTopic,
            Abstract : ProjectAbstract,
            ProjectPhone : ProjectPhone,
            Address : ProjectAddress
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        projectName.value = ''
        projectAbstract.value = ''
        projectPhone.value = ''
        projectAddress.value = ''
        projectId.value = ''
    }
}
projectWrite.addEventListener('click', writeForProject)


// UPDATE FOR CATALOGUE
async function updateForProject(){

    let ProjectId = projectId.value
    let ProjectTopic = projectName.value
    let ProjectAbstract = projectAbstract.value
    let ProjectPhone = projectPhone.value
    let ProjectAddress = projectAddress.value

    var ref = doc(db, "PROJECTS", ProjectId)
    await updateDoc(ref, {
        Topic : ProjectTopic,
        Abstract : ProjectAbstract,
        ProjectPhone : ProjectPhone,
        Address : ProjectAddress
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
    projectName.value = ''
    projectAbstract.value = ''
    projectPhone.value = ''
    projectAddress.value = ''
    projectId.value = ''
}
projectUpdate.addEventListener('click', updateForProject)


// READ FOR CATALOGUE
async function readForProject(){

    let ProjectId = projectId.value

    var ref = doc(db, "PROJECTS", ProjectId)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        projectName.value = docSnap.data().Topic
        projectAbstract.value = docSnap.data().Abstract 
        projectPhone.value = docSnap.data().ProjectPhone
        projectAddress.value = docSnap.data().Address
        projectId.value = docSnap.data().ID
    }else{
        alert('data does not exist')
    }
}
projectRead.addEventListener('click', readForProject)

// DELETE FOR CATALOGUE
    async function deleteForProject(){
        let ProjectId = projectId.value
        var ref = doc(db, "PROJECTS", ProjectId)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
        projectName.value = ''
        projectAbstract.value = ''
        projectPhone.value = ''
        projectAddress.value = ''
        projectId.value = ''
    }

    projectDelete.addEventListener('click', deleteForProject)

    // FOR MARKET
    let marketId = document.getElementById('marketId')
    let shopName = document.getElementById('shopName')
    let shopAddress = document.getElementById('shopAddress')
    let item1 = document.getElementById('item1')
    let item2 = document.getElementById('item2')
    let item3 = document.getElementById('item3')
    let item4 = document.getElementById('item4')
    let item5 = document.getElementById('item5')
    let item6 = document.getElementById('item6')
    let item7 = document.getElementById('item7')
    let markphoneNumber = document.getElementById('markphoneNumber')
    let markwhatsapp = document.getElementById('markwhatsapp')
    let markfacebook = document.getElementById('markfacebook')
    let marketWrite = document.getElementById('marketWrite')
    let marketUpdate = document.getElementById('marketUpdate')
    let marketRead = document.getElementById('marketRead')
    let marketDelete = document.getElementById('marketDelete')

        // WRITE FOR MARKET
async function writeForMarket(){
    let Id = marketId.value
    let Name = shopName.value
    let Address = shopAddress.value
    let itemOne = item1.value
    let itemTwo = item2.value
    let itemThree = item3.value
    let itemFour = item4.value
    let itemFive = item5.value
    let itemSix = item6.value
    let phoneNumber = markphoneNumber.value
    let whatsapp = markwhatsapp.value
    let facebook = markfacebook.value
    let itemSeven = item7.value
    
    if(Id == '' || Name == '' || Address == '' || itemOne == '' || phoneNumber == '' || whatsapp == '' || facebook == ''){
        alert('please fill all empty Item 1 and Others')
    }else{
        var ref = doc(db, "MARKET", Id)
        const docRef = await setDoc(ref, {
            ID : Id,
            Name : Name,
            Address : Address,
            itemOne : itemOne,
            itemThree : itemThree,
            itemFour : itemFour,
            itemTwo : itemTwo,
            itemFive : itemFive,
            itemSix : itemSix,
            itemSeven : itemSeven,
            phoneNumber : phoneNumber,
            whatsapp : whatsapp,
            facebook : facebook,
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        marketId.value = ''
        shopName.value = ''
        shopAddress.value = ''
        item1.value = ''
        item2.value = ''
        item3.value = ''
        item4.value = ''
        item5.value = ''
        item6.value = ''
        item7.value = ''
        markphoneNumber.value = ''
        markwhatsapp.value = ''
        markfacebook.value = ''
    }
}
marketWrite.addEventListener('click', writeForMarket)


// UPDATE FOR MARKET
async function updateForMarket(){

    let Id = marketId.value
    let Name = shopName.value
    let Address = shopAddress.value
    let itemOne = item1.value
    let itemTwo = item2.value
    let itemThree = item3.value
    let itemFour = item4.value
    let itemFive = item5.value
    let itemSix = item6.value
    let phoneNumber = markphoneNumber.value
    let whatsapp = markwhatsapp.value
    let facebook = markfacebook.value
    let itemSeven = item7.value

    var ref = doc(db, "MARKET", Id)
    await updateDoc(ref, {
        Name : Name,
        Address : Address,
        itemOne : itemOne,
        itemThree : itemThree,
        itemFour : itemFour,
        itemTwo : itemTwo,
        itemFive : itemFive,
        itemSix : itemSix,
        itemSeven : itemSeven,
        phoneNumber : phoneNumber,
        whatsapp : whatsapp,
        facebook : facebook,
    })
    .then(() => {
        alert('Updated Successfully')
    })
    .catch(error => {
        alert(error.message)
    })
        marketId.value = ''
        shopName.value = ''
        shopAddress.value = ''
        item1.value = ''
        item2.value = ''
        item3.value = ''
        item4.value = ''
        item5.value = ''
        item6.value = ''
        item7.value = ''
        markphoneNumber.value = ''
        markwhatsapp.value = ''
        markfacebook.value = ''
}
marketUpdate.addEventListener('click', updateForMarket)


// READ FOR MARKET
async function readForMarket(){

    let Id = marketId.value

    var ref = doc(db, "MARKET", Id)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        // console.log(docSnap.data())
        Id.value = docSnap.data().ID
        Name.value = docSnap.data().Name 
        Address.value = docSnap.data().Address
        itemOne.value = docSnap.data().itemOne
        itemThree.value = docSnap.data().itemThree
        itemFour.value = docSnap.data().itemFour
        itemTwo.value = docSnap.data().itemTwo
        itemFive.value = docSnap.data().itemFive
        itemSix.value = docSnap.data().itemSix
        itemSeven.value = docSnap.data().itemSeven
        phoneNumber.value = docSnap.data().phoneNumber
        whatsapp.value = docSnap.data().whatsapp
        facebook.value = docSnap.data().facebook
    }else{
        alert('data does not exist')
    }
}
marketRead.addEventListener('click', readForMarket)

// DELETE FOR MARKET
    async function deleteForMarket(){
        let Id = marketId.value
        var ref = doc(db, "MARKET", Id)
        const docSnap = await getDoc(ref)
        if(!docSnap.exists()){
            alert('No such Document')
        }
        await deleteDoc(ref)
        .then(() => {
            alert('Document Deleted')
        })
        .catch(error => {
            alert(error.message)
        })
        marketId.value = ''
        shopName.value = ''
        shopAddress.value = ''
        item1.value = ''
        item2.value = ''
        item3.value = ''
        item4.value = ''
        item5.value = ''
        item6.value = ''
        item7.value = ''
        markphoneNumber.value = ''
        markwhatsapp.value = ''
        markfacebook.value = ''
    }

    marketDelete.addEventListener('click', deleteForMarket)

        // FOR NEWS
        let newId = document.getElementById('newId')
        let newsPreview = document.getElementById('newsPreview')
        let newContent = document.getElementById('newContent')
        let newstWrite = document.getElementById('newstWrite')
        let newsUpdate = document.getElementById('newsUpdate')
        let newsRead = document.getElementById('newsRead')
        let newsDelete = document.getElementById('newsDelete')
    
    
        // WRITE FOR NEWS
    async function writeForNews(){
        let Id = newId.value
        let Content = newContent.value
        let Preview = newsPreview.value
     
        if(Id == '' || Content == '' || Preview == ''){
            alert('please fill all empty spaces')
        }else{
            var ref = doc(db, "NEWS", Id)
            const docRef = await setDoc(ref, {
                Id : Id,
                Content : Content,
                Preview : Preview,
            })
            .then(() => {
                alert("Uploading Successful")
            })
            .catch(error => {
                console.error(error);
            })
            newId.value = ''
            newContent.value = ''
            newsPreview.value = ''
        }
    }
    newstWrite.addEventListener('click', writeForNews)
    
    
    // UPDATE FOR NEWS
    async function updateForNews(){
    
        let Id = newId.value
        let Content = newContent.value
        let Preview = newsPreview.value
    
        var ref = doc(db, "NEWS", Id)
        await updateDoc(ref, {
            Content : Content,
            Preview : Preview,
        })
        .then(() => {
            alert('Updated Successfully')
        })
        .catch(error => {
            alert(error.message)
        })
        newId.value = ''
        newContent.value = ''
        newsPreview.value = ''
    }
    newsUpdate.addEventListener('click', updateForNews)
    
    
    // READ FOR CATALOGUE
    async function readForNews(){
    
        let Id = newId.value
    
        var ref = doc(db, "NEWS", Id)
        const docSnap = await getDoc(ref)
        if(docSnap.exists()){
            // console.log(docSnap.data())
            newId.value = docSnap.data().Id
            newContent.value = docSnap.data().Content 
            newsPreview.value = docSnap.data().Preview
        }else{
            alert('data does not exist')
        }
    }
    newsRead.addEventListener('click', readForNews)
    
    // DELETE FOR CATALOGUE
        async function deleteForNews(){
            let Id = newId.value
            var ref = doc(db, "NEWS", Id)
            const docSnap = await getDoc(ref)
            if(!docSnap.exists()){
                alert('No such Document')
            }
            await deleteDoc(ref)
            .then(() => {
                alert('Document Deleted')
            })
            .catch(error => {
                alert(error.message)
            })
            newId.value = ''
            newContent.value = ''
            newsPreview.value = ''
        }
    
        newsDelete.addEventListener('click', deleteForNews)