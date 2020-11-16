/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPToastPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  KPTextButton,
  KPWhiteSpace,
  KPToast,
  KPToastView
} from "react-native-kpframework-ui";

export default class KPToastPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  componentDidMount() {}

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.page}>
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Normal Toast"
            onPress={() => KPToast.show("Normal Toast")}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="No mask"
            onPress={() => KPToast.show("No Mask", 3, () => {}, false)}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Success"
            onPress={() => KPToast.success("Success")}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Fail"
            onPress={() => KPToast.fail("Fail")}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Help"
            onPress={() => KPToast.help("Help")}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Alert"
            onPress={() => KPToast.alert("Alert")}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Custom Control"
            onPress={this._customShow}
          />
          {this.state.show && <KPToastView content="Custom Control" />}
        </View>
      </ScrollView>
    );
  }

  _customShow = () => {
    this.setState({ show: true });
    setTimeout(() => this.setState({ show: false }), 3000);
  };
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
