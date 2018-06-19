import React, { Component } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { List, Picker, Modal, TextareaItem, Button, Flex } from "antd-mobile";
const Item = List.Item;

export default class Config extends Component {
  constructor() {
    super();
    this.state = {
      timeControl: false,
      pickerDate: 1,
      pickerTime: 3,
      logoModal: false,
      dates: [
        {
          label: 1,
          value: 1
        },
        {
          label: 2,
          value: 2
        },
        {
          label: 3,
          value: 3
        },
        {
          label: 4,
          value: 4
        },
        {
          label: 5,
          value: 5
        }
      ],
      times: [
        {
          label: "1 秒",
          value: 1
        },
        {
          label: "2 秒",
          value: 2
        },
        {
          label: "3 秒",
          value: 3
        },
        {
          label: "4 秒",
          value: 4
        },
        {
          label: "5 秒",
          value: 5
        }
      ]
    };
  }
  getDates() {
    const value = this.state.pickerValue;
    if (!value) {
      return "";
    }
    const treeChildren = arrayTreeFilter(
      district,
      (c, level) => c.value === value[level]
    );
    return treeChildren.map(v => v.label).join(",");
  }
  reset() {
    this.setState({
      timeControl: false,
      pickerDate: 1,
      pickerTime: 3,
      logoModal: false
    });
  }
  save() {
    const config = ({ timeControl, pickerDate, pickerTime } = this.state);

    storage.load({
      key: "config", // 注意:请不要在key中使用_下划线符号!
      data: config
    });
  }
  render() {
    return (
      <View>
        <List renderHeader={() => "房价屏配置"}>
          <Item
            platform="android"
            extra={
              <Switch
                value={this.state.timeControl}
                onValueChange={value => {
                  this.setState({
                    timeControl: value
                  });
                }}
              />
            }
          >
            定时刷新
          </Item>
          <Picker
            title="时间选择"
            extra={`默认1,当前:${this.state.pickerTime}秒`}
            data={this.state.times}
            value={this.state.time}
            cols={1}
            onChange={v => this.setState({ pickerTime: v })}
            onOk={v => this.setState({ pickerTime: v })}
          >
            <List.Item arrow="horizontal" platform="android">
              定时刷新时间间隔
            </List.Item>
          </Picker>
          <Picker
            title="时间选择"
            extra={`默认1,当前:${this.state.pickerDate}`}
            data={this.state.dates}
            value={this.state.pickerDate}
            cols={1}
            onChange={v => this.setState({ pickerDate: v })}
            onOk={v => this.setState({ pickerDate: v })}
          >
            <List.Item arrow="horizontal" platform="android">
              显示天气天数
            </List.Item>
          </Picker>
          {/* <Item
            arrow="horizontal"
            platform="android"
            onClick={() => {
              this.setState({ logoModal: true });
            }}
          >
            酒店标题
          </Item> */}
        </List>
        <Flex style={styles.buttons}>
          <Flex.Item
            style={{
              marginRight: 20
            }}
          >
            <Button type="warning" onClick={this.reset.bind(this)}>
              重置
            </Button>
          </Flex.Item>
          <Flex.Item
            style={{
              marginLeft: 20
            }}
          >
            <Button type="primary" onClick={this.save.bind(this)}>
              保存
            </Button>
          </Flex.Item>
        </Flex>

        <Modal
          visible={this.state.logoModal}
          transparent
          maskClosable={false}
          // onClose={this.onClose("modal1")}
          title="酒店标题"
          footer={[
            {
              text: "Ok",
              onPress: () => {
                this.setState({
                  logoModal: false
                });
              }
            }
          ]}
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <TextareaItem
            title="标题"
            placeholder="auto focus in Alipay client"
            data-seed="logId"
            ref={el => (this.autoFocusInst = el)}
            autoHeight
          />
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttons: {
    marginTop: 10,
    padding: 20
  }
});
