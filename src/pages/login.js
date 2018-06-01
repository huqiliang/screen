import React, { Component } from "react";
import { View, Text, StyleSheet, Div, TextInput } from "react-native";
import { List, InputItem, Button, Flex } from "antd-mobile";
// import { createForm } from "rc-form";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: ""
    };
  }
  hotelCodeChange() {
    this.setState({
      hotelCode: "ddd"
    });
  }
  pullPage() {
    // todo 拉取远程数据
  }
  render() {
    return (
      <View style={styles.container}>
        <List style={styles.list}>
          <InputItem
            labelNumber="5"
            style={styles.list}
            clear
            placeholder="请输入酒店代码"
            onChange={e => {
              this.hotelCodeChange;
            }}
          >
            酒店代码:
          </InputItem>
        </List>
        <View style={styles.button}>
          <Button type="primary" onClick={this.pullPage}>
            确定
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
    width: "50%"
  },
  button: {
    marginTop: "5%"
  }
});
