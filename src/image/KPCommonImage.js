/**
 * @author xukj
 * @date 2018/7/26
 * @class
 * @deprecated
 * @description 展示界面组件 KPImage
 * 支持默认图片、默认背景、占位；width和height必须设置否则图片展示会出问题
 *
 * 使用该组件必须执行以下方式来完成必要条件的安装:
 * npm install rn-fetch-blob --save
 * react-native link rn-fetch-blob
 *
 * 如果iOS端使用CocoaPods, 则需要在 Podfile 中添加
 * pod 'rn-fetch-blob', :path => '../node_modules/rn-fetch-blob'
 * 控制台执行 pod install
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { CachedImage } from 'react-native-img-cache-kp';

export default class KPCommonImage extends React.PureComponent {

    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        source: PropTypes.any,
        defaultSource: PropTypes.any,   //默认背景，优先展示
        onPress: PropTypes.func,
        androidStyle: PropTypes.any,    //android上面有bug，这里添加一个props提供给外部使用
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        const {
            width,
            height,
            style,
            defaultSource,
            source,
            onPress,
            children,
            androidStyle,
            ...restProps
        } = this.props;

        const size = { width, height };
        const showSource = source ? source : {};
        let Component = View;
        if (onPress) Component = TouchableOpacity;

        return (
            <Component
                style={[
                    styles.container,
                    style,
                    size,
                ]}
                onPress={onPress}
            >
                {defaultSource &&
                    <Image
                        style={[
                            StyleSheet.absoluteFill, 
                            size,
                            Platform.OS == 'android' ? androidStyle : undefined,
                        ]}
                        source={defaultSource}
                        {...restProps}
                    />}
                <CachedImage
                    style={[
                        StyleSheet.absoluteFill, 
                        size,
                        Platform.OS == 'android' ? androidStyle : undefined,
                    ]}
                    source={showSource}
                    {...restProps}
                />
                {children}
            </Component>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});