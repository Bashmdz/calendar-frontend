import React, { useEffect } from "react";
import { CONSTANT } from "../CONSTANT";

export default function TakeMeToAdmin() {
  useEffect(() => {
    // Redirect to the admin page
    window.location.href = `${CONSTANT.admin}`;
  }, []);

  return <div></div>;
}
