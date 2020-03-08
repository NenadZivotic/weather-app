import React from "react";

import Styles from "./Search.module.css";

import Button from "../UI/Button/Button";

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
        <Button disabled={props.disabled} text="Search" />
      </form>
    </div>
  );
}
