import React, { useEffect, useRef, useState } from "react";
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
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  PostCheckEmail,
  PostCheckNickname,
  PostRegister,
} from "../utils/ApiConfig";
import { Link } from "react-router-dom";

function Register(props) {
  const [emailFront, setEmailFront] = useState(null);
  const [emailBack, setEmailBack] = useState(null);
  const [emailFull, setEmailFull] = useState(null);

  const [password, setPassword] = useState(null);

  const [username, setUsername] = useState(null);
  const [nickname, setNickname] = useState(null);

  const [region, setRegion] = useState(null);
  const [resResult, setResResult] = useState(false);

  const [duplicateNick, setDuplicateNick] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const target = useRef(null);
  const target2 = useRef(null);

  useEffect(() => {
    setEmailFull(`${emailFront}@${emailBack}`);
  }, [emailFront, emailBack]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangeEmailFront = (e) => {
    setEmailFront(e.target.value);
  };

  const onChangeEmailBack = (e) => {
    setEmailBack(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRegion = (e) => {
    switch (e.target.value) {
      case "서울":
        setRegion("Seoul");
        break;
      case "인천":
        setRegion("Incheon");
        break;
      case "정읍":
        setRegion("Jeongeup");
        break;
      case "익산":
        setRegion("Iksan");
        break;
    }
  };

  return (
    <Container style={{ height: "600px" }} fluid>
      <Row style={{ marginTop: "3rem" }} className="justify-content-md-center">
        <Col md="auto">
          <Link to="/register">
            <h1 style={{ marginBottom: "3rem" }}>Highteens Time</h1>
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Form style={{ width: "33%" }}>
          <Form.Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="이름"
                onChange={onChangeUsername}
              />
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="닉네임"
                onChange={onChangeNickname}
              />
            </Col>
            <Col>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  PostCheckNickname({
                    nickname: nickname,
                    setDuplicateNick: setDuplicateNick,
                  });
                }}
                ref={target}
              >
                닉네임 확인
              </Button>
              <Overlay
                target={target.current}
                show={duplicateNick}
                placement="right"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    닉네임 오류!<br></br>
                    <strong>닉네임</strong> 이 중복됩니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col md={4}>
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="example"
                onChange={onChangeEmailFront}
              />
            </Col>
            <Col md={5}>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="example.com"
                  onChange={onChangeEmailBack}
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <Button
                type="button"
                className="mb-2"
                style={{ width: "100%" }}
                onClick={() => {
                  console.log(`send Email: ${emailFull}`);
                  PostCheckEmail({
                    email: emailFull,
                    setDuplicateEmail: setDuplicateEmail,
                  });
                }}
                ref={target2}
              >
                이메일 확인
              </Button>
              <Overlay
                target={target2.current}
                show={duplicateEmail}
                placement="right"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    이메일 오류!<br></br>
                    <strong>이메일</strong> 이 중복됩니다.
                  </Tooltip>
                )}
              </Overlay>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.0rem" }}>
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.5rem" }}>
            <Col>
              <Form.Control
                as="select"
                defaultValue="Choose..."
                onChange={onChangeRegion}
              >
                <option>지역 선택</option>
                <option>서울</option>
                <option>인천</option>
                <option>정읍</option>
                <option>익산</option>
              </Form.Control>
            </Col>
          </Form.Row>
          <Form.Row style={{ marginTop: "0.3rem" }}>
            <Col>
              <Button
                type="button"
                style={{ width: "100%" }}
                onClick={() => {
                  props.history.goBack();
                }}
              >
                이전 단계
              </Button>
            </Col>
          </Form.Row>

          <Form.Row style={{ marginTop: "0.3rem" }}>
            <Col>
              <Button
                type="button"
                style={{ width: "100%", marginTop: "0.3rem" }}
                onClick={() => {
                  if (duplicateNick || duplicateEmail) {
                    // 회원가입 막기
                    return;
                  }

                  if (
                    emailFront === null ||
                    emailBack === null ||
                    password === null ||
                    username === null ||
                    region === null
                  ) {
                    console.log("No Input");
                    return;
                  }
                  const regData = {
                    email: emailFull,
                    password: password,
                    username: username,
                    nickname: nickname,
                    region: region,
                  };
                  console.log(`regData : ${regData}`);

                  PostRegister({ data: regData, setResResult: setResResult });

                  props.history.push("/login");
                }}
              >
                회원가입
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Row>
    </Container>
  );
}

export default Register;
