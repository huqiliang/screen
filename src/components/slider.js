import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import { Carousel } from "antd-mobile";

export default class slider extends Component {
  static defaultProps = {
    imageData: [],
    itemWidth: 300,
    itemHeight: 200
  };
  renderItem() {
    var itemAry = [];
    const { imageData: imgAry, itemWidth, itemHeight } = this.props;
    // 遍历
    // 根据json数据实例化视图
    for (let i = 0; i < imgAry.length; i++) {
      // 取出单个对象
      var item = imgAry[i];
      // 将子视图放进 itemAry
      itemAry.push(
        // 实例化子视图
        <Image
          key={i}
          style={{ width: itemWidth, height: itemHeight }}
          source={{
            uri: item
          }}
        />
      );
    }

    // 返回数组
    return itemAry;
  }
  render() {
    return (
      <Carousel
        style={styles.wrapper}
        infinite
        autoplay={true}
        autoplayTimeout={3}
      >
        {this.renderItem()}
      </Carousel>
    );
  }
}
const styles = StyleSheet.create({
  scrollViewStyle: {
    // 背景色
    width: "100%",
    height: "100%"
  }
});
