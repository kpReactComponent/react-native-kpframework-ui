/**
 * @author xukj
 * @date 2019/10/12
 * @class
 * @description 占位
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { KPWhiteSpace } from 'react-native-kpframework-ui';

export default class KPWhiteSpacePage extends React.PureComponent {
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
                    <Text style={styles.text}>横向占位</Text>
                    <KPWhiteSpace />
                    <Text style={styles.text}>横向占位</Text>
                    <KPWhiteSpace size={40} />
                    <Text style={styles.text}>横向占位</Text>
                </View>
                <KPWhiteSpace />
                <View style={styles.vertical}>
                    <KPWhiteSpace vertical />
                    <Text style={styles.text}>纵向占位</Text>
                    <KPWhiteSpace vertical />
                    <Text style={styles.text}>纵向占位</Text>
                    <KPWhiteSpace size={40} vertical />
                    <Text style={styles.text}>纵向占位</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    horizontal: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    vertical: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        backgroundColor: '#d5d5d5',
        height: 30,
        textAlign: 'center',
        lineHeight: 30,
    },
});
