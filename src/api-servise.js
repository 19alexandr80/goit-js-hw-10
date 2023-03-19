export default function fetchCountry() {
  return fetch(
    'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
  ).then(res => {
    if (!res.ok) {
      console.log(res.status);
      throw new Error(res.status);
    }
    return res.json();
  });
}
// export default { fetchCountry };
