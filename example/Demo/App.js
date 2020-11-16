/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 界面展示组件App
 */
import React from "react";
import AppNavigator from "./src/router/AppNavigator";
import { KPProvider } from "react-native-kpframework-ui";

export default class App extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <KPProvider>
        <AppNavigator />
      </KPProvider>
    );
  }
}
