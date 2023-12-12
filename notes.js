



//CHANGING THE THEME COLOR
// let bodyColor = document.getElementById('bodyColor')
// let changeThemeColor = document.getElementById('changeThemeColor')
// changeThemeColor.addEventListener('click', () => {
//     if(bodyColor.style.backgroundColor == 'white'){
//         bodyColor.style.backgroundColor = 'black'
//         changeThemeColor.textContent = 'white'
//         changeThemeColor.style.backgroundColor = 'white'
//         changeThemeColor.style.color = 'black'
//         saveData()
//     }else{
//         bodyColor.style.backgroundColor = 'white'
//         changeThemeColor.textContent = 'Dark'
//         changeThemeColor.style.backgroundColor = 'black'
//         changeThemeColor.style.color = 'white'
//         saveData()
//     }
// })

// THE RESIZING OF THE TEXTAREA

let textAreaText = document.getElementById('textAreaText')
textAreaText.addEventListener('input', () => {
    textAreaText.style.height = 'auto'
    textAreaText.style.height = textAreaText.scrollHeight + 'px'
})


// THE LISTING ENVIROMENT
let headTitle = document.getElementById('headTitle')
let listing = document.getElementById('listing')
let logBtn = document.getElementById('logBtn')
let newListing = document.getElementById('newListing')

// logBtn.addEventListener('click', () => {
//     let textInput = textAreaText.value
//     let headTitleInput = headTitle.value
//     if(textInput == '' || headTitleInput == ''){
//         alert('please input a value')
//     }else{
//         let div = document.createElement('div')

//         let newLi = document.createElement('li')
//         let textTitle = document.createElement('li')

//         let span = document.createElement('span')
//         span.setAttribute('class', 'spanEdit')

//         newLi.textContent = textInput
//         textTitle.textContent = headTitleInput

//         span.innerHTML = '\u00d7'
//         newLi.appendChild(span);;

//         div.append(textTitle, newLi)
//         newListing.appendChild(div)

//         textAreaText.value = ''  
//         textAreaText.setAttribute('class', 'change')
//     }
//     saveData()
// })


logBtn.addEventListener('click', () => {
    let textInput = textAreaText.value
    if(textInput == ''){
        alert('please input a value')
    }else{
        let newLi = document.createElement('li')
        let span = document.createElement('span')
        span.setAttribute('class', 'spanEdit')
        newLi.textContent = textInput
        span.innerHTML = '\u00d7'
        newLi.appendChild(span);;
        newListing.appendChild(newLi)
        textAreaText.value = ''  
        textAreaText.setAttribute('class', 'change')
    }
    saveData()
})

//TARGETTING THE DELETE BUTTON
// newListing.addEventListener('click', (e) => {
//     if (e.target.tagName === 'LI'){
//         // e.target.style.backgroundColor = 'blue'
//         e.target.style.textDecoration = 'line-through'
//         saveData()
//     }else if(e.target.tagName === 'SPAN'){
//         e.target.parentElement.remove()
//         saveData()
//     }
// })

newListing.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI'){
        // e.target.style.backgroundColor = 'blue'
        e.target.style.backgroundColor = 'blue'
        saveData()
    } else{
        e.target.style.backgroundColor = 'green'
    }
    
    if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove()
        saveData()
    }
})

//SAVING TO LOCAL STORAGE
function saveData(){
    localStorage.setItem('myData', newListing.innerHTML)
    localStorage.setItem('myColor', bodyColor.style.backgroundColor)
}

//SHOWING LOCAL STORAGE DATA
function showData(){
    newListing.innerHTML = localStorage.getItem('myData')
    bodyColor.style.backgroundColor = localStorage.getItem('myColor')
}
showData()