/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description step
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { KPStep, KPWhiteSpace } from "react-native-kpframework-ui";

export default class KPStepPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this._loadingKey;
    this.state = { show1: false, show2: false };
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <KPStep current={3} >
          <KPStep.Item title="已付款" />
          <KPStep.Item title="订单确认" />
          <KPStep.Item minHeight={120} title="已发货" />
          <KPStep.Item title="等待收货" />
          <KPStep.Item>
            <Text style={{ color: "red" }}>这里是自定义内容</Text>
          </KPStep.Item>
        </KPStep>
        <KPWhiteSpace />
        <KPStep current={3} status="error">
          <KPStep.Item icon title="已付款" />
          <KPStep.Item icon title="订单确认" />
          <KPStep.Item icon title="已发货" />
          <KPStep.Item icon title="退货" />
          <KPStep.Item icon>
            <Text style={{ color: "red" }}>这里是自定义内容</Text>
          </KPStep.Item>
        </KPStep>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth
  }
});
