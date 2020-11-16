/**
 * @author xukj
 * @date 2019/12/06
 * @class
 * @description
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import {
    KPTouchableActionSheet,
    KPButton,
    KPActionSheet,
} from 'react-native-kpframework-ui';

export default class ActionSheetPage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    state = {
        title1: '请选择',
        index1: -1,
        title2: '请选择',
        index2: -1,
    };

    options1 = [
        '2019-01-01',
        '2019-01-02',
        '2019-01-03',
        '2019-01-04',
        '2019-01-05',
        '2019-01-06',
        '2019-01-07',
        '2019-01-08',
        '2019-01-09',
        '2019-01-10',
        '2019-01-11',
        '2019-01-12',
        '2019-01-13',
        '2019-01-14',
        '2019-01-15',
        '2019-01-16',
        '2019-01-17',
        '2019-01-18',
        '2019-01-19',
        '2019-01-20',
        '2019-01-21',
        '2019-01-22',
        '2019-01-23',
        '2019-01-24',
        '取消',
    ];

    options2 = [
        '北京',
        '上海',
        '天津',
        '深圳',
        '重庆',
        '广州',
        '杭州',
        '南京',
        '武汉',
        '成都',
        '西安',
        '取消',
    ];

    componentDidMount() {}

    render() {
        return (
            <View style={styles.page}>
                <KPTouchableActionSheet
                    ref={_comp => (this.shee1 = _comp)}
                    title="标题"
                    message="这个是副标题"
                    containerStyle={styles.button}
                    options={this.options1}
                    cancelButtonIndex={this.options1.length - 1}
                    destructiveButtonIndex={this.state.index1}
                    onSelection={this._onSelection1}
                >
                    <Text>ActionSheet按钮</Text>
                    <Text style={{ color: 'grey' }}>{this.state.title1}</Text>
                </KPTouchableActionSheet>
                <KPButton style={styles.button} onPress={this._onPress2}>
                    <Text>按钮绑定ActionSheet</Text>
                    <Text style={{ color: 'grey' }}>{this.state.title2}</Text>
                    <KPActionSheet
                        ref={_comp => (this.sheet2 = _comp)}
                        title="城市"
                        message="这个是重点城市列表（部分）"
                        containerStyle={styles.button}
                        options={this.options2}
                        cancelButtonIndex={this.options2.length - 1}
                        destructiveButtonIndex={this.state.index2}
                        onSelection={this._onSelection2}
                    />
                </KPButton>
            </View>
        );
    }

    _onSelection1 = index => {
        this.setState({
            title1:
                index >= this.options1.length - 1
                    ? '请选择'
                    : this.options1[index],
            index1: index,
        });
    };

    _onPress2 = () => {
        this.sheet2 && this.sheet2.show();
    };

    _onSelection2 = index => {
        this.setState({
            title2:
                index >= this.options2.length - 1
                    ? '请选择'
                    : this.options2[index],
            index2: index,
        });
    };
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    button: {
        height: 44,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
});
