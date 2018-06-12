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

export default class yello_a extends Component {
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
              <Text>ddd</Text>
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
    width: width * 0.5
  },
  right: {
    width: width * 0.5
  }
});
