/**
 * @author xukj
 * @date 2018/11/02
 * @class
 * @description 头像按钮组件
 * 默认显示姓名的第一个字符，如果设置了source或defaultSource，则会覆盖text
 */
import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, Image as NativeImage } from "react-native";
import KPCachedImage from "./KPCachedImage";

const imageHoc = Component => {
    class WrappedComponent extends React.PureComponent {
        static propTypes = {
            name: PropTypes.string,
            size: PropTypes.number,
            style: PropTypes.any,
            titleStyle: PropTypes.any,
            imageStyle: PropTypes.any,
            source: NativeImage.propTypes.source,
            defaultSource: NativeImage.propTypes.defaultSource,
            onPress: PropTypes.func,
            useFirstword: PropTypes.bool, // 使用第一个字符
            numberOfLines: PropTypes.number,
        };

        static defaultProps = {
            size: 40,
            name: "",
            numberOfLines: 1,
        };

        constructor(props) {
            super(props);
        }

        render() {
            const { 
                name, 
                size, 
                style, 
                titleStyle, 
                useFirstword,
                numberOfLines,
                ...restProps 
            } = this.props;

            const showName = !!name && useFirstword ? name.substr(0, 1) : name;

            return (
                <Component
                    style={[
                        styles.header,
                        style,
                        { borderRadius: size / 2, width: size, height: size },
                    ]}
                    resizeMode="contain"
                    {...restProps}
                >
                    <Text style={[styles.headerName, titleStyle]} numberOfLines={numberOfLines}>
                        {showName}
                    </Text>
                </Component>
            );
        }
    }

    return WrappedComponent;
};

const styles = StyleSheet.create({
    header: {
        overflow: "hidden",
        backgroundColor: "lightgrey",
        alignItems: "center",
        justifyContent: "center"
    },
    headerName: {
        fontSize: 16,
        zIndex: -1,
        padding: 4,
    }
});

export default imageHoc(KPCachedImage);
