/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description step
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import {
  KPStep,
  KPWhiteSpace,
  KPTextButton
} from "react-native-kpframework-ui";

export default class KPStepCustomPage extends React.PureComponent {
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
        <KPWhiteSpace />
        <KPStep current={4} status="error">
          <this._item title="第1步" content="内容" description="描述" />
          <this._item title="第2步" content="内容" description="描述" />
          <this._item title="第3步" content="内容" description="描述" />
          <this._item title="第4步" />
          <this._item title="第5步" />
          <this._item title="第6步" content="内容" description="描述" />
          <this._item title="第7步" content="内容" description="描述" />
        </KPStep>
      </ScrollView>
    );
  }

  _item = props => {
    const {
      index,
      status,
      current,
      total,
      title,
      content,
      description
    } = props;

    let headColor = "lightgrey";
    let lineColor = "lightgrey";
    if (index < current) {
      headColor = "green";
      lineColor = "green";
    } else if (index == current && status == "finish") {
      headColor = "green";
      lineColor = "green";
    } else if (index == current && status == "error") {
      headColor = "red";
      lineColor = "lightgrey";
    } else {
      // do nothing
    }

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={[styles.head, { borderColor: headColor }]}>
            <Text>{title}</Text>
          </View>
          {index < total - 1 && (
            <View style={[styles.line, { backgroundColor: lineColor }]} />
          )}
        </View>
        <View style={styles.right}>
          <Text style={styles.content}>{content}</Text>
          <KPWhiteSpace />
          <Text style={styles.description}>{description}</Text>
          <KPWhiteSpace size={40} />
          <View style={{ flexDirection: "row" }}>
            <KPTextButton
              style={styles.button}
              title="确定"
              titleColor="white"
              backgroundColor="#378cdc"
              underlayColor="#378cdc"
            />
            <KPWhiteSpace vertical />
            <KPTextButton
              style={styles.button}
              title="申述"
              titleColor="white"
              backgroundColor="#d5d5d5"
            />
          </View>
          <KPWhiteSpace size={40} />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  left: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 80
  },
  head: {
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "lightgrey"
  },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: "lightgrey"
  },
  right: {
    flex: 1,
    minHeight: 60
  },
  content: {
    fontSize: 16,
    marginTop: 6
  },
  description: {
    fontSize: 14,
    color: "grey"
  },
  button: {
    width: 60,
    height: 30
  }
});
