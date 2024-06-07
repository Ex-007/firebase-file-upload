


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBmY2XtNwXZrHeE5za2cp7sOFYOKjSvdCQ",
    authDomain: "school-newusersign.firebaseapp.com",
    projectId: "school-newusersign",
    storageBucket: "school-newusersign.appspot.com",
    messagingSenderId: "382800829354",
    appId: "1:382800829354:web:145aeb3f8e346c016129d3"
    };
    
    const app = initializeApp(firebaseConfig);
    let db = getFirestore();
    const myCollection = collection(db, 'APARTMENT');
    
    let overallContainer = document.getElementById('overallContainer');
    let priceCheckBtn = document.getElementById('priceCheckBtn');
    let filterPrice = document.getElementById('filterPrice');
    let filterPriceFrom = document.getElementById('filterPriceFrom');
    let querySnapshot = [];

    priceCheckBtn.addEventListener('click', async (e) => {
        const selectedPrice = parseInt(filterPrice.value); // Get the selected price as a number
        const selectedPriceFrom = parseInt(filterPriceFrom.value); // Get the selected price as a number
        const filteredDocs = [];
      
        try {
          const querySnapshot = await getDocs(myCollection);
          querySnapshot.forEach((incoming) => {
            const price = parseInt(incoming.data().apartmentPrice); // Access the price field from the document
            if (price >= selectedPriceFrom && price <= selectedPrice) { // Check if price is within the range
              filteredDocs.push(incoming);
            }
          });
      
          displayDataIn(filteredDocs); // Pass the filtered documents to display function
        } catch (error) {
          console.error('Error reading documents: ', error);
        }
      });

        async function readAllDocuments() {
            try {
                querySnapshot = await getDocs(myCollection);
                displayDataIn(querySnapshot);
                // console.log(querySnapshot.data())
            } catch (error) {
                console.error('Error reading documents: ', error);
            }
    }
      
      function displayDataIn(querySnapshot) {
        overallContainer.innerHTML = ''; // Clear previous content
      
        querySnapshot.forEach((documen) => {
          const newDiv = document.createElement('div');
          newDiv.setAttribute('class', 'container')
          newDiv.innerHTML = `
            <div class="imageDiv">
                <img src="${documen.data().apartmentImage}" alt="" class="houseImage">
            </div>
            <div class="secondDivision">
                <h3>${documen.data().apartmentName}</h3>
                <label for="addreess">Address:</label>
                <p>${documen.data().apartmentAddress}</p>
                <label for="description">Description</label>
                <p>${documen.data().apartmentDescription}</p>
                <label for="duration">Duration</label>
                <p>${documen.data().duration}</p>
                <label for="price">Price</label>
                <p>&#8358 <span>${documen.data().apartmentPrice}</span></p>
                <label for="contact">Contact</label>
                <p>${documen.data().apartmentContact}</p>
                <label for="availability">Availability</label>
                <p>${documen.data().availability}</p>
            </div>
          
          `
            console.log(documen.data());
          overallContainer.appendChild(newDiv);
        });
      }
      


      readAllDocuments()