import React, { useEffect } from "react";
import { CONSTANT } from "../CONSTANT";

export default function TakeMeToAdmin() {
  useEffect(() => {
    window.location.href = `${CONSTANT.admin}`;
  }, []);
  return <div></div>;
}
