import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "../Auth/Auth";
import Weather from "../../pages/Weather/Weather";
import Login from "../../pages/Login/Login";
import Page404 from "../../pages/Page404/Page404";

const Router = props => (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute path="/api/weather" component={Weather} />
    <Route path="*" exact component={Page404} />
  </Switch>
);
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);
export default Router;
