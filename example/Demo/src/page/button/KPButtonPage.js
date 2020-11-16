/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 界面展示组件KPButtonPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { KPButton, KPWhiteSpace } from "react-native-kpframework-ui";

export default class KPButtonPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.page}>
        {this._button01()}
        <KPWhiteSpace />
        {this._button02()}
        <KPWhiteSpace />
        {this._button03()}
      </View>
    );
  }

  _button01 = () => {
    return (
      <KPButton
        style={[
          styles.button,
          {
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#d5d5d5"
          }
        ]}
        round
      >
        <Text>Normal Button</Text>
      </KPButton>
    );
  };

  _button02 = () => {
    return (
      <KPButton style={[styles.button]} round backgroundColor="#378cdc">
        <Text style={{ color: "white" }}>Background Button</Text>
      </KPButton>
    );
  };

  _button03 = () => {
    return (
      <KPButton
        style={[styles.button]}
        round
        backgroundColor="#9A9A9A"
        disabled
      >
        <Text style={{ color: "white" }}>Disabled Button</Text>
      </KPButton>
    );
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 240,
    height: 50
  }
});
