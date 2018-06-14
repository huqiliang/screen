import React, { Component } from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default class slider extends Component {
  static defaultProps = {
    imageData: []
  };
  renderItem() {
    // 数组
    // 获取json中图片
    var imgAry = this.props.imageData;
    var itemAry = [];
    // 遍历
    // 根据json数据实例化视图
    for (let i = 0; i < imgAry.length; i++) {
      // 取出单个对象
      var item = imgAry[i];
      // 将子视图放进 itemAry
      itemAry.push(
        // 实例化子视图
        <View
          key={i}
          style={styles.itemStyle}
          onPress={e => {
            this.choose(imgAry[i].name);
          }}
        >
          <Image style={styles.itemStyle} source={item.img} />
        </View>
      );
    }

    // 返回数组
    return itemAry;
  }
  render() {
    <ScrollView
      // style={styles.scrollViewStyle}
      horizontal={true} // 水平方向
      showsHorizontalScrollIndicator={false} // 隐藏水平指示器
      showsVerticalScrollIndicator={false} // 隐藏垂直指示器
      pagingEnabled={true} // 开启分页功能
      alwaysBounceHorizontal={false}
      snapToAlignment="center"
    >
      {this.renderItem()}
    </ScrollView>;
    return (
      <View>
        <Text>slider</Text>
      </View>
    );
  }
}
