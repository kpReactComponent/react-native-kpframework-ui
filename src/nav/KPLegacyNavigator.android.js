/**
 * @author xukj
 * @date 2018/11/08
 * @class
 * @description 界面展示组件KPNavigator 导航栏
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text as NativeText,
    Dimensions,
} from 'react-native';
import { IconButton, TextButton, Title } from './KPNavigationItems';

export default class KPLegacyNavigator extends React.PureComponent {

    static propTypes = {
        landscape: PropTypes.bool,
        title: PropTypes.string,
        titleStyle: NativeText.propTypes.style,
        renderTitle: PropTypes.func,
        itemTintColor: PropTypes.string,        // 左右按钮的文字、图标颜色
        // 默认样式返回键，优先级最低
        backMode: PropTypes.bool,
        onBackPress: PropTypes.func,
        renderBackButton: PropTypes.func,
        // 默认样式关闭键，优先级中
        closeMode: PropTypes.bool,
        onClosePress: PropTypes.func,
        renderCloseButton: PropTypes.func,
        // 自定义icon或text样式左方按钮，优先级高
        leftIcon: PropTypes.string,
        leftText: PropTypes.string,
        onLeftPress: PropTypes.func,
        renderLeftIconButton: PropTypes.func,
        renderLeftTextButton: PropTypes.func,
        // 自定义icon或text样式右方按钮，优先级高
        rightIcon: PropTypes.string,
        rightText: PropTypes.string,
        onRightPress: PropTypes.func,
        renderRightIconButton: PropTypes.func,
        renderRightTextButton: PropTypes.func,
        // 自定义button，优先级最高
        renderLeftButton: PropTypes.func,
        renderRightButton: PropTypes.func,
    };

    static defaultProps = {
        backMode: true,
        itemTintColor: 'black',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        const { style, landscape, ...restProps } = this.props;
        const width = landscape ? longSide : shortSide;
        return (
            <View
                style={[
                    styles.navigator,
                    { width: width },
                    style && style,
                ]}
                {...restProps}
            >
                <View
                    style={[
                        styles.titleContainer,
                        { width: width },
                    ]}>
                    {this._renderTitle()}
                </View>
                <View
                    style={[
                        styles.itemContainer,
                        { width: width },
                    ]}>
                    {this._renderLeftButton()}
                    {this._renderRightButton()}
                </View>
            </View>
        );
    }

    _renderTitle = () => {
        const { title, titleStyle, renderTitle } = this.props;
        if (renderTitle) {
            return renderTitle(title);
        }
        else {
            return (
                <Title title={title} style={titleStyle} />
            );
        }
    };

    _renderLeftButton = () => {
        const {
            itemTintColor,
            backMode,
            onBackPress,
            renderBackButton,
            closeMode,
            onClosePress,
            renderCloseButton,
            leftIcon,
            leftText,
            renderLeftIconButton,
            renderLeftTextButton,
            onLeftPress,
            renderLeftButton
        } = this.props;

        if (renderLeftButton) {
            return renderLeftButton();
        }

        if (leftText) {
            const renderLeft = renderLeftTextButton ? renderLeftTextButton : this._renderTextButton;
            return renderLeft(onLeftPress, leftText, itemTintColor);
        }

        if (leftIcon) {
            const renderLeft = renderLeftIconButton ? renderLeftIconButton : this._renderIconButton;
            return renderLeft(onLeftPress, leftIcon, itemTintColor);
        }

        if (closeMode) {
            const renderClose = renderCloseButton ? renderCloseButton : this._renderIconButton;
            return renderClose(onClosePress, 'ios-close', itemTintColor);
        }

        if (backMode) {
            const renderBack = renderBackButton ? renderBackButton : this._renderIconButton;
            return renderBack(onBackPress, 'ios-arrow-back', itemTintColor);
        }

        return null;
    };

    _renderRightButton = () => {
        const {
            itemTintColor,
            rightIcon,
            rightText,
            onRightPress,
            renderRightIconButton,
            renderRightTextButton,
            renderRightButton
        } = this.props;

        if (renderRightButton) {
            return renderRightButton();
        }

        if (rightText) {
            const renderRight = renderRightTextButton ? renderRightTextButton : this._renderTextButton;
            return renderRight(onRightPress, rightText, itemTintColor);
        }

        if (rightIcon) {
            const renderRight = renderRightIconButton ? renderRightIconButton : this._renderIconButton;
            return renderRight(onRightPress, rightIcon, itemTintColor);
        }

        return null;
    };

    /**
     * @private
     * @description 文字button
     */
    _renderTextButton = (onPress, text, color) => {
        return (
            <TextButton
                containerStyle={styles.textButtonStyle}
                itemStyle={{ color: color }}
                text={text}
                onPress={onPress}
            />
        );
    };

    /**
     * @private
     * @description 图标button
     */
    _renderIconButton = (onPress, name, color) => {
        return (
            <IconButton
                containerStyle={styles.buttonStyle}
                name={name}
                color={color}
                onPress={onPress}
                itemProps={{ type: 'ionicon' }}
            />
        );
    };
}

const { width, height } = Dimensions.get('window');
const shortSide = Math.min(width, height);
const longSide = Math.max(width, height);

const styles = StyleSheet.create({
    navigator: {
        width: width,
        backgroundColor: 'white',
        height: 50,
        overflow: 'hidden',
    },
    titleContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        width: width,
        height: 50,
    },
    itemContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 0,
        width: width,
        height: 50,
    },
    buttonStyle: {
        width: 44,
        height: 44,
    },
    textButtonStyle: {
        height: 44,
        marginLeft: 10,
        marginRight: 10,
    },
});