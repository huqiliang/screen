import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import { Toast } from "antd-mobile";
import "./lib/storage";
import nt from "./lib/netWork";

import Main from "./pages/main";
import Login from "./pages/login";
import Screen from "./pages/screen";
import Choose from "./pages/choose";

nt.checkNetworkState(function(connect) {
  if (connect) {
    Toast.info(nt.NOT_NETWORK);
  }
});
const App = createDrawerNavigator({
  Screen: { screen: Screen },
  Login: { screen: Login },
  Choose: { screen: Choose },
  Main: { screen: Main }
});

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
export default App;
