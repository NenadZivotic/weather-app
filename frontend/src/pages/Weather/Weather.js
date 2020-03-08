import React, { useState, Fragment } from "react";
import Search from "../../components/Search/Search";
import {
  getCountryName,
  roundNums,
  getCurrentDate
} from "../../components/UI/Helpers/Helpers";
import Button from "../../components/UI/Button/Button";

import Styles from "./Weather.module.css";

const Weather = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [disabled, setDisabled] = useState("");
  const [invalid, setInvalid] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("user");
    props.history.push("/");
  };

  const search = e => {
    e.preventDefault();
    fetch(`/api/weather/${query}`, setDisabled("disabled"))
      .then(res => res.json())
      .then(result => {
        setQuery("");
        setWeather(result);
        setDisabled("");
      })
      .catch(error => {
        if (
          error.message === "Unexpected token < in JSON at position 0" ||
          error.message === "Unexpected end of JSON input"
        ) {
          setInvalid("Please provide valid city name for search...");
          setTimeout(() => {
            setDisabled("");
            setInvalid("");
          }, 2500);
        }
      });
  };

  return (
    <Fragment>
      <div className={Styles.container}>
        <Button text="Logout" onClick={logoutHandler} />
        <Search
          onSearch={e => setQuery(e.target.value)}
          value={query}
          search={search}
          disabled={disabled}
        />
        <div>
          {typeof weather.main !== "undefined" ? (
            <div style={invalid ? { display: "none" } : null}>
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
      <div className={Styles.invalid}>{invalid}</div>
    </Fragment>
  );
};

export default Weather;
