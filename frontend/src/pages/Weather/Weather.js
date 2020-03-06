import React, { useState, Fragment } from "react";
import Search from "../../components/Search/Search";
import {
  getCountryName,
  roundNums,
  getCurrentDate
} from "../../components/UI/Helpers/Helpers";

import Styles from "./Weather.module.css";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e => {
    e.preventDefault();
    fetch(`/api/weather/${query}`)
      .then(res => res.json())
      .then(result => {
        setQuery("");
        setWeather(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className={Styles.container}>
        <Search
          onSearch={e => setQuery(e.target.value)}
          value={query}
          search={search}
        />
        <div>
          {typeof weather.main !== "undefined" ? (
            <div>
              <h1 className={Styles.headings}>Date: </h1>
              {getCurrentDate(new Date())}
              <h1 className={Styles.headings}>Country: </h1>{" "}
              {getCountryName(weather.sys.country)}
              <h1 className={Styles.headings}>City: </h1> {weather.name}
              <h1 className={Styles.headings}>Temperature: </h1>
              {roundNums(weather.main.temp)}
              <h1 className={Styles.headings}>Feels like: </h1>{" "}
              {roundNums(weather.main.feels_like)}
              <h1 className={Styles.headings}>Min temperature: </h1>
              {roundNums(weather.main.temp_min)}
              <h1 className={Styles.headings}>Humidity: </h1>{" "}
              {weather.main.humidity}%
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Weather;
