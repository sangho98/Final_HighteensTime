import react, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { GetConfirmEmail } from "../utils/ApiConfig";

function Confirm(props) {
  const params = props.location.search.split("token=");

  const tokenD = {
    token: params.slice(1, 2),
  };

  return <Redirect to="/auth" />;
}

export default Confirm;
