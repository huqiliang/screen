import React, { Component } from "react";
import { View, ImageBackground, Image, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class yello_a extends Component {
  render() {
    return (
      <View>
        <ImageBackground
          style={{ height, width }}
          source={require("../static/bg/Yello_A.png")}
          resizeMode="cover"
        >
          <Text style={{ color: "red", fontSize: 24 }}> image 嵌入 text</Text>
        </ImageBackground>
      </View>
    );
  }
}
