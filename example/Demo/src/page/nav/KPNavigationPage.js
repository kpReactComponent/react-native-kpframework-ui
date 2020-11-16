/**
 * @author xukj
 * @date 2019/07/03
 * @class
 * @description 界面展示组件KPNavigationPage
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    KPWhiteSpace,
    KPNavigator,
    KPNavigationItems as Items,
    KPToast,
} from 'react-native-kpframework-ui';

export default class KPNavigationPage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.page}>
                    <KPWhiteSpace />
                    <KPNavigator
                        title="返回导航栏"
                        onBackPress={this._onPress}
                    />
                    <KPWhiteSpace />
                    <KPNavigator
                        title="关闭导航栏"
                        closeMode
                        onClosePress={this._onPress}
                    />
                    <KPWhiteSpace />
                    <KPNavigator
                        title="自定义导航栏1"
                        barTintColor="#378cdc"
                        itemTintColor="white"
                        shadow={false}
                        leftIcon="ios-alarm"
                        rightText="点击"
                    />
                    <KPWhiteSpace />
                    <KPNavigator
                        title="自定义导航栏2"
                        barTintColor="#378cdc"
                        itemTintColor="white"
                        titleStyle={{ fontSize: 28, fontWeight: '600' }}
                        shadow={false}
                        onBackPress={this._onPress}
                        backMode={false}
                    />
                    <KPWhiteSpace />
                    <KPNavigator
                        title="自定义导航栏3"
                        barTintColor="#378cdc"
                        itemTintColor="white"
                        leftIcon="star"
                        shadow={false}
                        onLeftPress={() => KPToast.show('点击左边')}
                        renderLeftIconButton={(onPress, name, color) => {
                            return (
                                <Items.IconButton
                                    name={name}
                                    type="material"
                                    size={30}
                                    color={color}
                                    onPress={onPress}
                                />
                            );
                        }}
                        rightText="评分"
                        onRightPress={() => KPToast.show('点击右边')}
                        renderRightTextButton={(onPress, text, color) => {
                            return (
                                <Items.TextButton
                                    text={text}
                                    itemStyle={{
                                        marginRight: 8,
                                        marginLeft: 8,
                                        color: color,
                                    }}
                                    onPress={onPress}
                                />
                            );
                        }}
                    />
                    <KPWhiteSpace />
                    <KPNavigator
                        title="自定义导航栏4"
                        barTintColor="#378cdc"
                        itemTintColor="white"
                        renderLeftButton={() => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        KPToast.show('点击左边自定义按钮')
                                    }
                                >
                                    <Image
                                        resizeMode="contain"
                                        style={{ width: 40, height: 40 }}
                                        source={require('../../assets/wechat_session.png')}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                        renderRightButton={() => {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        KPToast.show('点击右边自定义按钮')
                                    }
                                >
                                    <Image
                                        resizeMode="contain"
                                        style={{ width: 40, height: 40 }}
                                        source={require('../../assets/wechat_tl.png')}
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </ScrollView>
        );
    }

    _onPress = () => {
        this.props.navigation.goBack();
    };
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
    },
});
