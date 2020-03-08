import React from "react";

import Styles from "./Button.module.css";

export default function Button(props) {
  return (
    <div className={props.classname}>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={Styles.myButton}
      >
        {props.text}
      </button>
    </div>
  );
}
