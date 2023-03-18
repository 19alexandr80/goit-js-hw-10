import Notiflix from 'notiflix';
import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const userInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
userInput.addEventListener('input', debounce(onUserInput, DEBOUNCE_DELAY));
function onUserInput(e) {
  countryInfo.innerHTML = '';
  if (!e.target.value) {
    return;
  }
  fetchCountri()
    .then(data => {
      const countryFilter = data.filter(fdf => {
        return fdf.name.common
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim());
      });
      onCrietDispleu(countryFilter);
    })
    .catch(err => {
      console.log(err);
    });
}

function fetchCountri() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(res => {
    return res.json();
  });
}
function onCrietDispleu(countryFilter) {
  if (1 < countryFilter.length && countryFilter.length > 11) {
    onDataFaund();
  } else {
    switch (countryFilter.length) {
      case 1:
        onDataCountry(countryFilter);
        break;
      case 0:
        onDataNotFaund();
        break;
      default:
        onInterfase(countryFilter);
        break;
    }
  }
}
function onDataFaund() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function onDataNotFaund() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function onInterfase(params) {
  const tablo = params
    .map(param => {
      return `<div><img src="${param.flags.svg}" alt="Прапор" width="30">
      <span style="color:red; font-size:26px;">  ${param.name.common}</span></div>`;
    })
    .join('');
  countryInfo.insertAdjacentHTML('beforeEnd', tablo);
}
function onDataCountry(params) {
  countryInfo.innerHTML = '';
  const bablo = `<img src="${params[0].flags.svg}" alt="Прапор" width="90">
  <h2>${params[0].name.common}</h2>
  <p>capital: ${params[0].capital[0]}</p>
  <p>population: ${params[0].population}</p>
  <p>languages: ${Object.values(params[0].languages)}</p>`;
  countryInfo.insertAdjacentHTML('beforeEnd', bablo);
}
// Ukraine;
