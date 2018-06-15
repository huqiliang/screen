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

export default class Today extends Component {
  constructor() {
    super();
    const info = !!solarFestival ? ` ${solarFestival}` : "";
    this.state = {
      today: moment().format("YYYY年MM月DD日"),
      zodInfo: `${GanZhiYear}年${lunarMonthName}${lunarDayName}${info}`
    };
  }
  static defaultProps = {
    textAlign: "center"
  };
  render() {
    return (
      <View>
        <Text style={{ textAlign: this.props.textAlign }}>
          {this.state.today}
        </Text>
        <Text style={{ textAlign: this.props.textAlign, paddingTop: 5 }}>
          {this.state.zodInfo}
        </Text>
      </View>
    );
  }
}
