/**
 * @author xukj
 * @date 2019/10/12
 * @class
 * @description 上下/左右留白
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { KPWingBlank, KPWhiteSpace } from 'react-native-kpframework-ui';

export default class KPWingBlankPage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.horizontal}>
                    <KPWhiteSpace />
                    <KPWingBlank>
                        <Text style={styles.text}>左右留白</Text>
                    </KPWingBlank>
                    <KPWhiteSpace />
                    <KPWingBlank size={40}>
                        <Text style={styles.text}>左右留白</Text>
                    </KPWingBlank>
                </View>
                <View style={styles.vertical}>
                    <KPWingBlank vertical size={10}>
                        <Text style={styles.text}>上下留白</Text>
                    </KPWingBlank>
                    <KPWingBlank vertical  size={15}>
                        <Text style={styles.text}>上下留白</Text>
                    </KPWingBlank>
                    <KPWingBlank vertical>
                        <Text style={styles.text}>上下留白</Text>
                    </KPWingBlank>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    text: {
        backgroundColor: '#d5d5d5',
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
    },
    horizontal: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    vertical: {
        flex: 1,
        backgroundColor: 'white',
    },
});
