/**
 * @class
 * @author xukj
 * @date 2018/8/10
 * @description 指示器默认的loading样式
 * 使用方式 <KPLegacyPromptLoadingView show={true} text='加载中' />
 * ps：
 * 1.必须放在页面的root view节点下，否则位置会出现偏差
 * 2.调整偏移offset: { x: 0, y: 0}
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
} from 'react-native';

export default class KPLegacyPromptLoadingView extends React.PureComponent {

    static propTypes = {
        show: PropTypes.bool,   // 是否显示
        text: PropTypes.string, // 显示文字
        offset: PropTypes.any,  // 偏移调整{ x: 0, y: 0 }
    };

    static defaultProps = {
        show: false,
        text: '加载中',
        offset: { x: 0, y: 0}
    };

    componentDidMount() {

    }

    render() {
        const { show, offset, text } = this.props;
        if (show) {
            return (
                <View style={[styles.alert, {left: minPoint.x + offset.x, bottom: minPoint.y - offset.y }]}>
                    <ActivityIndicator size='large' color='white' />
                    <Text style={styles.text} numberOfLines={2}>{text}</Text>
                </View>
            );
        }
        else {
            return null;
        }
    }
}

const { width, height} = Dimensions.get('window');
const minPoint = { x: (width - 110) / 2.0, y: (height - 110) / 2.0 };

const styles = StyleSheet.create({
    alert: {
        position: 'absolute',
        bottom: minPoint.x,
        left: minPoint.y,
        width: 110,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.8,
        borderRadius: 10,
        elevation: 999,
    },
    text: {
        fontSize: 14,
        color: 'white',
        marginTop: 10,
        marginLeft: 8,
        marginRight: 8,
        textAlign: 'center',
    },
});