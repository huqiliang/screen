import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export default class time extends Component {
  constructor() {
    super();
    this.state = {
      time: moment().format("HH:mm:ss"),
      interval: null
    };
  }
  componentWillMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: moment()
          .add(1, "seconds")
          .format("HH:mm:ss")
      });
    }, 1000);
  }
  componentWillUnMount() {
    this.interval = null;
  }
  render() {
    return (
      <View>
        <Text style={styles.time}>{this.state.time}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  time: {
    fontSize: 28,
    fontWeight: "800",
    color: "#666"
  }
});
