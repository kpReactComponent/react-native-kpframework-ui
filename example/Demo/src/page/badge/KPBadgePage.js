/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPBadgePage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import {
  KPWhiteSpace,
  KPTextButton,
  KPBadge
} from "react-native-kpframework-ui";

export default class KPBadgePage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.page}>
        <KPWhiteSpace />
        <View style={{ width: 120, height: 40, backgroundColor: "#378cdc" }}>
          <KPBadge.Dot show />
        </View>
        <KPWhiteSpace />
        <View style={{ width: 120, height: 40, backgroundColor: "#378cdc" }}>
          <KPBadge.Dot
            show
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              top: -5,
              right: -5
            }}
          />
        </View>
        <KPWhiteSpace />
        <View style={{ width: 120, height: 40, backgroundColor: "#378cdc" }}>
          <KPBadge.Text show text="999" />
        </View>
        <KPWhiteSpace />
        <View style={{ width: 120, height: 40, backgroundColor: "#378cdc" }}>
          <KPBadge.Text
            show
            text="999"
            style={{ backgroundColor: "yellow" }}
            titleStyle={{
              color: "black",
              fontSize: 20,
              fontWeight: "800",
              paddingLeft: 8,
              paddingRight: 8
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    width: 240,
    height: 50,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth
  }
});
