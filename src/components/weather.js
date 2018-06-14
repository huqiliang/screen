import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import { weatherList } from "../server/api";
import pinyin from "pinyin";
import _ from "lodash";

const city = "杭州";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherList: []
    };
  }
  static defaultProps = {
    date: 1
  };
  async componentWillMount() {
    let response = await weatherList({
      city
    });
    console.log(response);

    // if (!response.error) {
    _.map(response.data.data.forecast, val => {
      val["typepy"] = _.join(
        pinyin(val.type, {
          style: pinyin.STYLE_NORMAL
        }),
        ""
      );
    });
    console.log(response.data.data.forecast);

    this.setState({
      weatherList: response.data.data.forecast
    });
  }

  render() {
    return (
      <View style={styles.weatherContain}>
        {this.state.weatherList.map((val, index) => {
          return (
            <ImageBackground
              source={require("../static/bg/Yello_A.png")}
              style={{ width: 100, height: 100 }}
            >
              <View key={index} style={styles.weatherList}>
                <Text style={styles.weather}>{val.date}</Text>
                <Text style={styles.weather}>
                  {val.low}-{val.high}
                </Text>
                <Text style={styles.weather}>{val.type}</Text>
              </View>
            </ImageBackground>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  weatherContain: {},
  weatherList: {
    paddingLeft: 10,
    paddingTop: 20
  }
});
