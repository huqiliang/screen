import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Div,
  TextInput,
  PixelRatio
} from "react-native";
import { List, InputItem, Button, Flex, Toast } from "antd-mobile";
import DeviceInfo from "react-native-device-info";
console.log(DeviceInfo.getUniqueID());

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: "GCBZG",
      loading: false
    };
  }
  async pullPage() {
    const { navigate } = this.props.navigation;
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      try {
        fetch(
          "http://115.159.43.44:82/api/cms/category/codeViews.json?code=ad&hotelGroupCode=FWHLG&hotelCode=0"
        )
          .then(async res => {
            if (!!res.ok) {
              navigate("Choose");
            }
          })
          .catch(error => {
            alerte(error);
          });
      } catch (error) {
        alert(error);
      }
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <InputItem
            labelNumber="5"
            style={styles.input}
            clear
            focus
            placeholder="请输入酒店代码"
            value={this.state.hotelCode}
            onChange={value => {
              this.setState({
                hotelCode: value
              });
            }}
          >
            酒店代码:
          </InputItem>
        </List>
        <View style={styles.btContain}>
          <Button
            loading={this.state.loading}
            disabled={this.state.loading}
            onClick={this.pullPage.bind(this)}
            type="primary"
          >
            <Text style={{ color: "#fff" }}>
              {!!this.state.loading ? "授权校验" : "确定"}
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  list: {
    width: "50%",
    borderColor: "#ccc",
    borderRadius: 1 / PixelRatio.get(),
    borderWidth: 1 / PixelRatio.get()
  },
  input: {
    width: "100%",
    paddingRight: "5%"
  },
  btContain: {
    marginTop: "5%"
  }
});
