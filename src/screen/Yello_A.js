import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
const { width, height } = Dimensions.get("window");
import Today from "../components/today";
import Time from "../components/time";
import moment from "moment";
import { hotelList } from "../server/api";
class CenterHeader extends Component {
  render() {
    return (
      <View style={styles.centerHeader}>
        <Text style={styles.headerTh}>房型</Text>
        {this.props.titles.map((val, i) => {
          return (
            <Text style={styles.headerTh} key={i}>
              {val}
            </Text>
          );
        })}
      </View>
    );
  }
}

export default class yello_a extends Component {
  async getList() {
    console.log("bbb333");
    let body = {
      hotelGroupCode: "JLSJYSWJDG",
      hotelCode: "JLSJYSWJD",
      hotelCodes: ["JLSJYSWJD"],
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment()
        .add(1, "days")
        .format("YYYY-MM-DD"),
      showType: 1,
      otaChannel: "KANBAN"
    };

    let response = await hotelList(body);
    let responseJson = await response.json();
    console.log(responseJson);
    console.log("ccc");
  }
  componentWillMount() {
    this.getList();
  }
  render() {
    return (
      <View>
        <ImageBackground
          style={{ height, width }}
          source={require("../static/bg/Yello_A.png")}
          resizeMode="cover"
        >
          <View style={styles.contain}>
            <View style={styles.left}>
              <View style={styles.bottom}>
                <Text style={styles.underTitle}>测试长度tttt测试长</Text>
                <Text style={styles.phone}>0571-8888-9999</Text>
                <Text style={styles.phoneText}>24小时预定热线</Text>
              </View>
            </View>
            <View style={styles.center}>
              <View style={styles.centerTop}>
                <CenterHeader titles={[1, 2, 3]} />
              </View>

              <Text style={{ color: "red", fontSize: 24 }}>
                {" "}
                image 嵌入 text
              </Text>
            </View>
            <View style={styles.right}>
              <Today />
              <Time />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contain: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    width: width
  },
  left: {
    width: width * 0.3
  },
  underTitle: {
    fontSize: 24,
    fontWeight: "800",
    paddingBottom: 20
  },
  phoneText: {},
  phone: {
    paddingTop: 10,
    borderTopWidth: 3,
    borderTopColor: "#dab96b",
    fontSize: 20,
    fontWeight: "800"
  },
  bottom: {
    position: "absolute",
    bottom: 30,
    left: 20
  },
  center: {
    width: width * 0.5,
    paddingTop: 50
  },
  centerHeader: {
    display: "flex",
    flexDirection: "row"
  },
  headerTh: {
    marginRight: 10,
    backgroundColor: "#fff",
    color: "#666",
    padding: 10,
    transform: [{ skewX: "-45deg" }]
  },
  "centerHeader:last-child": {
    borderBottomWidth: 1
  },
  right: {
    width: width * 0.5,
    paddingTop: 50
  }
});
