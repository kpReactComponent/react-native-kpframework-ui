/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description KPDatePickerPage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { KPWhiteSpace } from 'react-native-kpframework-ui';
import { KPDatePickerTouchable } from 'react-native-kpframework-ui';

export default class KPDatePickerPage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = { date: null };
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.page}>
                <KPWhiteSpace />
                <Text>{this.state.date ? this.state.date : '请选择'}</Text>
                <KPWhiteSpace />
                <KPDatePickerTouchable
                    style={styles.button}
                    onDateChange={this._onDateChange}
                >
                    <Text>日期picker</Text>
                </KPDatePickerTouchable>
                <KPWhiteSpace />
                <KPDatePickerTouchable
                    is24Hour
                    mode="time"
                    style={styles.button}
                    onDateChange={this._onDateChange}
                >
                    <Text>时间picker</Text>
                </KPDatePickerTouchable>
                <KPWhiteSpace />
                <KPDatePickerTouchable
                    style={styles.button}
                    onDateChange={this._onDateChange}
                    getDateStr={date => date.toString()}
                >
                    <Text>自定义返回格式picker</Text>
                </KPDatePickerTouchable>
            </View>
        );
    }

    _onDateChange = date => {
        console.log('date', date);
        this.setState({ date });
    };
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: 280,
        height: 40,
        borderColor: 'gray',
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
