
let searchable = [
    '<a href="search.html" target = "_blank" style="text-decoration: none">Elastic</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">PHP</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Something about CSS</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">How to code</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Javascript</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Coding</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Check Admission Status</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Students Login</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">FPASU payments</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">Online polls</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">FPASU President</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">FPASU General Secretary</a>',
    '<a href="search.html" target = "_blank" style="text-decoration: none">FPASU P.R.O</a>',
    '<a href="agric-tech.html" target = "_blank" style="text-decoration: none">Agricultural Technology</a>',
    '<a href="Abesta.html" target = "_blank" style="text-decoration: none">Agricultural and Bio-Enviromental Engineering</a>',
    '<a href="accountancy.html" target = "_blank" style="text-decoration: none">accountancy</a>',
    '<a href="EEE.html" target = "_blank" style="text-decoration: none">Electrical Electronic Engineering</a>',
    '<a href="glass-ceramic.html" target = "_blank" style="text-decoration: none">Glass and Ceramic</a>',
    '<a href="Architectural.html" target = "_blank" style="text-decoration: none">Architectural</a>',
    '<a href="art-industrial.html" target = "_blank" style="text-decoration: none">Art and Industrial design</a>',
    '<a href="banking-finance.html" target = "_blank" style="text-decoration: none">Banking and Finance</a>',
    '<a href="building-tech.html" target = "_blank" style="text-decoration: none">Building Technology</a>',
    '<a href="business-admin.html" target = "_blank" style="text-decoration: none">Business Administration</a>',
    '<a href="civil.html" target = "_blank" style="text-decoration: none">Civil Engineering</a>',
    '<a href="computer-studies.html" target = "_blank" style="text-decoration: none">Computer Studies</a>',
    '<a href="estate-management.html" target = "_blank" style="text-decoration: none">Estate Management</a>',
    '<a href="fish-tech.html" target = "_blank" style="text-decoration: none">Fisheries Technology</a>',
    '<a href="food-tech.html" target = "_blank" style="text-decoration: none">Food Technology</a>',
    '<a href="glass-ceramic.html" target = "_blank" style="text-decoration: none">Glass and Ceramics</a>',
    '<a href="horticulture.html" target = "_blank" style="text-decoration: none">Horticulture</a>',
    '<a href="marketing.html" target = "_blank" style="text-decoration: none">Marketing</a>',
    '<a href="mass-com.html" target = "_blank" style="text-decoration: none">Mass Communication</a>',
    '<a href="math-statistics.html" target = "_blank" style="text-decoration: none">Math and Statistics</a>',
    '<a href="mpret.html" target = "_blank" style="text-decoration: none">Mineral and Pretroleum Technology</a>',
    '<a href="OTM.html" target = "_blank" style="text-decoration: none">Office Technology Management</a>',
    '<a href="purchasing.html" target = "_blank" style="text-decoration: none">Purchasing and Supply</a>',
    '<a href="quantity-surveying.html" target = "_blank" style="text-decoration: none">Quantity Surveying</a>',
    '<a href="science-technology.html" target = "_blank" style="text-decoration: none">Science Lab Technology</a>',
    '<a href="surveyi-gioinformat.html" target = "_blank" style="text-decoration: none">Surveying and Geo-Informatics</a>',
    '<a href="taxation.html" target = "_blank" style="text-decoration: none">Taxation</a>',
    '<a href="Urban-region.html" target = "_blank" style="text-decoration: none">Urban and Regional Planning</a>',
    '<a href="mechanical.html" target = "_blank" style="text-decoration: none">Mechanical Engineering</a>',
    '<a href="#.html" target = "_blank" style="text-decoration: none">The Rector</a>',
    '<a href="the-citadel.html" target = "_blank" style="text-decoration: none">The Citadel</a>',
    '<a href="marketPlace.html" target = "_blank" style="text-decoration: none">Market Place</a>',
    'Some other item',
    `Agbebi`
  ];

//   searchable.style.color = black;
  
  const searchInput = document.getElementById('search');
  const searchWrapper = document.querySelector('.wrapper');
  const resultsWrapper = document.querySelector('.results');
  
  searchInput.addEventListener('keyup', () => {
    let results = [];
    let input = searchInput.value;
    if (input.length) {
      results = searchable.filter((item) => {
        return item.toLowerCase().includes(input.toLowerCase());
      });
    }
    renderResults(results);
  });
  
  function renderResults(results) {
    if (!results.length) {
      return searchWrapper.classList.remove('show');
    }
  
    const content = results
      .map((item) => {
        return `<li>${item}</li>`;
      })
      .join('');
  
    searchWrapper.classList.add('show');
    resultsWrapper.innerHTML = `<ul>${content}</ul>`;
  }


//   SELECTING SCHOOL AND DEPARTMENT




let School = [
    `Agriculture`,
    `Business`,
    `Engineering`,
    `Enviromental`,
    `Science`
];

let Business = [
    `Accountancy`,
    `Banking and Finance`,
    `Business Administration and Management`,
    `Marketing`,
    `Mass Communcation`,
    `Office Technology and Management`,
    `Purchasing and Supply`,
    `Taxation`,
]

let  Agriculture = [
    `Agricultural Technology`,
    `Fisheries Technology`,
    `Horticultural Technology`,

];

let Engineering =[
    `Agricultural and Bio-Enviromental Engineering`,
    `Civil Engineering Technology`,
    'Electrical Elecctronic Engineering',
    `Mechanical Engineering Technology`,
    `Mineral and Petroleum Resources Engineering Technology`
];
let Enviromental =[
    `Architectural Technology`,
    `Building Technology`,
    'Estate Management',
    `Quantity Surveying`,
    `Surveying and Geoinformatics`,
    `Urban and regional planning`
];

let Science =[
    'Arts and Industrial Design',
    `Computer Science`,
    `Food Technology`,
    `Glass and Ceramic Technology`,
    `Math and Statistics`,
    `Science Technology`,
];

let slct1 = document.getElementById("slct1");
let slct2 = document.getElementById("slct2");

School.forEach(function addSchool(item){
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    slct1.appendChild(option);
});

slct1.onchange = function(){
    slct2.innerHTML = "<option></option>";
    if (this.value == "Agriculture"){
        addToSlct2(Agriculture);
    }
    if (this.value == "Business"){
        addToSlct2(Business);
    }
    if (this.value == "Engineering"){
        addToSlct2(Engineering);
    }
    if (this.value == "Science"){
        addToSlct2(Science);
    }
    if (this.value == "Enviromental"){
        addToSlct2(Enviromental);
    }
}

function addToSlct2(arr) {
    arr.forEach(function (item){
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        slct2.appendChild(option);
    })
};

let selectSubmitBtn = document.getElementById("selectSubmitBtn");

selectSubmitBtn.addEventListener("click", function(){

    let selectOption1 = slct1.value;
    let selectOption2 = slct2.value;

    if (selectOption1 === "Business" && selectOption2 === "Accountancy") {
        window.location.href = "accountancy.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Banking and Finance") {
        window.location.href = "banking-finance.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Business Administration and Management") {
        window.location.href = "business-admin.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Marketing") {
        window.location.href = "Marketing.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Mass Communcation") {
        window.location.href = "mass-com.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Office Technology and Management") {
        window.location.href = "OTM.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Purchasing and Supply") {
        window.location.href = "Purchasing.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Taxation") {
        window.location.href = "taxation.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Agricultural Technology") {
        window.location.href = "agric-tech.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Fisheries Technology") {
        window.location.href = "fish-tech.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Horticultural Technology") {
        window.location.href = "horticulture.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Architectural Technology") {
        window.location.href = "Architectural.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Building Technology") {
        window.location.href = "building-tech.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Estate Management") {
        window.location.href = "estate-management.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Quantity Surveying") {
        window.location.href = "quantity-surveying.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Surveying and Geoinformatics") {
        window.location.href = "surveyi-gioinformat.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Urban and regional planning") {
        window.location.href = "Urban-region.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Agricultural and Bio-Enviromental Engineering") {
        window.location.href = "Abesta.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Civil Engineering Technology") {
        window.location.href = "civil.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Electrical Elecctronic Engineering") {
        window.location.href = "EEE.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Mechanical Engineering Technology") {
        window.location.href = "Mechanical.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Mineral and Petroleum Resources Engineering Technology") {
        window.location.href = "mpret.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Arts and Industrial Design") {
        window.location.href = "art-industrial.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Computer Science") {
        window.location.href = "computer-studies.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Food Technology") {
        window.location.href = "food-tech.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Glass and Ceramic Technology") {
        window.location.href = "glass-ceramic.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Science Technology") {
        window.location.href = "science-technology.html"
    }else{
        console.log("it's not done")
    }
});
