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
    this.setState({
      code: res,
      ...codeRes
    });
  }
  injectJS = () => {
    // const script = "alert($)"; // eslint-disable-line quotes
    // if (this.webview) {
    //   this.webview.injectJavaScript(script);
    // }
  };
  render() {
    const href = url.format({
      protocol: "http",
      host: "jlsjyswjdg.gcihotel.net",
      pathname: "/order/brand",
      query: {
        ...this.state
      }
    });
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={webview => {
            this.webview = webview;
          }}
          source={{
            uri: href
          }}
          style={{ width: "100%", height: "100%" }}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onLoadEnd={this.injectJS}
        />
      </View>
    );
  }
}
