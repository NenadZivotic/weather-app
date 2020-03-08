import React, { useState, Fragment } from "react";
import Search from "../../components/Search/Search";
import {
  getCountryName,
  roundNums,
  getCurrentDate
} from "../../components/UI/Helpers/Helpers";
import Button from "../../components/UI/Button/Button";

import Styles from "./Weather.module.css";

let result = "";

const Weather = props => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [disabled, setDisabled] = useState("");
  const [invalid, setInvalid] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("data");
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
        let data = localStorage.setItem("data", JSON.stringify(result));
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
        <Button
          classname={Styles.logout}
          text="Logout"
          onClick={logoutHandler}
        />
        <Search
          onSearch={e => setQuery(e.target.value)}
          value={query}
          search={search}
          disabled={disabled}
        />
        <div>
          {
            ((result = JSON.parse(localStorage.getItem("data"))),
            result ? (
              <div style={invalid ? { display: "none" } : null}>
                <div className={Styles.miniContainer}>
                  <h1 className={Styles.headings}>Date: </h1>
                  <p>{getCurrentDate(new Date())}</p>
                  <h1 className={Styles.headings}>Country: </h1>{" "}
                  <p>{getCountryName(result.sys.country)}</p>
                  <h1 className={Styles.headings}>City: </h1>{" "}
                  <p>{result.name}</p>
                  <h1 className={Styles.headings}>Temperature: </h1>
                  <p>{roundNums(result.main.temp)}</p>
                  <h1 className={Styles.headings}>Feels like: </h1>{" "}
                  <p>{roundNums(result.main.feels_like)}</p>
                  <h1 className={Styles.headings}>Min temperature: </h1>
                  <p>{roundNums(result.main.temp_min)}</p>
                  <h1 className={Styles.headings}>Humidity: </h1>{" "}
                  <p>{result.main.humidity}%</p>
                </div>
              </div>
            ) : typeof weather.main !== "undefined" ? (
              <div style={invalid ? { display: "none" } : null}>
                <div className={Styles.miniContainer}>
                  <h1 className={Styles.headings}>Date: </h1>
                  <p>{getCurrentDate(new Date())}</p>
                  <h1 className={Styles.headings}>Country: </h1>{" "}
                  <p>{getCountryName(weather.sys.country)}</p>
                  <h1 className={Styles.headings}>City: </h1>{" "}
                  <p>{weather.name}</p>
                  <h1 className={Styles.headings}>Temperature: </h1>
                  <p>{roundNums(weather.main.temp)}</p>
                  <h1 className={Styles.headings}>Feels like: </h1>{" "}
                  <p>{roundNums(weather.main.feels_like)}</p>
                  <h1 className={Styles.headings}>Min temperature: </h1>
                  <p>{roundNums(weather.main.temp_min)}</p>
                  <h1 className={Styles.headings}>Humidity: </h1>{" "}
                  <p>{weather.main.humidity}%</p>
                </div>
              </div>
            ) : (
              ""
            ))
          }
        </div>
      </div>
      <div className={Styles.invalid}>{invalid}</div>
    </Fragment>
  );
};

export default Weather;
