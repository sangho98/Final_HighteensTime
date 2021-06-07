import React, { useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/URL";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Alert,
  Tooltip,
  OverlayTrigger,
  Popover,
  Overlay,
  Toast,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { messageAlram, tokenData } from "../Apollo";

const Test2 = (props) => {
  return (
    <Toast {...props}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </Toast>
  );
};

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [click, setClick] = React.useState(false);
  const [LoginError, setLoginError] = React.useState(false);
  const target = useRef(null);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(SERVER_URL + "/login", data)
      .then((res) => {
        localStorage.setItem("TOKEN", `Bearer ${res.data}`);
        setLoginError(false);
        tokenData(localStorage.getItem("TOKEN"));
        messageAlram(true);

        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoginError(true);
      });
  };

  const handleKeyPress = (e) => {
    // if(e.charCode === 13) { //  deprecated
    //   this.handleClick();
    // }

    if (e.key === "Enter") {
      onClickLogin();
    }
  };

  return (
    <Container
      className="justify-content-center align-self-center"
      style={{ height: "600px" }}
    >
      <Row
        className="justify-content-md-center "
        style={{ marginTop: "10rem" }}
      >
        <Link to="/login">
          <h1 style={{ marginBottom: "3rem" }}>Highteens Time</h1>
        </Link>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Form>
            <Form.Group controlId="formHorizontalEmail">
              <Col>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={onChangeEmail}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalPassword">
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={onChangePassword}
                  onKeyPress={handleKeyPress}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Col>
                <Button
                  type="button"
                  style={{ width: "100%" }}
                  onClick={() => {
                    onClickLogin();
                  }}
                  ref={target}
                >
                  로그인
                </Button>
                <Overlay
                  target={target.current}
                  show={LoginError}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      로그인 오류!<br></br>
                      <strong>이메일</strong> 또는 <strong>비밀번호</strong>를{" "}
                      <br />
                      확인해주세요.
                    </Tooltip>
                  )}
                </Overlay>

                <Button
                  type="button"
                  style={{ width: "100%", marginTop: "0.3rem" }}
                  onClick={() => {
                    props.history.push("/register");
                  }}
                >
                  테스트
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
