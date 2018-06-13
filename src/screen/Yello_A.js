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
import Weather from "../components/weather";
import moment from "moment";
import { hotelList } from "../server/api";
import _ from "lodash";

class CenterHeader extends Component {
  render() {
    let arr = [];
    if (!_.isEmpty(this.props.titles)) {
      this.props.titles.forEach((val, i) => {
        arr.push(
          <Text style={styles.headerTh} key={i}>
            {val}
          </Text>
        );
      });
    }

    return (
      <View style={styles.centerHeader}>
        <Text style={styles.headerTh}>房型{this.props.test}</Text>
        {arr}
      </View>
    );
  }
}
class HotelList extends Component {
  render() {
    let arr = [];
    return (
      <View>
        <Text>dd</Text>
      </View>
    );
  }
}
export default class yello_a extends Component {
  constructor() {
    super();
    this.state = {
      hotelInfo: {},
      productRoomList: [],
      infoExtra: {}
    };
  }
  async getList() {
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
    try {
      if (responseJson && responseJson.result == 1) {
        return responseJson.retVal[0];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async componentWillMount() {
    let res = await this.getList();

    this.setState({
      hotelInfo: res.gcHotel,
      infoExtra: res.gcHotelExtra,
      productRoomList: res.productRoomList
    });
  }
  render() {
    console.log(this.state.infoExtra.logo);

    return (
      <View>
        <View />
        <ImageBackground
          style={{ height, width }}
          source={require("../static/bg/Yello_A.png")}
          resizeMode="cover"
        >
          <View style={styles.contain}>
            <View style={styles.left}>
              <View>
                <Image
                  source={require("../static/A.png")}
                  style={styles.logo}
                />
              </View>
              <View style={styles.bottom}>
                <Text style={styles.underTitle}>
                  {this.state.hotelInfo.descript}
                </Text>
                <Text style={styles.phone}>{this.state.hotelInfo.phone}</Text>
                <Text style={styles.phoneText}>24小时预定热线</Text>
              </View>
            </View>
            <View style={styles.center}>
              <View style={styles.centerTop}>
                {this.state.productRoomList &&
                this.state.productRoomList.length > 0 ? (
                  <CenterHeader
                    titles={_.map(
                      this.state.productRoomList[0].gcProductBases,
                      "name"
                    )}
                  />
                ) : (
                  <CenterHeader />
                )}

                <HotelList list={this.state.productRoomList} />
              </View>

              <Text style={{ color: "red", fontSize: 24 }}>
                {" "}
                image 嵌入 text
              </Text>
            </View>
            <View style={styles.right}>
              <Today />
              <Time />
              <Weather />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 80,
    position: "relative",
    left: 20
  },
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
    color: "#000",
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
    paddingTop: 50,
    paddingRight: "5%"
  },
  centerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
