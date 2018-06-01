import React, { Component } from "react";
import { View } from "react-native";
import { InputItem, Button } from "antd-mobile";

export default class Login extends Component {
  render() {
    return (
      <View>
        集团代码:<InputItem />
        <Button type="primary">确定</Button>
      </View>
    );
  }
}
