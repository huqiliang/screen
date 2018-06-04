import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Div,
  TextInput,
  PixelRatio,
  AsyncStorage
} from "react-native";
import { List, InputItem, Button, Flex, Toast } from "antd-mobile";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: "GCBZG",
      loading: false
    };
  }
  // save(item, value) {}
  async pullPage() {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      let res = await axios.get(
        "http://gcbzg.testwebsite.gcihotel.net/order/brand?hotelCode=gcbz"
      );
      console.log(res);
      storage.save({
        key: "usedTemplate", // 注意:请不要在key中使用_下划线符号!
        data: res.data
      });

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
              {!!this.state.loading ? "获取数据" : "确定"}
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
