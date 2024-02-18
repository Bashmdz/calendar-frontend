import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Layout(props) {
  return (
    <>
      <Header />
      <div className="">{props.children}</div>
      <Footer />
    </>
  );
}
