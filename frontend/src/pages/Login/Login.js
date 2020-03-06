import React, { Component } from "react";
import Auth from "../../components/Auth/Auth";
import { withRouter } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Axios from "axios";

import Styles from "./Login.module.css";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    isLoggedIn: false,
    loginError: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    let user = JSON.stringify({
      userName: this.state.userName,
      password: this.state.password
    });
    Axios.post("/", user)
      .then(res => {
        if (res) {
          Auth.authenticate();
          this.setState({ isLoggedIn: true });
          this.props.history.push("/api/weather");
        }
      })
      .catch(err => {
        this.setState({ loginError: true });
      });
    e.preventDefault();
  };

  render() {
    return (
      <main className={Styles.main}>
        <h1 className={Styles.title}>Welcome to Weather App!</h1>
        <h3>Please Login to continue using the App!</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            className={Styles.myInput}
            type="email"
            name="userName"
            placeholder="Email"
            value={this.state.userName}
            onChange={this.handleChange}
            required
          />
          <input
            className={Styles.myInput}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            minLength="6"
            maxLength="100"
          />
          <Button text="Login" />
          {this.state.loginError ? (
            <h3 style={{ color: "red" }}>
              Please, provide valid credentials...
            </h3>
          ) : null}
        </form>
      </main>
    );
  }
}

export default withRouter(Login);
