import React, { Component } from "react";
import { WebView, View, Text } from "react-native";

import YelloA from "../screen/Yello_A";
import { webSite } from "../server/api";

export default class Screen extends Component {
  constructor() {
    super();
    this.state = {
      tpl: "Yello_A"
    };
  }
  // async componentWillMount() {
  //   const tpl = storage.load({
  //     key: "usedTemplate",
  //     autoSync: true
  //   });
  //   let resList = await Promise.all([tpl]);
  //   const [res] = resList;
  //   this.setState({
  //     tpl: res
  //   });
  // }
  // template(tpl) {
  //   switch (this.state.tpl) {
  //     case "Yello_A":
  //       return <YelloA />;
  //       break;
  //     default:
  //       return <YelloA />;
  //       break;
  //   }
  // }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri:
              "http://jlsjyswjdg.gcihotel.net/order/brand?hotelCode=JLSJYSWJD&code=Yello_A"
          }}
          style={{ width: "100%", height: "100%" }}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}
