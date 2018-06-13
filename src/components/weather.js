import React, { Component } from "react";
import { View, Text } from "react-native";

export default class weather extends Component {
  constructor() {
    super();
  }
  static defaultProps = {
    date: 1
  };
  render() {
    return (
      <View>
        <Text>天气</Text>
      </View>
    );
  }
}
