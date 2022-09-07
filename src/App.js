import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import moment from "moment";
import "./App.css";
import CurrentWeather from "./components/CuttentWeather/CurrentWeather";
import Search from "./components/Search/Search";
import Forecast from "./components/Forecast/Forecast";

export const WEEK_DAYS = [
  "Monday",
  "Tuersday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const dayInAWeek = (date) => {
  date = moment(date);
  let day = date.weekday();
  return day;
};
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const formatLocalTime = (secs, zone, format) => {
    return moment(secs * 1000)
      .utcOffset(zone / 3600)
      .format(format);
  };
  const handleOnSearchChange = (searchData) => {
    let coordinates = searchData.value.split(" ");
    let currentWeatherData = fetch(
      `${WEATHER_API_URL}/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appId=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => {
        setCurrentWeather({
          desc: response.weather[0].description,
          icon: response.weather[0].icon,
          feelsLike: response.main.feels_like,
          temp: response.main.temp,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed,
          maxTemp: response.main.temp_max,
          minTemp: response.main.temp_min,
          sunrise: formatLocalTime(
            response.sys.sunrise,
            response.timezone,
            "h:mm a"
          ),
          sunset: formatLocalTime(
            response.sys.sunset,
            response.timezone,
            "h:mm a"
          ),
          localTime: formatLocalTime(
            response.dt,
            response.timezone,
            "MMMM Do | [Local time] h:mm a"
          ),
          city: searchData.label.split(", ")[0],
        });
      })
      .catch((err) => console.error(err));

    let forecastData = fetch(
      `${WEATHER_API_URL}/forecast?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((response) => {
        let forecastArr = [
          [{ name: "Sunday" }],
          [{ name: "Monday" }],
          [{ name: "Tuersday" }],
          [{ name: "Wednesday" }],
          [{ name: "Thursday" }],
          [{ name: "Friday" }],
          [{ name: "Saturday" }],
        ];
        for (let i = 0; i < response.list.length; i++) {
          switch (WEEK_DAYS[dayInAWeek(response.list[i].dt_txt)]) {
            case "Sunday":
              forecastArr[0].push(response.list[i]);
              break;
            case "Monday":
              forecastArr[1].push(response.list[i]);
              break;
            case "Tuersday":
              forecastArr[2].push(response.list[i]);
              break;
            case "Wednesday":
              forecastArr[3].push(response.list[i]);
              break;
            case "Thursday":
              forecastArr[4].push(response.list[i]);
              break;
            case "Friday":
              forecastArr[5].push(response.list[i]);
              break;
            case "Saturday":
              forecastArr[6].push(response.list[i]);
              break;
            default:
          }
        }
        setForecast({ data: forecastArr });
      })
      .catch((err) => console.error(err));

    return currentWeatherData, forecastData;
  };
  return (
    <div className="container">
      <h1>Weather App</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather currentWeather={currentWeather} />}
      {forecast && <Forecast forecast={forecast} />}
    </div>
  );
}

export default App;
