/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 界面展示组件KPNumberInputPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Platform } from "react-native";
import { KPNumberInput, KPWhiteSpace } from "react-native-kpframework-ui";

export default class KPNumberInputPage extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    const type = this.props.navigation.getParam("type", "normal");
    console.log('type', type);
    let renderComponent = this._renderNormal;
    if (type == "highlight") {
      renderComponent = this._renderHighlight;
    } else if (type == "custom") {
      renderComponent = this._renderCustom;
    }

    return (
      <View style={styles.page}>
        <KPWhiteSpace size={80} />
        {renderComponent()}
      </View>
    );
  }

  _renderNormal = () => {
    return <KPNumberInput />;
  };

  _renderHighlight = () => {
    return <KPNumberInput mode="highlight" number={6} space={10} />;
  };

  _renderCustom = () => {
    return (
      <KPNumberInput
        normalCellStyle={{ borderRadius: 25 }}
        highlightCellStyle={{ borderColor: "red", borderRadius: 25 }}
        titleStyle={{ fontSize: 24, fontWeight: '600', color: "red" }}
        mode="highlight"
        number={4}
        space={10}
        cellWidth={50}
        cellHeight={50}
        keyboardType={Platform.OS == 'ios' ? "numbers-and-punctuation" : "numeric"}
      />
    );
  };
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center"
  }
});
