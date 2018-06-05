import React, { Component } from "react";
import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import "./lib/storage";

import Main from "./pages/main";
import Login from "./pages/login";
import Screen from "./pages/screen";

const App = createDrawerNavigator({
  Screen: { screen: Screen },
  Login: { screen: Login },
  Main: { screen: Main }
});

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
export default App;
