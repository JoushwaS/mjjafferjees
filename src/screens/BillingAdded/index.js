import React, { Fragment } from "react";
import Screen from "./screen";
import { Header } from "../../components";

function Index(props) {
  console.log("porpsss billing", props.route.params);
  return (
    <Fragment>
      <Header backButton showSearch />
      <Screen {...props} />
    </Fragment>
  );
}

export default Index;
