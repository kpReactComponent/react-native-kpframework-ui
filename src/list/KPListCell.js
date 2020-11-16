/**
 * @author xukj
 * @date 2018/12/21
 * @class
 * @description 通用的列表cell样式
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { Icon } from 'react-native-elements';
import KPButton from '../button/KPButton';
import theme from '../theme';

export default class KPListCell extends React.PureComponent {
    static propTypes = {
        arrow: PropTypes.bool, // 右边更多箭头
        arrowColor: PropTypes.string,
        arrowSize: PropTypes.number,
        separator: PropTypes.bool, // 分割线
        separatorColor: PropTypes.string,
        onPress: PropTypes.func, // 点击事件
        disabled: PropTypes.bool,
        backgroundColor: PropTypes.string, // 背景色
        style: ViewPropTypes.style, // contentView样式
        containerStyle: ViewPropTypes.style, // cell样式
    };

    static defaultProps = {
        arrowSize: 24,
        arrowColor: theme.color_gray_level_02,
        separatorColor: theme.color_gray_level_02,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {
            arrow,
            arrowSize,
            arrowColor,
            separator,
            separatorColor,
            onPress,
            disabled,
            style,
            containerStyle,
            children,
            backgroundColor,
            ...restProps
        } = this.props;
        let Component = View;
        if (onPress) Component = KPButton;

        return (
            <Component
                style={[containerStyle && containerStyle]}
                onPress={onPress}
                disabled={disabled}
                {...restProps}
            >
                <View
                    style={[
                        styles.contentView,
                        separator && {
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            borderBottomColor: separatorColor,
                        },
                        backgroundColor && { backgroundColor: backgroundColor },
                    ]}
                >
                    <View
                        style={[
                            { flex: 1, overflow: 'hidden' },
                            style && style,
                        ]}
                        key="contentView"
                    >
                        {children}
                    </View>
                    {arrow && (
                        <Icon
                            containerStyle={[
                                styles.arrow,
                                { width: arrowSize, height: arrowSize },
                            ]}
                            type="font-awesome"
                            name="angle-right"
                            size={arrowSize}
                            color={arrowColor}
                        />
                    )}
                </View>
            </Component>
        );
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        marginRight: 8,
        marginLeft: 8,
    },
});
