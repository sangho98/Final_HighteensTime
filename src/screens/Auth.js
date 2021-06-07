import React from "react";
import { tokenData } from "../Apollo";

function Auth(props) {
  tokenData(null);
  localStorage.clear();
  return <div>인증 완료!</div>;
}

export default Auth;
