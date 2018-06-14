import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

const weekList = ["日", "一", "二", "三", "四", "五", "六"];
export default class WeekDay extends Component {
  constructor() {
    super();
    this.state = {
      week: moment().day()
    };
  }
  render() {
    return (
      <View>
        <Text>周{weekList[this.state.week]}</Text>
      </View>
    );
  }
}
