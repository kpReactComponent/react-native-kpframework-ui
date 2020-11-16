/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPNumberInputListPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { KPListCell } from "react-native-kpframework-ui";

export default class KPNumberInputListPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.data = [
      {
        title: "Normal",
        action: () => this._push("KPNumberInputPage", { type: "normal" })
      },
      {
        title: "Highlight",
        action: () =>
          this._push("KPNumberInputPage", { type: "highlight" })
      },
      {
        title: "Custom",
        action: () =>
          this._push("KPNumberInputPage", { type: "custom" })
      }
    ];
  }

  componentDidMount() {}

  render() {
    return (
      <FlatList
        data={this.data}
        style={{ flex: 1 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
      />
    );
  }

  _renderItem = ({ item }) => {
    return (
      <KPListCell separator arrow onPress={item.action}>
        <Text style={styles.cell}>{item.title}</Text>
      </KPListCell>
    );
  };

  _push = (key, params) => {
    if (key) this.props.navigation.navigate(key, params);
  };
}

const styles = StyleSheet.create({
  cell: {
    height: 50,
    lineHeight: 50,
    paddingLeft: 15
  }
});
