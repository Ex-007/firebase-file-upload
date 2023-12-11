



function createUser(){
    if(!validationUser()){
        return
    }
    let firstNameInput = firstName.value
    let lastNameInput = lastName.value
    let usernameInput = username.value
    let usernameInput = phoneNumber.value
    let email = emailIn.value
    let dateOfBirthInput = dateOfBirth.value
    let genderInput = gender.value
    let password = passwordIn.value

    createUserWithEmailAndPassword(auth, email, password)
    .then(credentials => {
        alert('User Created. Waiting for Redirect')
        let userId = credentials.user.uid

        // SAVING THE USER CREDENTIALS TO FIREBASE
        set(ref(db, 'newUser/' + userId), {
            FirstName : firstNameInput,
            LastName : lastNameInput,
            Username : usernameInput,
            Email : email,
            Date_Of_Birth : dateOfBirthInput,
            Gender : genderInput,
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            alert(error)
            console.error(error);
        })

        // REDIRECTING THE NEW USER TO THE PROFILE
        setTimeout(() => {
            window.location.href =  'newprofile.html'
        }, 3000);

        console.log(userId)
        // console.log(credentials);
    })
    .catch(error => {
        alert(error)
        console.error('The error is ' + error.message);
    })
}