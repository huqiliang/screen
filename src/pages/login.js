import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { List, InputItem, Button, Flex, Toast, Modal } from "antd-mobile";
import DeviceInfo from "react-native-device-info";
// import { AnimatedCircularProgress } from "react-native-circular-progress";

const { width } = Dimensions.get("window");
console.log(DeviceInfo.getUniqueID());

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: "",
      hotelGroupCode: "",
      loading: false,
      progressNum: 0,
      progressModal: false
    };
  }
  async componentWillMount() {
    let res = await storage.load({
      key: "GHCODE"
    });
    this.setState({
      hotelGroupCode: res.hotelGroupCode,
      hotelCode: res.hotelCode
    });
  }
  async pullPage() {
    const { navigate } = this.props.navigation;
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      try {
        // 授权
        let oath = await fetch(
          "http://115.159.43.44:82/api/cms/category/codeViews.json"
        );
        console.log(oath);

        this.setState({
          loading: false
        });
        console.log("====================================");
        console.log(oath);
        console.log("====================================");
        if (!!oath.ok) {
          storage.save({
            key: "GHCODE",
            data: {
              hotelGroupCode: this.state.hotelGroupCode,
              hotelCode: this.state.hotelCode
            }
          });
          navigate("模版选择");
        } else {
          alert("你没有权限");
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }
  render() {
    const title = () => {
      return <Text style={{ color: "#ffffff" }}>正在下载 请稍候</Text>;
    };

    return (
      <View style={styles.container}>
        <List style={styles.listFirst}>
          <InputItem
            labelNumber="5"
            style={styles.input}
            clear
            focus
            placeholder="请输入集团代码"
            value={this.state.hotelGroupCode}
            onChange={value => {
              this.setState({
                hotelGroupCode: value
              });
            }}
          >
            集团代码:
          </InputItem>
        </List>
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
        {/* <Modal
          style={styles.modalStyle}
          visible={this.state.progressModal}
          transparent
          maskClosable={false}
          // /onClose={this.onClose("modal1")}
          title={title()}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <View style={styles.animateWapper}>
            <AnimatedCircularProgress
              style={styles.progress}
              rotation={0}
              size={150}
              width={10}
              fill={this.state.progressNum * 100}
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log("onAnimationComplete")}
            >
              {fill => (
                <Text style={styles.points}>
                  {`${Math.trunc(this.state.progressNum.toFixed(2) * 100)}%`}
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>
        </Modal> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "#3d5875"
  },
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  listFirst: {
    width: "50%",
    borderColor: "#ccc",
    borderRadius: 1 / PixelRatio.get(),
    borderWidth: 1 / PixelRatio.get()
  },
  list: {
    width: "50%",
    borderColor: "#ccc",
    borderRadius: 1 / PixelRatio.get(),
    borderWidth: 1 / PixelRatio.get(),
    marginTop: 10
  },
  input: {
    width: "100%",
    paddingRight: "5%"
  },
  btContain: {
    marginTop: "5%"
  },
  animateWapper: {
    width: "100%",
    paddingTop: "10%",
    paddingBottom: "10%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  },
  points: {
    color: "#fff"
  }
});
