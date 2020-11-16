/**
 * @author xukj
 * @date 2019/10/12
 * @class
 * @description 界面展示组件LayoutPage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { KPListCell } from 'react-native-kpframework-ui';

export default class LayoutPage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.data = [
            { title: 'WhiteSpace', action: this._push('KPWhiteSpacePage') },
            { title: 'WingBlank', action: this._push('KPWingBlankPage') },
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

    _push = key => () => {
        if (key) this.props.navigation.navigate(key);
    };
}

const styles = StyleSheet.create({
    cell: {
        height: 50,
        lineHeight: 50,
        paddingLeft: 15,
    },
});
