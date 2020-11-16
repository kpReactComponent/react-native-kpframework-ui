/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 界面展示组件KPTextButtonPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { KPTextButton, KPWhiteSpace } from "react-native-kpframework-ui";

export default class KPTextButtonPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.page}>
        <KPTextButton
          style={styles.button}
          onPress={this._onPress}
          title="Normal Button"
        />
        <KPWhiteSpace />
        <KPTextButton
          style={[styles.button]}
          backgroundColor="#378cdc"
          underlayColor="#378cdc"
          title="Background Button"
          onPress={this._onPress}
        />
        <KPWhiteSpace />
        <KPTextButton
          style={[styles.button]}
          backgroundColor="#378cdc"
          underlayColor="#378cdc"
          round
          onPress={this._onPress}
          title="Round Button"
        />
        <KPWhiteSpace />
        <KPTextButton
          style={[styles.button]}
          title="Color Button"
          backgroundColor="#378cdc"
          underlayColor="#378cdc"
          onPress={this._onPress}
          titleColor="white"
        />
        <KPWhiteSpace />
        <KPTextButton
          style={[styles.button]}
          title="Disabled Button"
          backgroundColor="#d5d5d5"
          titleColor="white"
          onPress={this._onPress}
          titleColor="white"
          disabled
        />
        <KPWhiteSpace />
        <KPTextButton
          style={[
            styles.button,
            {
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: "#d5d5d5",
              borderRadius: 25
            }
          ]}
          titleStyle={{ fontWeight: "800", color: "red" }}
          underlayColor="#d5d5d5"
          title="Custom Button"
          onPress={this._onPress}
        />
      </View>
    );
  }

  _onPress = () => {};
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
