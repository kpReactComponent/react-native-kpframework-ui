/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 界面展示组件HomePage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { KPListCell } from 'react-native-kpframework-ui';

export default class HomePage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.data = [
            { title: 'ActionSheet', action: this._push('ActionSheetPage') },
            { title: 'Layout', action: this._push('LayoutPage') },
            { title: 'Badge', action: this._push('KPBadgePage') },
            { title: 'Button', action: this._push('KPButtonPage') },
            { title: 'TextButton', action: this._push('KPTextButtonPage') },
            { title: 'NumberInput', action: this._push('KPNumberInputListPage') },
            { title: 'Toast', action: this._push('KPToastPage') },
            { title: 'Prompt', action: this._push('KPPromptPage') },
            { title: 'Drawer', action: this._push('KPDrawerPage') },
            { title: 'Navigator', action: this._push('KPNavigationPage') },
            { title: 'PagerList', action: this._push('KPPagerListPage') },
            { title: 'NoPagerList', action: this._push('KPNoPagerListPage') },
            { title: 'DatePicker', action: this._push('KPDatePickerPage') },
            { title: 'CachedImage', action: this._push('KPCachedImagePage') },
            { title: 'Step', action: this._push('StepPage') },
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
