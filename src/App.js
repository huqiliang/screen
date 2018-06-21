import { YellowBox } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import { Toast } from "antd-mobile";
import "./lib/storage";
import nt from "./lib/netWork";
import Login from "./pages/login";
import Screen from "./pages/screen";
import Choose from "./pages/choose";
import Config from "./pages/config";

nt.checkNetworkState(function(connect) {
  if (!connect) {
    Toast.info(nt.NOT_NETWORK);
  }
});
const App = createDrawerNavigator({
  登陆: { screen: Login },
  模版选择: { screen: Choose },
  房价屏: { screen: Screen },
  设置: { screen: Config }
});

YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);
export default App;
