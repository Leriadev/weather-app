import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import moment from "moment";
import "./App.css";
import CurrentWeather from "./components/CuttentWeather/CurrentWeather";
import Search from "./components/Search/Search";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const formatLocalTime = (secs, zone, format) => {
    return moment(secs*1000).utcOffset(zone/3600).format(format)
  }
  const handleOnSearchChange = (searchData) => {
    // console.log(searchData.value.split(' ')[0], searchData.value.split(' ')[1])
    let coordinates = searchData.value.split(' ')
    return fetch(
      `${WEATHER_API_URL}?lat=${coordinates[0]}&lon=${coordinates[1]}&appId=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrentWeather({desc: response.weather[0].description,
          icon: response.weather[0].icon,
          feelsLike: response.main.feels_like,
          temp: response.main.temp,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          maxTemp: response.main.temp_max,
          minTemp: response.main.temp_min,
          sunrise: formatLocalTime(response.sys.sunrise, response.timezone, "h:mm a"),
          sunset: formatLocalTime(response.sys.sunset, response.timezone, "h:mm a"),
          localTime: formatLocalTime(response.dt, response.timezone, "MMMM Do | [Local time] h:mm a"),
          city: searchData.label.split(', ')[0]})
          console.log(response)
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
