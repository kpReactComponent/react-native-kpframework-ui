/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPPromptPage
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  KPWhiteSpace,
  KPTextButton,
  KPPrompt,
  KPLoadingView,
} from "react-native-kpframework-ui";

export default class KPPromptPage extends React.PureComponent {
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
        <View style={{ flex: 1, alignItems: "center" }}>
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Show 3 seconds"
            onPress={() => KPPrompt.loading("Show 3 seconds", 3)}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title={this.state.show1 ? "Hide" : "Show"}
            onPress={this._showOrHide}
          />
          <KPWhiteSpace />
          <KPTextButton
            style={styles.button}
            title="Show in page"
            onPress={() => this.setState({ show2: true })}
          />
          {this.state.show2 && (
            <KPLoadingView
              content="Show in page"
              duration={3}
              onClose={() => this.setState({ show2: false })}
            />
          )}
        </View>
      </ScrollView>
    );
  }

  _showOrHide = () => {
    if (this._loadingKey) {
      KPPrompt.hide(this._loadingKey);
      this._loadingKey = null;
      this.setState({ show1: false });
    } else {
      this._loadingKey = KPPrompt.loading("Loading", 0, false);
      this.setState({ show1: true });
    }
  };
}

const styles = StyleSheet.create({
  button: {
    width: 240,
    height: 50,
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
