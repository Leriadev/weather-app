import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import "./App.css";
import CurrentWeather from "./components/CuttentWeather/CurrentWeather";
import Search from "./components/Search/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const handleOnSearchChange = (searchData) => {
    // console.log(searchData.value.split(' ')[0], searchData.value.split(' ')[1])
    let coordinates = searchData.value.split(' ')
    return fetch(
      `${WEATHER_API_URL}?lat=${coordinates[0]}&lon=${coordinates[1]}&appId=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrentWeather({weatherDesc: response.weather[0].description,
          weatherIcon: response.weather[0].icon,
          weatherFeelsLike: response.main.feels_like,
          weatherTemp: response.main.temp,
          weatherHumidity: response.main.humidity,
          weatherCity: searchData.label.split(', ')[0]})
        })
        .catch((err) => console.error(err));
      };
  return (
    <div className="container">
      <h1>Weather App</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather currentWeather = {currentWeather}/>}
    </div>
  );
}

export default App;
