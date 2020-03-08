import React from "react";

import Styles from "./Search.module.css";

import Button from "../UI/Button/Button";

const deleteFromStorage = () => {
  localStorage.removeItem("data");
};

export default function Search(props) {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Search for your city: </h1>
      <form onSubmit={props.search}>
        <input
          className={Styles.myInput}
          type="text"
          name="city"
          placeholder="Type in your city"
          onChange={props.onSearch}
          value={props.value}
        />
        <Button
          classname={Styles.search}
          disabled={props.disabled}
          text="Search"
          onClick={deleteFromStorage}
        />
      </form>
    </div>
  );
}
