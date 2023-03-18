function fetchCountry() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(res => {
    return res.json();
  });
}
export default { fetchCountry };
