let API_KEY = "3a3fb4386c4a094f91b634540c0d0cc2";

//Setting finding by geolocation//

let fetchData = (position) => {
  let { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
};

let setWeatherData = (data) => {
  console.log(data);
  let weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity + "%",
    temperature: parseInt(data.main.temp) + "ºC",
    date: getDate(),
  };

  //Setting info to HTML//

  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });

  cleanUp();
};

//Cleaning loading content//

let cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");

  console.log("Container element:", container);
  console.log("Loader element:", loader);

  if (loader && container) {
    loader.style.display = "none";
    container.style.display = "flex";
  }
};

//Getting current Date//

let getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${date.getFullYear()}`;
};

let onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};
