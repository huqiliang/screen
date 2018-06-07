import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { List, InputItem, Button, Flex, Toast, Modal } from "antd-mobile";
import DeviceInfo from "react-native-device-info";
import RNFS from "react-native-fs";
import { zip, unzip } from "react-native-zip-archive";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const { width } = Dimensions.get("window");
console.log(DeviceInfo.getUniqueID());

const sourcePath = RNFS.DocumentDirectoryPath;
const downloadDest = `${sourcePath}/test.txt`;

console.log(sourcePath);

// zip(sourcePath, targetPath)
//   .then(path => {
//     console.log(`zip completed at ${path}`);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// unzip(sourcePath, targetPath)
//   .then(path => {
//     console.log(`unzip completed at ${path}`);
//   })
//   .catch(error => {
//     console.log(error);
//   });

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: "GCBZG",
      loading: false,
      progressNum: 0,
      progressModal: true
    };
  }
  async pullPage() {
    const { navigate } = this.props.navigation;
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      try {
        let oath = await fetch(
          "http://115.159.43.44:82/api/cms/category/codeViews.json"
        );

        if (!!oath.ok) {
          navigate("Choose");
        }
      } catch (error) {
        alert(error);
      }
      this.setState({
        loading: false
      });
    }
  }
  downloadFile() {
    // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3

    const formUrl =
      "http://online.cdn.qianqian.com/qianqian/info/1cab17a3114dab0f3cc4c66f58c6e7fc.dmg";

    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        console.log("begin", res);
        console.log("contentLength:", res.contentLength / 1024 / 1024, "M");
      },
      progress: res => {
        let pro = res.bytesWritten / res.contentLength;

        this.setState({
          progressNum: pro
        });
      }
    };
    try {
      console.log(options);

      const ret = RNFS.downloadFile(options);
      ret.promise
        .then(res => {
          console.log("success", res);
          //alert(downloadDest);
          // this.setState({
          //   progressNum: 1
          // });
          // RNFS.readFile(downloadDest)
          //   .then(result => {
          //     console.log(result);

          //     this.setState({
          //       readTxtResult: result
          //     });
          //   })
          //   .catch(err => {
          //     console.log(err.message);
          //   });
          console.log("file://" + downloadDest);
        })
        .catch(err => {
          console.log("err", err);
        });
    } catch (e) {
      console.log(e);
    }
  }
  componentWillMount() {
    //this.downloadFile();
  }
  // onClose(name) {
  //   this.setState({
  //     [name]: false
  //   });
  // }
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
          <Text>{this.state.progressNum}</Text>
        </View>
        <Modal
          visible={this.state.progressModal}
          transparent
          maskClosable={false}
          // /onClose={this.onClose("modal1")}
          title="正在下载 请稍候..."
          footer={[
            {
              text: "Ok",
              onPress: () => {
                console.log("ok");
                //this.onClose("progressModal")();
              }
            }
          ]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <View style={styles.animateWapper}>
            <AnimatedCircularProgress
              style={styles.progress}
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
        </Modal>
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
  },
  animateWapper: {
    paddingTop: "10%",
    paddingBottom: "10%",
    position: "relative"
  },
  progress: {
    position: "relative",
    left: "15%"
  }
});
