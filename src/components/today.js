import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";
import LunarCalendar from "lunar-calendar";

const {
  GanZhiYear,
  lunarMonthName,
  lunarDayName,
  solarFestival
} = LunarCalendar.solarToLunar(
  moment().year(),
  moment().month() + 1,
  moment().date()
);

export default class today extends Component {
  constructor() {
    super();
    const info = !!solarFestival ? ` ${solarFestival}` : "";
    this.state = {
      today: moment().format("YYYY年MM月DD日"),
      zodInfo: `${GanZhiYear}年${lunarMonthName}${lunarDayName}${info}`
    };
  }
  render() {
    return (
      <View>
        <Text>{this.state.today}</Text>
        <Text>{this.state.zodInfo}</Text>
      </View>
    );
  }
}
