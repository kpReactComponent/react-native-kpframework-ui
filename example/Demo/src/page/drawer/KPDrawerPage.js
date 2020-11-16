/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPDrawerPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  KPWhiteSpace,
  KPTextButton,
  KPDrawer
} from "react-native-kpframework-ui";

const screen = Dimensions.get("window");

export default class KPDrawerPage extends React.PureComponent {
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
        <KPTextButton
          style={styles.button}
          title="Top"
          onPress={() =>
            KPDrawer.top(
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>top</Text>
              </View>,
              200
            )
          }
        />
        <KPWhiteSpace />
        <KPTextButton
          style={styles.button}
          title="Left"
          onPress={() =>
            KPDrawer.left(
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>left</Text>
              </View>,
              200
            )
          }
        />
        <KPWhiteSpace />
        <KPTextButton
          style={styles.button}
          title="Bottom"
          onPress={() =>
            KPDrawer.bottom(
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>bottom</Text>
              </View>,
              200
            )
          }
        />
        <KPWhiteSpace />
        <KPTextButton
          style={styles.button}
          title="Right"
          onPress={() =>
            KPDrawer.right(
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>right</Text>
              </View>,
              200
            )
          }
        />
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
