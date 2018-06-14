import React, { Component } from "react";
import { View, Text } from "react-native";

import { weatherList } from "../server/api";

export default class Weather extends Component {
  static defaultProps = {
    date: 1
  };
  async componentWillMount() {
    console.log("aaa");
    let response = await weatherList({
      city: "吉林"
    });

    console.log(response.data.data.forecast);
  }
  render() {
    return (
      <View>
        <Text>天气444</Text>
      </View>
    );
  }
}
