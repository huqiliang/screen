import React, { Component } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";
import _ from "lodash";
import moment from "moment";
import Today from "../components/today";
import Time from "../components/time";
import Weather from "../components/weather";
import Slider from "../components/slider";
import { hotelList } from "../server/api";
const { width, height } = Dimensions.get("window");

class CenterHeader extends Component {
  render() {
    let arr = [];
    if (!_.isEmpty(this.props.titles)) {
      this.props.titles.forEach((val, i) => {
        arr.push(
          <Text
            style={{
              backgroundColor: "#fff",
              width: `${
                _.isEmpty(this.props.titles)
                  ? 70 / 3
                  : 70 / this.props.titles.length
              }%`,
              color: "#666",
              padding: 10,
              textAlign: "center",
              transform: [{ skewX: "-45deg" }]
            }}
            key={i}
          >
            {val}
          </Text>
        );
      });
    }

    return (
      <View style={styles.centerHeader}>
        <Text
          style={{
            backgroundColor: "#fff",
            width: `${
              _.isEmpty(this.props.titles)
                ? 65 / 3
                : 65 / this.props.titles.length
            }%`,
            color: "#666",
            padding: 10,
            textAlign: "center",
            transform: [{ skewX: "-45deg" }]
          }}
        >
          房型{this.props.test}
        </Text>
        {arr}
      </View>
    );
  }
}
class HotelList extends Component {
  render() {
    let arr = [];
    _.map(this.props.list, (val, index) => {
      arr.push(
        <View key={index} style={styles.hotelList}>
          <Text style={styles.firstItem}>{val.roomDescript}</Text>
          <Text style={styles.itemHotel}>¥{val.roomRacPrice}</Text>
          <Text style={styles.itemHotel}>¥{val.roomMinPriceWithPromotion}</Text>
        </View>
      );
    });
    return <View>{arr}</View>;
  }
}
export default class YelloA extends Component {
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
      hotelCodes: ["JLSJYSWJD"],
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment()
        .add(1, "days")
        .format("YYYY-MM-DD"),
      showType: 1,
      otaChannel: "KANBAN"
    };

    let responseJson = await hotelList(body);
    try {
      if (responseJson && responseJson.data.result == 1) {
        return responseJson.data.retVal[0];
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
    return (
      <View>
        <ImageBackground
          style={{ height, width }}
          source={require("../static/bg/Yello_A.png")}
          resizeMode="cover"
        >
          <View style={styles.contain}>
            <View style={styles.left}>
              <View>
                <Image
                  source={{ uri: this.state.infoExtra.logo }}
                  style={styles.logo}
                />
              </View>
              <View style={styles.slider}>
                <Slider
                  imageData={_.map(
                    this.state.productRoomList,
                    "gcRoomExtra.pictures"
                  )}
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
              </View>
              <HotelList list={this.state.productRoomList} />
            </View>
            <View style={styles.right}>
              <Today />
              <View style={{ width: "75%" }}>
                <Time />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Weather days={3} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  slider: {
    zIndex: -1,
    marginTop: 60,
    height: 200
  },
  logo: {
    width: 100,
    height: 70,
    position: "relative",
    left: 20,
    top: 20
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
  hotelList: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  firstItem: {
    width: "33%",
    fontWeight: "800",
    borderBottomWidth: 1,
    height: 45,
    lineHeight: 45,
    borderBottomColor: "#666",
    fontSize: 16
  },
  itemHotel: {
    width: (width * 0.5) / 3.3,
    textAlign: "center",
    height: 45,
    lineHeight: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    fontSize: 16
  },
  centerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  "centerHeader:last-child": {
    borderBottomWidth: 1
  },
  right: {
    width: width * 0.25,
    paddingTop: 50
  }
});
