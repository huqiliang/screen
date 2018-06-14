import React, { Component } from "react";
import { WebView, View } from "react-native";

export default class Screen extends Component {
  constructor() {
    super();
    this.state = {
      html: "no template is choosed"
    };
  }
  async componentWillMount() {
    const res = await storage.load({
      key: "usedTemplate",
      autoSync: true
    });

    this.setState({
      html: res
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            uri:
              "http://gcbzg.testwebsite.gcihotel.net/order/brand?hotelCode=gcbz&code=Yello_A"
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
