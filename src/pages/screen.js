import React, { Component } from "react";
import { WebView, View, Text } from "react-native";

export default class screen extends Component {
  constructor() {
    super();
    this.state = {
      html: ""
    };
  }
  async componentWillMount() {
    console.log("Abc");

    const res = await storage.load({
      key: "usedTemplate",
      autoSync: true
    });
    console.log("gg");
    console.log(res);

    this.setState({
      html: res
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{
            html: this.state.html
          }}
          startInLoadingState={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}
