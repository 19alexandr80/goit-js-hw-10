import Notiflix from 'notiflix';
import { fetchCountry } from './api-servise';
import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const userInput = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
userInput.addEventListener('input', debounce(onUserInput, DEBOUNCE_DELAY));
function onUserInput(e) {
  countryInfo.innerHTML = '';
  // :):):):):):)
  if (e.target.value.trim() === '') {
    e.target.value = '';
  }
  // :):):):):):)
  if (!e.target.value) {
    return;
  }
  fetchCountry()
    .then(data => {
      const countryFilter = data.filter(f => {
        return f.name.common
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase());
      });
      onCreatingInterfase(countryFilter);
    })
    .catch(err => {
      console.log(err);
    });
}
function onCreatingInterfase(countryFilter) {
  if (1 < countryFilter.length && countryFilter.length > 11) {
    onRequestRequest();
  } else
    switch (countryFilter.length) {
      case 1:
        onDataCountry(countryFilter);
        break;
      case 0:
        onCountryNotFound();
        break;
      default:
        onCoincidentCountry(countryFilter);
        break;
    }
}
function onRequestRequest() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
function onCountryNotFound() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function onCoincidentCountry(params) {
  const tablo = params
    .map(
      param => `<div><img src="${param.flags.svg}" alt="Прапор" width="30">
      <span style="color:#10174A; font-size:26px; text-shadow: 1px 1px 2px #12855D, 0 0 1em blue, 0 0 0.2em blue;">  ${param.name.common}</span></div>`
    )
    .join('');
  countryInfo.insertAdjacentHTML('beforeEnd', tablo);
}
function onDataCountry(params) {
  const bablo = `<img src="${params[0].flags.svg}" alt="Прапор" width="90">
  <h2>${params[0].name.official}</h2>
  <p><span style="color:#000085; font-weight: bold;">capital</span>: ${
    params[0].capital
  }</p>
  <p><span style="color:#000085; font-weight: bold;">population</span>: ${
    params[0].population
  }</p>
  <p><span style="color:#000085; font-weight: bold;">languages</span>: ${Object.values(
    params[0].languages
  ).join(' , ')}</p>`;
  countryInfo.insertAdjacentHTML('beforeEnd', bablo);
}
// Ukraine;
