/**
 * @author xukj
 * @date 2019/06/18
 * @class
 * @description 通用按钮，语义定义。因为RN自带的按钮无法自由定制，因此这里使用TouchableOpacity来替代RN提供的Button
 * 使用方法与 TouchableOpacity 一致
 * <KPButton>
 *   <Text>点击</Text>
 * </KPButton>
 * modify by xukj - 2.4.2
 * 添加 disabled/round/onPress/backgroundColor 属性
 */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';

export default class KPButton extends React.PureComponent {
    static propTypes = {
        style: ViewPropTypes.style,
        disabled: PropTypes.bool,
        round: PropTypes.bool,
        onPress: PropTypes.func,
        backgroundColor: PropTypes.string,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        const {
            round,
            style,
            backgroundColor,
            children,
            disabled,
            onPress,
            ...restProps
        } = this.props;
        return (
            <TouchableOpacity
                style={[
                    round && { borderRadius: 4 },
                    backgroundColor && { backgroundColor },
                    style && style,
                ]}
                activeOpacity={0.8}
                disabled={disabled}
                onPress={onPress}
                {...restProps}
            >
                {children}
            </TouchableOpacity>
        );
    }
}
