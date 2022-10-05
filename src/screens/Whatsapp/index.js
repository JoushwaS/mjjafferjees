import React, { useEffect } from "react";
import { Header } from "../../components";
import Screen from "./screen";

function Index(props) {
  useEffect(() => {
    let url = "whatsapp://app";
    console.log("whatsapp");
  });
  return (
    <>
      <Header showSearch text="Home" />
      <Screen {...props} />
    </>
  );
}

export default Index;
