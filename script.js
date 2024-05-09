const form = document.getElementById('weather-form');
const weatherInfoDiv = document.getElementById('weather-info');

const API_KEY = '8c3d2d6ef1177ef89b21feafcb7f6f1a';  // Replace with your actual API key

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const cityName = document.getElementById('city-name').value;

  // Make the API call with Axios
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
      const data = response.data;
      console.log(data); // For debugging

      if (data.cod === 200) {
        const html = `
          <div>
            <h2>${data.name}</h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">
            <p>Temperature: ${data.main.temp.toFixed(1)}°C</p>
            <p>Feels like: ${data.main.feels_like.toFixed(1)}°C</p>
            <p>Weather: ${data.weather[0].main}</p>
          </div>
        `;
        weatherInfoDiv.innerHTML = html;
      } else {
        weatherInfoDiv.innerHTML = "<p>City not found.</p>";
      }
    })
    .catch(function (error) {
      console.error(error);
      weatherInfoDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
    });
});
