
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
  async function writeForSug(){
    let Deparment = sugDeparment.value
    let firstname = sugfirstname.value
    let Lastname = sugLastname.value
    let Nickname = sugNickname.value
    let Phone = sugPhone.value
    let Whatsapp = sugWhatsapp.value
    let Facebook = sugFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "SUGPRESIDENT", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        sugDeparment.value = ''
        sugfirstname.value = ''
        sugLastname.value = ''
        sugNickname.value = ''
        sugPhone.value = ''
        sugWhatsapp.value = ''
        sugFacebook.value = ''
    }
}
sugwrite.addEventListener('click', writeForSug)


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
        Facebook : Facebook
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
        console.log(docSnap.data())
        sugDeparment.value = docSnap.data().Deparment
        sugfirstname.value = docSnap.data().Firstname
        sugLastname.value = docSnap.data().Lastname
        sugNickname.value = docSnap.data().Nickname
        sugPhone.value = docSnap.data().Phone
        sugWhatsapp.value = docSnap.data().Whatsapp
        sugFacebook.value = docSnap.data().Facebook
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

// WRITE FOR SUG SECRETARY
async function writeForGen(){
    let Deparment = genDeparment.value
    let firstname = genfirstname.value
    let Lastname = genLastname.value
    let Nickname = genNickname.value
    let Phone = genPhone.value
    let Whatsapp = genWhatsapp.value
    let Facebook = genFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "SUG-GEN-SEC", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        genDeparment.value = ''
        genfirstname.value = ''
        genLastname.value = ''
        genNickname.value = ''
        genPhone.value = ''
        genWhatsapp.value = ''
        genFacebook.value = ''
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
        console.log(docSnap.data())
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


// WRITE FOR SUG PRO
async function writeForPro(){
    let Deparment = proDeparment.value
    let firstname = profirstname.value
    let Lastname = proLastname.value
    let Nickname = proNickname.value
    let Phone = proPhone.value
    let Whatsapp = proWhatsapp.value
    let Facebook = proFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "SUG-PRO", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        proDeparment.value = ''
        profirstname.value = ''
        proLastname.value = ''
        proNickname.value = ''
        proPhone.value = ''
        proWhatsapp.value = ''
        proFacebook.value = ''
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
        console.log(docSnap.data())
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



// WRITE FOR SCHOOL PRESIDENT
async function writeForSchool(){
    let Deparment = schoolDeparment.value
    let firstname = schoolfirstname.value
    let Lastname = schoolLastname.value
    let Nickname = schoolNickname.value
    let Phone = schoolPhone.value
    let Whatsapp = schoolWhatsapp.value
    let Facebook = schoolFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        schoolDeparment.value = ''
        schoolfirstname.value = ''
        schoolLastname.value = ''
        schoolNickname.value = ''
        schoolPhone.value = ''
        schoolWhatsapp.value = ''
        schoolFacebook.value = ''
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
        console.log(docSnap.data())
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


// WRITE FOR SCHOOL PRESIDENT
async function writeForSchool(){
    let Deparment = schoolDeparment.value
    let firstname = schoolfirstname.value
    let Lastname = schoolLastname.value
    let Nickname = schoolNickname.value
    let Phone = schoolPhone.value
    let Whatsapp = schoolWhatsapp.value
    let Facebook = schoolFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        schoolDeparment.value = ''
        schoolfirstname.value = ''
        schoolLastname.value = ''
        schoolNickname.value = ''
        schoolPhone.value = ''
        schoolWhatsapp.value = ''
        schoolFacebook.value = ''
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
        console.log(docSnap.data())
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


// WRITE FOR DEPARTMENTAL GOVERNOR
async function writeForGov(){
    let Deparment = govDeparment.value
    let firstname = govfirstname.value
    let Lastname = govLastname.value
    let Nickname = govNickname.value
    let Phone = govPhone.value
    let Whatsapp = govWhatsapp.value
    let Facebook = govFacebook.value
    if(Deparment == '' || firstname == '' || Lastname == '' || Nickname == '' || Phone == '' || Whatsapp == '' || Facebook == ''){
        alert('please fill all empty spaces')
    }else{
        var ref = doc(db, "GOVERNORS", Deparment)
        const docRef = await setDoc(ref, {
            Deparment : Deparment,
            Firstname : firstname,
            Lastname : Lastname,
            Nickname : Nickname,
            Phone : Phone,
            Whatsapp : Whatsapp,
            Facebook : Facebook
        })
        .then(() => {
            alert("Uploading Successful")
        })
        .catch(error => {
            console.error(error);
        })
        govDeparment.value = ''
        govfirstname.value = ''
        govLastname.value = ''
        govNickname.value = ''
        govPhone.value = ''
        govWhatsapp.value = ''
        govFacebook.value = ''
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


// READ FOR SCHOOL PRESIDENT
async function readForSchool(){

    let Deparment = schoolDeparment.value

    var ref = doc(db, "SCHOOL-PRESIDENT", Deparment)
    const docSnap = await getDoc(ref)
    if(docSnap.exists()){
        console.log(docSnap.data())
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








