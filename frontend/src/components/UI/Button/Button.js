import React from "react";

import Styles from "./Button.module.css";

export default function Button(props) {
  return (
    <div>
      <button className={Styles.myButton}>{props.text}</button>
    </div>
  );
}
