
let searchable = [
    '<a href="SUG.html">FPASU President</a>',
    '<a href="SUG.html">FPASU General Secretary</a>',
    '<a href="SUG.html">FPASU P.R.O</a>',
    '<a href="../departments/agric-tech.html">Agricultural Technology</a>',
    '<a href="../departments/abesta.html">Agricultural and Bio-Enviromental Engineering</a>',
    '<a href="../departments/accountancy.html">accountancy</a>',
    '<a href="../departments/EEE.html">Electrical Electronic Engineering</a>',
    '<a href="../departments/glass-ceramic.html">Glass and Ceramic</a>',
    '<a href="../departments/Architectural.html">Architectural</a>',
    '<a href="../departments/art-industrial.html">Art and Industrial design</a>',
    '<a href="../departments/banking-finance.html">Banking and Finance</a>',
    '<a href="../departments/building-tech.html">Building Technology</a>',
    '<a href="../departments/business-admin.html">Business Administration</a>',
    '<a href="../departments/civil.html">Civil Engineering</a>',
    '<a href="../departments/computer-studies.html">Computer Studies</a>',
    '<a href="../departments/estate-management.html">Estate Management</a>',
    '<a href="../departments/fish-tech.html">Fisheries Technology</a>',
    '<a href="../departments/food-tech.html">Food Technology</a>',
    '<a href="../departments/glass-ceramic.html">Glass and Ceramics</a>',
    '<a href="../departments/horticulture.html">Horticulture</a>',
    '<a href="../departments/marketing.html">Marketing</a>',
    '<a href="../departments/mass-com.html">Mass Communication</a>',
    '<a href="../departments/math-statistics.html">Math and Statistics</a>',
    '<a href="../departments/mpret.html">Mineral and Pretroleum Technology</a>',
    '<a href="../departments/OTM.html">Office Technology Management</a>',
    '<a href="../departments/purchasing.html">Purchasing and Supply</a>',
    '<a href="../departments/quantity-surveying.html">Quantity Surveying</a>',
    '<a href="../departments/science-technology.html">Science Lab Technology</a>',
    '<a href="../departments/surveyi-gioinformat.html">Surveying and Geo-Informatics</a>',
    '<a href="../departments/taxation.html">Taxation</a>',
    '<a href="../departments/Urban-region.html">Urban and Regional Planning</a>',
    '<a href="../departments/mechanical.html">Mechanical Engineering</a>',
    '<a href="#">The Rector</a>',
    '<a href="the-citadel.html">The Citadel</a>',
    '<a href="facultyPresident.html">Faculty President</a>',
    '<a href="tutorial.html">Tutorial</a>',
    '<a href="notes.html">notes</a>',
    '<a href="siwes.html">Siwes</a>',
    '<a href="catalogue.html">Siwes</a>',
    '<a href="chat.html">Siwes</a>',
    '<a href="hallResidence.html">Hall of Residence</a>',
    '<a href="departmentGovernor.html">Governor</a>',
    '<a href="departmentalPresident.html">Deparmental President</a>',
    '<a href="catalogue.html">Catalogue</a>',
    '<a href="FpasuBar.html">Fpasu Bar</a>',
    '<a href="../departments/marketPlace.html">Market Place</a>',
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
        window.location.href = "../departments/accountancy.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Banking and Finance") {
        window.location.href = "../departments/banking-finance.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Business Administration and Management") {
        window.location.href = "../departments/business-admin.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Marketing") {
        window.location.href = "../departments/Marketing.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Mass Communcation") {
        window.location.href = "../departments/mass-com.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Office Technology and Management") {
        window.location.href = "../departments/OTM.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Purchasing and Supply") {
        window.location.href = "../departments/Purchasing.html"
    }
    else if (selectOption1 === "Business" && selectOption2 === "Taxation") {
        window.location.href = "../departments/taxation.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Agricultural Technology") {
        window.location.href = "../departments/agric-tech.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Fisheries Technology") {
        window.location.href = "../departments/fish-tech.html"
    }
    else if (selectOption1 === "Agriculture" && selectOption2 === "Horticultural Technology") {
        window.location.href = "../departments/horticulture.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Architectural Technology") {
        window.location.href = "../departments/Architectural.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Building Technology") {
        window.location.href = "../departments/building-tech.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Estate Management") {
        window.location.href = "../departments/estate-management.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Quantity Surveying") {
        window.location.href = "../departments/quantity-surveying.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Surveying and Geoinformatics") {
        window.location.href = "../departments/surveyi-gioinformat.html"
    }
    else if (selectOption1 === "Enviromental" && selectOption2 === "Urban and regional planning") {
        window.location.href = "../departments/Urban-region.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Agricultural and Bio-Enviromental Engineering") {
        window.location.href = "../departments/abesta.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Civil Engineering Technology") {
        window.location.href = "../departments/civil.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Electrical Elecctronic Engineering") {
        window.location.href = "../departments/EEE.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Mechanical Engineering Technology") {
        window.location.href = "../departments/Mechanical.html"
    }
    else if (selectOption1 === "Engineering" && selectOption2 === "Mineral and Petroleum Resources Engineering Technology") {
        window.location.href = "../departments/mpret.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Arts and Industrial Design") {
        window.location.href = "../departments/art-industrial.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Computer Science") {
        window.location.href = "../departments/computer-studies.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Food Technology") {
        window.location.href = "../departments/food-tech.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Glass and Ceramic Technology") {
        window.location.href = "../departments/glass-ceramic.html"
    }
    else if (selectOption1 === "Science" && selectOption2 === "Science Technology") {
        window.location.href = "../departments/science-technology.html"
    }else{
        console.log("it's not done")
    }
});
