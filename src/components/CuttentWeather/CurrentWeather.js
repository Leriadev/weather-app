import React from "react";
import style from "./CurrentWeather.module.css";

function CurrentWeather( {currentWeather} ) {
  return (
    <div className={style.currentWeather}>
      <p className={style.date}>{currentWeather.localTime}</p>
      <h2 className={style.city}>{currentWeather.city}, {currentWeather.desc}</h2>
      <p className={style.temp}>{Math.round(currentWeather.temp)}°C</p>
      <img className={style.weatherIcon} src={`icons/${currentWeather.icon}.svg`} />
      <table className={style.weatherDesc}>
        <tbody>
          <tr>
            <td>Feels like</td>
            <td>{Math.round(currentWeather.feelsLike)}°C</td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>{currentWeather.windSpeed} m/s</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{currentWeather.humidity}%</td>
          </tr>
        </tbody>
      </table>
      <div className={style.info}>
        <div className={style.infoCont}><img src="/icons/sunrise.png" /><p> {currentWeather.sunrise}</p></div>
        <div className={style.infoCont}><img src="/icons/sunset.png" /><p> {currentWeather.sunset}</p></div>
        <div className={style.infoCont}><img src="/icons/hot.png" /><p>{Math.round(currentWeather.maxTemp)}°C</p></div>
        <div className={style.infoCont}><img src="/icons/cold.png" /><p>{Math.round(currentWeather.minTemp)}°C</p></div>
      </div>
    </div>
  );
}

export default CurrentWeather;
