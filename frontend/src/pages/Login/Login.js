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
    loginError: false,
    noResponse: false
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
          localStorage.setItem("user", this.state.userName);
          this.setState({ isLoggedIn: true });
          this.props.history.push("/api/weather");
        }
      })
      .catch(err => {
        if (err.message === "Request failed with status code 500") {
          return this.setState({ noResponse: true });
        }
        this.setState({ loginError: true });
        setTimeout(() => {
          this.setState({ loginError: false });
        }, 2500);
      });
    e.preventDefault();
  };

  render() {
    return this.state.noResponse ? (
      <div className={Styles.noResponse}>
        <h1>Server is down</h1>
      </div>
    ) : (
      <main className={Styles.main}>
        <h1 className={Styles.title}>Welcome to Weather App!</h1>
        <div
          className={Styles.image}
          style={{
            backgroundImage: "../../assets/weather1.jpg",
            width: "410px",
            height: "200px",
            position: "absolute"
          }}
        ></div>
        <h3 className={Styles.subtitle}>
          Please Login to start using the App!
        </h3>
        <div className={Styles.layout}></div>
        <form onSubmit={this.handleSubmit} className={Styles.loginForm}>
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
