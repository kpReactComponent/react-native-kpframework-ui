/**
 * @author xukj
 * @date 2018/9/4
 * @description 展示界面组件 KPTextBadge - 右上角文字标识
 * 使用方法
 * 放入需要添加文字标识的组件，容器组件的overflow必须设置visible，否则文字标识可能会被裁剪
 * <Image style={{overflow: 'visible'}}>
 *     <KPTextBadge show={true} text='99' />
 * </Image>
 * 支持通过style prop 扩展
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class KPTextBadge extends React.PureComponent {
    static propTypes = {
        show: PropTypes.bool,
        text: PropTypes.string,
        color: PropTypes.string, // 颜色
        textColor: PropTypes.string,
        textSize: PropTypes.number, // 文字大小
        autoSize: PropTypes.bool, // default - true
        titleStyle: PropTypes.any,
    };

    static defaultProps = {
        autoSize: true,
        color: 'red',
        textColor: 'white',
        textSize: 10,
    };

    constructor(props) {
        super(props);
        this.state = {
            textWidth: undefined,
            textHeight: undefined,
        };
        this._getTextSize = this._getTextSize.bind(this);
    }

    componentDidMount() {}

    render() {
        const { show, text, autoSize } = this.props;
        if (show && text && autoSize) {
            return this._renderAutoSizeBadge(this.props, this.state);
        } else if (show && text && !autoSize) {
            return this._renderCustomBadge(this.props);
        } else {
            return null;
        }
    }

    _renderAutoSizeBadge(props, state) {
        const { text, style, color, textColor, textSize, titleStyle } = props;
        const { textWidth, textHeight } = state;
        return (
            <View
                style={[
                    styles.autoDefaultStyle,
                    { backgroundColor: color },
                    this._getAutoSizeStyle(textWidth, textHeight),
                    style,
                ]}
            >
                <Text
                    style={[
                        styles.titleStyle,
                        { fontSize: textSize, color: textColor },
                        titleStyle,
                    ]}
                    onLayout={this._getTextSize}
                >
                    {text}
                </Text>
            </View>
        );
    }

    _renderCustomBadge(props) {
        const { text, style, titleStyle } = props;
        return (
            <View style={[styles.customDefaultStyle, style]}>
                <Text style={[styles.titleStyle, titleStyle]}>{text}</Text>
            </View>
        );
    }

    /*
     * @private
     * @description autoSize计算样式
     */
    _getAutoSizeStyle(textWidth, textHeight) {
        if (!textWidth || !textHeight) return {};
        const width = textWidth > textHeight ? textWidth + 4 : textHeight;
        const height = textHeight;
        return {
            width: width,
            height: height,
            right: 0 - width / 2,
            top: 0 - height / 2,
            borderRadius: height / 2,
        };
    }

    /*
     * @private
     * @description 计算文字宽度
     */
    _getTextSize({ nativeEvent }) {
        this.setState({
            textWidth: parseInt(nativeEvent.layout.width),
            textHeight: parseInt(nativeEvent.layout.height),
        });
    }
}

const styles = StyleSheet.create({
    autoDefaultStyle: {
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: -9999,
    },
    // 自定义样式时，提供的默认情况
    customDefaultStyle: {
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: -10,
        top: -7,
        width: 20,
        height: 14,
        borderRadius: 7,
    },
    titleStyle: {
        fontSize: 10,
        color: 'white',
        backgroundColor: 'transparent',
    },
});
