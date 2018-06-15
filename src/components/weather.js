import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import pinyin from "pinyin";
import _ from "lodash";
import moment from "moment";

import { weatherList } from "../server/api";

const city = "杭州";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherList: []
    };
  }
  static defaultProps = {
    days: 1
  };
  async componentWillMount() {
    let response = await weatherList({
      city
    });
    // if (!response.error) {
    _.map(response.data.data.forecast, val => {
      val["typepy"] = _.join(
        pinyin(val.type, {
          style: pinyin.STYLE_NORMAL
        }),
        ""
      );
    });

    this.setState({
      weatherList: response.data.data.forecast
    });
  }

  render() {
    const today = moment().format("YYYY-MM-DD");
    return (
      <View style={styles.weatherContain}>
        {this.state.weatherList.map((val, index) => {
          if (this.props.days > index) {
            const isDoday = moment(today).isSame(val.date);
            return (
              <ImageBackground
                source={require("../static/Yello_A/weather.png")}
                style={{ width: 170, height: 75, marginBottom: 20 }}
                resizeMode="cover"
                key={index}
              >
                <View style={styles.weatherItem}>
                  <View style={styles.sock}>
                    <Text style={styles.weather}>
                      {isDoday ? "今日" : val.date}
                    </Text>
                    <Text style={styles.weather}>
                      {val.low}°C-{val.high}°C
                    </Text>
                    <Text style={styles.weather}>{val.type}</Text>
                  </View>
                  <View style={styles.rsock}>
                    <Image
                      source={{ uri: `${val.typepy}` }}
                      style={{ height: 40, width: 40 }}
                    />
                  </View>
                </View>
              </ImageBackground>
            );
          }
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  weatherContain: {},
  weatherItem: {
    width: "100%",
    paddingLeft: 10,
    paddingTop: 10,
    display: "flex",
    flexDirection: "row"
  },
  weather: {
    fontSize: 12
  },
  sock: {
    width: "50%",
    top: 10
  },
  rsock: {
    width: "50%",
    left: 15,
    top: 5
  }
});
