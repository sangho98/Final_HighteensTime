import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faPowerOff,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { GetMessage, SendMessage } from "../utils/ApiConfig";
import { Col } from "react-bootstrap";
import Logout from "../screens/Logout";
import Alert from "react-bootstrap/Alert";
import { Overlay, Tooltip, Toast } from "react-bootstrap";
import { messageAlram, tokenData } from "../Apollo";
import Friend from "./Friend";

const Headalign = styled.div`
  width: 100%;
  height: 60px;
`;

const ListMessage = (props) => {
  const { message, pageNum, pageNumEnd, setTypeModal, setMessageId } = props;

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th style={{ textAlign: "center" }}>번호</th>
          <th style={{ width: "93%", textAlign: "center" }}>제목</th>
        </tr>
      </thead>
      <tbody>
        {message.slice(pageNum, pageNumEnd).map((m) => {
          return (
            <tr key={m.id}>
              <td style={{ textAlign: "center" }}>{m.id}</td>

              <td
                style={{ textAlign: "center" }}
                onClick={() => {
                  setTypeModal("2");
                  setMessageId(m.id);
                }}
              >
                {m.title}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const MessageDetail = (props) => {
  const { message, setTypeModal, messageId } = props;
  return (
    <Table bordered hover>
      <thead>
        {message.map((m) => {
          if (m.id === messageId) {
            return (
              <tr>
                <th style={{ width: "10%", textAlign: "center" }}>제목</th>
                <td style={{ width: "90%", textAlign: "center" }}>{m.title}</td>
              </tr>
            );
          }
        })}
      </thead>
      <tbody>
        {message.map((m) => {
          if (m.id === messageId) {
            return (
              <tr key={m.id}>
                <th style={{ textAlign: "center" }}>내용</th>

                <td style={{ textAlign: "center" }}>{m.content}</td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

const Test = (props) => {
  const {
    data,
    message,
    setCount,
    setModalShow,
    typeModal,
    setTypeModal,
    pageNum,
    pageNumEnd,
    setMessageId,
    messageId,
  } = props;

  if (typeModal === "1") {
    return (
      <ListMessage
        message={message}
        pageNum={pageNum}
        pageNumEnd={pageNumEnd}
        setTypeModal={setTypeModal}
        setMessageId={setMessageId}
      />
    );
  } else if (typeModal === "2") {
    return <MessageDetail message={message} messageId={messageId} />;
  }
};

const MessageShow = (props) => {
  const {
    data,
    message,
    setCount,
    setModalShow,
    typeModal,
    setTypeModal,
    prop,
  } = props;
  const [pageNum, setPageNum] = useState(0);
  const [pageNumEnd, setPageNumEnd] = useState(5);
  const [show, setShow] = useState(true);
  const [messageId, setMessageId] = useState(null);
  const target = useRef(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {typeModal === "1" || typeModal === "2" ? (
          <Modal.Title id="contained-modal-title-vcenter">쪽지함</Modal.Title>
        ) : (
          <Modal.Title id="contained-modal-title-vcenter">
            친구 목록
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        {typeModal === "1" || typeModal === "2" ? (
          <Test
            message={message}
            pageNum={pageNum}
            pageNumEnd={pageNumEnd}
            setTypeModal={setTypeModal}
            setMessageId={setMessageId}
            messageId={messageId}
            typeModal={typeModal}
            data={data}
          />
        ) : (
          <Friend prop={prop} />
        )}
      </Modal.Body>
      <Modal.Footer>
        {typeModal === "1" ? (
          <Button
            onClick={() => {
              if (pageNum <= 0) {
                setShow(!show);
              } else {
                setShow(false);
                setPageNum(pageNum - 5);
                setPageNumEnd(pageNumEnd - 5);
              }
            }}
          >
            Prev
          </Button>
        ) : null}
        {typeModal === "1" ? (
          <Button
            onClick={() => {
              setPageNum(pageNum + 5);
              setPageNumEnd(pageNumEnd + 5);
              setShow(!show);
            }}
          >
            Next
          </Button>
        ) : null}

        <Button
          onClick={() => {
            setModalShow(false);
            setCount(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function Header(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [message, setMessage] = useState(null);
  const [count, setCount] = useState(false);
  const [show, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState(true);
  const target = useRef(null);
  const [successLogin, setSuccessLogin] = useState(false);

  const data = tokenData();

  if (modalShow && !count) {
    GetMessage({ data: data, setMessage: setMessage });
    if (message) {
      setCount(true);
    }
  }

  if (
    props.history.location.pathname === "/login" ||
    props.history.location.pathname === "/register"
  ) {
    return null;
  } else {
    return (
      <Headalign>
        <clientSet></clientSet>
        {modalShow && message ? (
          <MessageShow
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={data}
            message={message}
            typeModal={typeModal}
            setCount={setCount}
            setModalShow={setModalShow}
            setTypeModal={setTypeModal}
            prop={props}
          ></MessageShow>
        ) : null}

        <Navbar bg="secondary" variant="dark" style={{ height: "60px" }}>
          <Link to="/">
            <Navbar.Brand>Highteens Time</Navbar.Brand>
          </Link>
          <Nav className="mr-auto"></Nav>

          <Nav>
            <FontAwesomeIcon
              icon={faUserFriends}
              style={{ paddingRight: "13px" }}
              color="white"
              size="2x"
              onClick={() => {
                setTypeModal("3");
                setModalShow(true);
              }}
            ></FontAwesomeIcon>

            <FontAwesomeIcon
              icon={faCommentDots}
              style={{ paddingRight: "13px" }}
              color="white"
              size="2x"
              onClick={() => {
                setTypeModal("1");
                setModalShow(true);
              }}
            ></FontAwesomeIcon>

            <Link to="/login">
              <FontAwesomeIcon
                icon={faPowerOff}
                style={{ paddingRight: "13px" }}
                color="white"
                size="2x"
                onClick={() => {
                  localStorage.removeItem("TOKEN");
                }}
              ></FontAwesomeIcon>
            </Link>

            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">검색</Button>
            </Form>
          </Nav>
        </Navbar>
      </Headalign>
    );
  }
}

export default Header;
