import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Toast, Modal } from "antd-mobile";
import { imageData } from "../lib/imageData";

// 引入Dimensions库
const { width, height } = Dimensions.get("window");

export default class Choose extends Component {
  state = {
    imageData: []
  };
  componentDidMount() {
    Toast.info("Ddd", 10);
    this.setState({ imageData: imageData });
  }
  renderItem() {
    // 数组
    // 获取json中图片
    var imgAry = this.state.imageData;
    var itemAry = [];
    // 遍历
    // 根据json数据实例化视图
    for (var i = 0; i < imgAry.length; i++) {
      // 取出单个对象
      var item = imgAry[i];
      // 将子视图放进 itemAry
      itemAry.push(
        // 实例化子视图
        <TouchableHighlight
          key={i}
          style={styles.itemStyle}
          onPress={e => {
            this.choose(item.name);
          }}
        >
          <Image style={styles.itemStyle} source={item.img} />
        </TouchableHighlight>
      );
    }

    // 返回数组
    return itemAry;
  }
  //选择
  choose(name) {
    storage.save({ key: "usedTemplate", data: name });
    const { navigate } = this.props.navigation;
    navigate("Screen");
  }
  render() {
    return (
      <View>
        <ScrollView
          style={styles.scrollViewStyle}
          horizontal={true} // 水平方向
          showsHorizontalScrollIndicator={false} // 隐藏水平指示器
          showsVerticalScrollIndicator={false} // 隐藏垂直指示器
          pagingEnabled={true} // 开启分页功能
          alwaysBounceHorizontal={false}
          snapToAlignment="center"
        >
          {this.renderItem()}
        </ScrollView>
        {/* <WingBlank>
          <Carousel
            style={styles.spaceCarousel}
            frameOverflow="visible"
            cellSpacing={100}
            slideWidth={0.8}
            autoplay
            infinite
          >
            {this.renderItem()}
          </Carousel>
        </WingBlank> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spaceCarousel: {
    overflow: "hidden"
  },
  scrollViewStyle: {
    // 背景色
    width: width,
    height: "100%"
  },

  itemStyle: {
    // 尺寸
    opacity: 1,
    width: width,
    height: "100%"
  }
});
