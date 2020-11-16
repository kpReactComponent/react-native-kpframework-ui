/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description KPNoPagerListPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { KPWhiteSpace } from "react-native-kpframework-ui";

export default class KPNoPagerListPage extends React.PureComponent {
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
        <Text>Will Coming in the future</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
