/**
 * @author xukj
 * @date 2019/01/29
 * @class
 * @description 界面展示组件KPCachedImage 支持缓存的Image控件
 * Support RN 0.52.0
 * 请使用KPCachedImage组件替换旧的KPCommonImage组件。1.3.6版本以后，KPCommonImage不再维护
 *
 * npm react-native-img-cache-kp --save
 * npm install rn-fetch-blob --save
 * react-native link rn-fetch-blob
 * 如果iOS端使用CocoaPods, 则需要在 Podfile 中添加
 * pod 'rn-fetch-blob', :path => '../node_modules/rn-fetch-blob'
 * 控制台执行 pod install
 */
import React from "react";
import PropTypes from "prop-types";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ViewPropTypes,
    Image
} from "react-native";
import { CachedImage, CachedImageBackground } from "react-native-img-cache-kp";

export default class KPCachedImage extends React.PureComponent {
    static propTypes = {
        imageStyle: ViewPropTypes.style,
        style: ViewPropTypes.style,
        onPress: PropTypes.func,
        source: Image.propTypes.source,
        defaultSource: Image.propTypes.defaultSource
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {
            style,
            imageStyle,
            source,
            defaultSource,
            onPress,
            children,
            ...restProps
        } = this.props;

        let ContainerComponent = View;
        if (onPress) ContainerComponent = TouchableOpacity;
        let ImageComponent = CachedImage;
        if (children) ImageComponent = CachedImageBackground;
        const imgSource = source ? source : {};
        const imgSourceDefault = defaultSource ? defaultSource : {};

        return (
            <ContainerComponent
                style={[styles.container, style && style]}
                onPress={onPress}
            >
                <ImageComponent
                    style={[
                        StyleSheet.absoluteFillObject,
                        imageStyle && imageStyle
                    ]}
                    source={imgSource}
                    defaultSource={imgSourceDefault}
                    {...restProps}
                />
                {children}
            </ContainerComponent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden"
    }
});
