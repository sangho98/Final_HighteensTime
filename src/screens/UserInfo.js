import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Overlay,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { tokenData } from "../Apollo";
import { GetUserInfo, PutUserInfo } from "../utils/ApiConfig";

function UserInfo(props) {
  const { data } = props;
  const [userData, setUserData] = useState(null);
  const [newNickname, setNewNickname] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [prevPassword, setPrevPassword] = useState(null);

  const [correctPassword, setCorrectPassword] = useState(true);

  const target = useRef(null);

  useEffect(() => {
    GetUserInfo({
      data: tokenData(),
      setUserData: setUserData,
    });
  }, []);
  const onChangePrevPassword = (e) => {
    setPrevPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const onChangeNewNickname = (e) => {
    setNewNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await PutUserInfo({
      nickname: newNickname,
      password: newPassword,
    });
  };

  return (
    <Container fluid>
      <Row style={{ marginTop: "2rem" }}>
        <Col
          md={{ offset: 2, span: 8 }}
          style={{ borderBottom: "1px solid gray" }}
        >
          <h1>마이 페이지</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: "2rem" }}>
        <Col md={{ offset: 2, span: 8 }}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formPlaintextEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={userData && userData.email}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>이름</Form.Label>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={userData && userData.username}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>닉네임</Form.Label>
                <Form.Control
                  placeholder={`현재 닉네임 : ${userData && userData.nickname}`}
                  onChange={onChangeNewNickname}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="현재 비밀번호"
                  onChange={onChangePrevPassword}
                  ref={target}
                />
              </Form.Group>
              <Overlay
                target={target.current}
                show={correctPassword}
                placement="top"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    이전 비밀번호와 일치하지 않습니다.
                  </Tooltip>
                )}
              </Overlay>
              <Overlay
                target={target.current}
                show={!correctPassword}
                placement="top"
              >
                {(props) => (
                  <Tooltip id="overlay-example" {...props}>
                    이전 비밀번호와 일치합니다!
                  </Tooltip>
                )}
              </Overlay>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>변경 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="변경할 비밀번호"
                  onChange={onChangeNewPassword}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label
                  className="my-1 mr-2"
                  htmlFor="inlineFormCustomSelectPref"
                >
                  지역
                </Form.Label>
                <Form.Control
                  as="select"
                  className="my-1 mr-sm-2"
                  id="inlineFormCustomSelectPref"
                  custom
                >
                  <option value="0">
                    현재 지역 : {userData && userData.region}
                  </option>
                  <option value="1">서울</option>
                  <option value="2">인천</option>
                  <option value="3">익산</option>
                  <option value="3">정읍</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row as={Col}>
              {!correctPassword && newNickname !== null ? (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                    window.location.href = "/";
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled="true"
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              )}
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
