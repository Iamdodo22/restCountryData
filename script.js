"use strict";
// varaibles...
const btnSearch = document.querySelector('.submit-query');
const inputSearch = document.querySelector('input[type="search"]');
const countryCon = document.querySelector('.country-con');

const selectCon = document.querySelector('.sel-con');
const arrowIcon = document.querySelector('.arrow-icon');
const regionSelect = document.querySelector('.select');
const regionOptionsCon = document.querySelector('.ul');
const regionOptions = Array.from(document.querySelectorAll('.ul li'));

const API_URL = "https://restcountries.com/v3.1/";

function change() {
    regionOptionsCon.classList.toggle('invisible');
    arrowIcon.classList.toggle('rotate-180');
}

selectCon.addEventListener('click', function() {
    change();
})

regionOptions.forEach(function(opt) {
    opt.addEventListener('click', function() {
        regionSelect.textContent = this.textContent;
        loadCountryRegion(`${regionSelect.textContent}`);
    })
})

const renderCountryClick = function(data) {
    markup = `
            <div class="grid autofill gap-8 items-center">
                <img src="${data.flags.svg}" 
                alt="${data.name.common}"
                class="w-[200px] h-40">

                <span class="flex flex-col gap-8">
                    <div class="flex flex-col justify-between">
                        <h2>${data.name.common}</h2>
                        <span class="flex justify-between">
                            <ul>
                                <li class="font-semibold">Native Name: <span class="font-normal"></span></li>
                                <li class="font-semibold">population: <span class="font-normal"></span></li>
                                <li class="font-semibold">Region: <span class="font-normal"></span></li>
                                <li class="font-semibold">Sub Region: <span class="font-normal"></span></li>
                                <li class="font-semibold">Capital: <span class="font-normal"></span></li>
                            </ul>
                            <ul>
                                <li class="font-semibold">Top Level Domain: <span class="font-normal"></span></li>
                                <li class="font-semibold">Currencies: <span class="font-normal"></span></li>
                                <li class="font-semibold">Language: <span class="font-normal"></span></li>
                            </ul>
                        </span>
                    </div>
                    <div class="flex gap-4 items-center">
                        <h3>Border Countries:</h3>
                        <ul class="flex gap-2">
                            <li class="px-3 py-1 rounded-md shadow">france</li>
                        </ul>
                    </div>
                </span>
            </div> 
    `
}

// functions...
// const renderCountry = function(data) {
//     const markup = `
//     <div class="shadow-md ">
//     <img src="${data.flags.png}"
//      alt="${data.name.common}"
//      class="w-full h-32">
//      <ul class="p-4 pb-8">
//         <li class="font-bold pb-4">${data.name.common}</li>
//         <li>Population: ${data.population}</li>
//         <li>Region: ${data.region}</li>
//         <li>Capital: ${data.capital[0]}</li>
//      </ul>
// </div>
//     `

//     countryCon.insertAdjacentHTML('afterbegin', markup);
// }

const renderError = function() {
    countryCon.innerHTML = 'not found!, search for another.'
}


// data handling
// const loadCountryName = async function(country) {
//     try{
//        const res = await fetch(`${API_URL}name/${country}`);
//        const [data] = await res.json()
//        console.log(data)

//        renderCountry(data)

//     }
//     catch(err){
//         renderError()
//     }
// }

let clickedCountry;
const loadCountryRegion = async function(region) {
    try{
        const res = await fetch(`${API_URL}region/${region}`);
        const data = await res.json();
        data.forEach(function(con) {
            const markup = `
            <div class="country shadow-md rounded-md">
            <img src="${con.flags.svg}"
            alt="${con.name.common}"
            class="w-full h-32">
            <ul class="p-4 pb-8">
                <li class="font-bold pb-4">${con.name.common}</li>
                <li class="font-semibold">Population: <span class="font-normal">${con.population}</span> </li>
                <li class="font-semibold">Region: <span class="font-normal">${con.region}</span></li>
                <li class="font-semibold">Capital: <span class="font-normal">${[con.capital]}</span></li>
            </ul>
        </div>
            `
            change();
            countryCon.insertAdjacentHTML('afterbegin', markup);

            countryCon.addEventListener('click', function(el) {
                const country = el.target.closest('.country');
                if(!country) return;
                // console.log(country)
                // clickedCountry = country;
                // console.log(clickedCountry);
            })
        })
 
     }
     catch(err){
         renderError()
     }
}


//event handler
btnSearch.addEventListener('submit', function(e) {
    e.preventDefault();
    const {value} = inputSearch;
    loadCountryName(value);
})