import React, { Component } from "react";
import { WebView, View } from "react-native";

export default class screen extends Component {
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
