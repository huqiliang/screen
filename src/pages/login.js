import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { List, InputItem, Button, Flex, Toast, Modal } from "antd-mobile";
import DeviceInfo from "react-native-device-info";
import RNFS from "react-native-fs";
import { zip, unzip } from "react-native-zip-archive";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const { width } = Dimensions.get("window");
console.log(DeviceInfo.getUniqueID());

const sourcePath = RNFS.CachesDirectoryPath;
const downloadDest = `${sourcePath}/test.zip`;
const unzipPath = `${sourcePath}/test`;

console.log(sourcePath);

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      hotelCode: "GCBZG",
      loading: false,
      progressNum: 0,
      progressModal: false
    };
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
        if (!!oath.ok) {
          this.setState({
            loading: false
          });
          let exitZip = await RNFS.exists(downloadDest);
          let exitPath = await RNFS.exists(unzipPath);
          console.log(exitZip);
          if (!exitZip) {
            this.downloadFile();
            this.unZip();
          } else {
            if (!exitPath) {
              this.unZip();
            } else {
              navigate("Choose");
            }
          }
        } else {
          alert("你没有权限");
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }
  unZip() {
    unzip(downloadDest, unzipPath)
      .then(path => {
        console.log(`unzip completed at ${path}`);
        navigate("Choose");
      })
      .catch(error => {
        console.log(error);
      });
  }
  downloadFile() {
    const formUrl = "https://www.7-zip.org/a/7za920.zip";
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: res => {
        this.setState({
          progressModal: true
        });
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
          this.setState({
            progressModal: false
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // onClose(name) {
  //   this.setState({
  //     [name]: false
  //   });
  // }
  render() {
    const title = () => {
      return <Text style={{ color: "#ffffff" }}>正在下载 请稍候</Text>;
    };
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
        <Modal
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
        </Modal>
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
