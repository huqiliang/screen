import React, { Component } from "react";
import { WebView, View, Text } from "react-native";

export default class screen extends Component {
  state = {
    url: "https://m.facebook.com",
    status: "No Page Loaded",
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true
  };

  render() {
    return (
      <View>
        <Text>33rg</Text>
        <WebView
          // ref={WEBVIEW_REF}
          source={{ uri: "http://www.jianshu.com/u/d5b531888b2b" }}
          style={{ width: "100%", height: "100%" }}
          // onNavigationStateChange={this.onNavigationStateChange}
          // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          // startInLoadingState={true}
          // scalesPageToFit={this.state.scalesPageToFit}
        />
      </View>
    );
  }
}
