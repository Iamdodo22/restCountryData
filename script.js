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
const btnBack = document.querySelector('.btn-back');

const homePage = document.querySelector('.page-1');
const page2 = document.querySelector('.page-2');

const themeCon = document.querySelector('.themeCon');
const lightTheme = document.querySelector('.light');
const darkTheme = document.querySelector('.dark');

const API_URL = "https://restcountries.com/v3.1/";

////////////////////////////////////////////////////////////////////////////////

//settings for theme
let currentTheme = 1;

const handleTheme = function(currentTheme) {
    darkTheme.classList.toggle('invisible');
    lightTheme.classList.toggle('invisible');
    document.documentElement.style.setProperty('--color-text', `var(--color-text${currentTheme})`);
    document.documentElement.style.setProperty('--color-bg', `var(--color-bg${currentTheme})`);
    document.documentElement.style.setProperty('--color-highlight', `var(--color-highlight${currentTheme})`);
}

themeCon.addEventListener('click', function(e){
    const btn = e.target.closest('.theme');
    if(!btn)return;
    if(btn.classList.contains('light')){
        currentTheme = 1;
       
    }

    if(btn.classList.contains('dark')){
        currentTheme = 2;
        
    }
    handleTheme(currentTheme);
    const setTheme = localStorage.setItem('theme', `${currentTheme}`);
    
})

const init = function() {
    const getTheme = localStorage.getItem('theme');

    if(getTheme === '2') {
        darkTheme.classList.toggle('invisible');
        lightTheme.classList.toggle('invisible');
    }
    document.documentElement.style.setProperty('--color-text', `var(--color-text${getTheme})`);
    document.documentElement.style.setProperty('--color-bg', `var(--color-bg${getTheme})`);
    document.documentElement.style.setProperty('--color-highlight', `var(--color-highlight${getTheme})`);
}
init();

// functions...


function change() {
    regionOptionsCon.classList.toggle('invisible');
    arrowIcon.classList.toggle('rotate-180');
}

selectCon.addEventListener('click', function() {
    change();
})



const renderCountryClick = function(data) {
   const markup = `
            <div class="displayClick grid grid-cols-2 max-lg:grid-cols-1 gap-10 items-center mt-8">
                <img src="${data.flags.svg}" 
                alt="${data.name.common}"
                class="w-full ">

                <span class="flex flex-col gap-8">
                    <div class="flex flex-col justify-between">
                        <h2 class="mb-4 font-bold">${data.name.common}</h2>
                        <span class="flex justify-between max-lg:flex-col max-lg:gap-4">
                            <ul>
                                <li class="font-semibold">Native Name: <span class="font-normal">${Object.values(data.name.nativeName)[0].common} </span></li>
                                <li class="font-semibold">population: <span class="font-normal">${data.population}</span></li>
                                <li class="font-semibold">Region: <span class="font-normal">${data.region}</span></li>
                                <li class="font-semibold">Sub Region: <span class="font-normal">${data.subregion}</span></li>
                                <li class="font-semibold">Capital: <span class="font-normal">${data.capital}</span></li>
                            </ul>
                            <ul>
                                <li class="font-semibold">Top Level Domain: <span class="font-normal">${data.tld[0]}</span></li>
                                <li class="font-semibold">Currencies: <span class="font-normal">${Object.values(data.currencies)[0].name}</span></li>
                                <li class="font-semibold">Languages: <span class="font-normal">${Object.values(data.languages)}</span></li>
                            </ul>
                        </span>
                    </div>
                    <div class="flex gap-4 max-lg:flex-col items-center max-lg:items-start">
                        <h3 class="con font-semibold mb-4">Border Countries:</h3>
                        <ul class="flex flex-wrap gap-2">
                            ${
                                data.borders?.map(con =>{
                                return`
                                    <li class="px-4 py-1 rounded-md shadow font-semibold">${con}</li>
                                `
                            }).join('')??''}
                        </ul>
                    </div>
                </span>
            </div> 
    `   

        btnBack.insertAdjacentHTML('afterend', markup);
}

const renderCountrySearch = function(data) {
    const markup = `
    <div class="country shadow-md rounded-md cursor-pointer bg-pWhite">
            <img src="${data.flags.svg}"
            alt="${data.name.common}"
            class="w-full h-32">
            <ul class="p-4 pb-8">
                <li class="font-bold pb-4">${data.name.common}</li>
                <li class="font-semibold">Population: <span class="font-normal">${data.population}</span> </li>
                <li class="font-semibold">Region: <span class="font-normal">${data.region}</span></li>
                <li class="font-semibold">Capital: <span class="font-normal">${[data.capital]}</span></li>
            </ul>
        </div>
    `

    countryCon.insertAdjacentHTML('afterbegin', markup);
}

const renderError = function() {
    countryCon.innerHTML = 'not found!, search for another.'
}


// data handling //////////////////////////////////

const loadCountrySearch = async function(country) {
    try{
       const res = await fetch(`${API_URL}name/${country}`);
       const [data] = await res.json()

       renderCountrySearch(data);

    }
    catch(err){
        renderError();
    }
} 

const loadCountryClick = async function(country) {
    try{
       const res = await fetch(`${API_URL}name/${country}`);
       const [data] = await res.json()

       renderCountryClick(data);

    }
    catch(err){
        renderError();
    }
}

const loadCountryRegion = async function(region) {
    try{
        const res = await fetch(`${API_URL}region/${region}`);
        const data = await res.json();
        countryCon.innerHTML = ''
        data.forEach(function(con) {
            
            const markup = `
            <div class="country shadow-md rounded-md cursor-pointer bg-pWhite">
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

        })
        
       
     }
     catch(err){
         renderError()
     }
}


//event handler/////////////////////////////////////////

regionOptions.forEach(function(opt) {
    opt.addEventListener('click', function() {
        regionSelect.textContent = this.textContent;
        loadCountryRegion(`${regionSelect.textContent}`);
    })
})

btnSearch.addEventListener('submit', function(e) {
    e.preventDefault();
    const {value} = inputSearch;
    countryCon.innerHTML = '';
    loadCountrySearch(value)
    inputSearch.value = '';
    inputSearch.blur()
})

 countryCon.addEventListener('click', function(el) {
    const country = el.target.closest('.country');
    if(!country) return;
    const countryName = country.querySelector('ul li').textContent;
    homePage.classList.toggle('invisible');
    page2.classList.toggle('hidden');
    loadCountryClick(countryName);
})

btnBack.addEventListener('click', function(e) {
    homePage.classList.toggle('invisible');
    page2.classList.toggle('hidden');
    document.querySelector('.displayClick').innerHTML = '';
})