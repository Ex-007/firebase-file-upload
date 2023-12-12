

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