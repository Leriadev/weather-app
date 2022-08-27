import React from "react";
import style from "./CurrentWeather.module.css";

function CurrentWeather( {currentWeather} ) {
  return (
    <div className={style.currentWeather}>
      <h2 className={style.city}>{currentWeather.weatherCity}, {currentWeather.weatherDesc}</h2>
      <p className={style.temp}>{Math.round(currentWeather.weatherTemp)}°C</p>
      <img className={style.weatherIcon} src={`icons/${currentWeather.weatherIcon}.svg`} />
      <table className={style.weatherDesc}>
        <tbody>
          <tr>
            <td>Feels like</td>
            <td>{Math.round(currentWeather.weatherFeelsLike)}°C</td>
          </tr>
          <tr>
            <td>Wind</td>
            <td>2 m/s</td>
          </tr>
          <tr>
            <td>Humidity</td>
            <td>{currentWeather.weatherHumidity}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CurrentWeather;
