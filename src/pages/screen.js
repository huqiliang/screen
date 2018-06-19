import React, { Component } from "react";
import { WebView, View, Text } from "react-native";
import url from "url";
export default class Screen extends Component {
  constructor() {
    super();
    this.state = {
      code: "Yello_A",
      hotelCode: "",
      hotelGroupCode: ""
    };
  }
  async componentWillMount() {
    const tpl = storage.load({
      key: "usedTemplate",
      autoSync: true
    });
    const code = storage.load({
      key: "GHCODE",
      autoSync: true
    });
    let resList = await Promise.all([tpl, code]);
    const [res, codeRes] = resList;
    console.log("====================================");
    console.log(codeRes);
    console.log("====================================");
    this.setState({
      code: res,
      ...codeRes
    });
  }

  render() {
    const href = url.format({
      protocol: "http",
      host: "www.ihotel.cn",
      pathname: "/order/brand",
      query: {
        ...this.state
      }
    });
    console.log("====================================");
    console.log(href);
    console.log("====================================");
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri: href
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
