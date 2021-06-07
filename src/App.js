import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Auth from "./screens/Auth";
import Register from "./screens/Register";
import Header from "./component/Header";
import Confirm from "./screens/Confirm";
import Footer from "./component/Footer";
import Main from "./screens/Main";
import Logout from "./screens/Logout";
import UserInfo from "./screens/UserInfo";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { client, clientSet } from "./utils/ApiConfig";
import { Container, Row, Col } from "react-bootstrap";
import { tokenData } from "./Apollo";
import { useReactiveVar } from "@apollo/client";

function App() {
  useEffect(client);

  console.log("APP");
  console.log(tokenData());
  return (
    <Container fluid>
      <Router>
        <Row>
          <Route
            path="*"
            component={(props) => {
              return <Header {...props} />;
            }}
          />
        </Row>
        <Row>
          <Switch>
            <Route
              path="/"
              component={(props) => {
                return <Main {...props} />;
              }}
              exact
            />

            <Route
              path="/login"
              component={(props) => {
                return <Login {...props} />;
              }}
            />
            <Route
              path="/logout"
              component={() => {
                return <Logout />;
              }}
            />
            <Route
              path="/register"
              component={(props) => {
                return <Register {...props} />;
              }}
            />
            <Route
              path="/user"
              component={(props) => {
                return <UserInfo {...props} />;
              }}
            />
            <Route
              path="/auth"
              component={(props) => {
                return <Auth {...props} />;
              }}
            ></Route>
            <Route
              path="/confirm-email"
              component={(props) => {
                return <Confirm {...props} />;
              }}
            ></Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Row>
        <Row style={{ borderTop: "1px solid gray", marginTop: "2rem" }}>
          <Footer />
        </Row>
      </Router>
    </Container>
  );
}

export default App;
