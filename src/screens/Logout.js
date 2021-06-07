import react from "react";
import { Redirect, useHistory } from "react-router";

function Logout(props) {
  localStorage.removeItem("TOKEN");
}

export default Logout;
