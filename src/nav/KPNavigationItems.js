/**
 * @author xukj
 * @date 2018/11/05
 * @description NavigationItems 导航栏定制化
 * 提供导航栏上面的item定制，达到导航栏样式统一的目的。
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text as NativeText,
    ImageBackground as NativeImageBackground,
    Image,
    ViewPropTypes,
} from 'react-native';
import { Icon } from 'react-native-elements';

/**
 * 导航栏标题
 * @param {*} props 组件props
 */
export const Title = props => {
    const { title, style, ...restProps } = props;
    return (
        <NativeText style={[styles.titleStyle, style && style]} {...restProps}>
            {title}
        </NativeText>
    );
};

Title.propTypes = {
    title: PropTypes.string,
};

Title.defaultProps = {};

/**
 * 导航栏icon按钮
 * @param {*} props 组件props
 */
export const IconButton = props => {
    const {
        onPress,
        containerStyle,
        itemStyle,
        name,
        size,
        color,
        itemProps,
        ...restProps
    } = props;

    return (
        <TouchableOpacity
            style={[
                styles.buttonStyle,
                { width: 44 },
                containerStyle && containerStyle,
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            {...restProps}
        >
            <Item
                style={[{ width: size, height: size }, itemStyle]}
                name={name}
                size={size}
                itemType="icon"
                type="navigation"
                color={color}
                underlayColor="transparent"
                {...itemProps}
            />
        </TouchableOpacity>
    );
};

IconButton.propTypes = {
    onPress: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    itemProps: PropTypes.object,
};

IconButton.defaultProps = {
    containerStyle: { width: 44, height: 44 },
    size: 26,
};

/**
 * 导航栏text按钮
 * @param {*} props 组件props
 */
export const TextButton = props => {
    const {
        onPress,
        containerStyle,
        itemStyle,
        text,
        itemProps,
        ...restProps
    } = props;

    return (
        <TouchableOpacity
            style={[styles.buttonStyle, containerStyle && containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}
            {...restProps}
        >
            <Item
                style={[styles.textStyle, itemStyle && itemStyle]}
                text={text}
                itemType="text"
                numberOfLines={1}
                {...itemProps}
            >
                {text}
            </Item>
        </TouchableOpacity>
    );
};

TextButton.propTypes = {
    onPress: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    itemStyle: NativeText.propTypes.style,
    text: PropTypes.string,
    itemProps: PropTypes.object,
};

TextButton.defaultProps = {};

/**
 * 导航栏image按钮
 * @param {*} props 组件props
 */
export const ImageButton = props => {
    const {
        onPress,
        containerStyle,
        itemStyle,
        source,
        itemProps,
        ...restProps
    } = props;

    return (
        <TouchableOpacity
            style={[styles.buttonStyle, containerStyle && containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}
            {...restProps}
        >
            <Item
                style={itemStyle}
                source={source}
                itemType="image"
                {...itemProps}
            />
        </TouchableOpacity>
    );
};

ImageButton.propTypes = {
    onPress: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
    source: Image.propTypes.source,
    itemProps: PropTypes.object,
};

ImageButton.defaultProps = {};

/**
 * 导航栏自定义按钮
 * @param {*} props 组件props
 */
export const CustomButton = props => {
    const {
        onPress,
        containerStyle,
        itemStyle,
        component,
        itemProps,
        ...restProps
    } = props;

    return (
        <TouchableOpacity
            style={[styles.buttonStyle, containerStyle && containerStyle]}
            onPress={onPress}
            activeOpacity={0.8}
            {...restProps}
        >
            <Item
                style={itemStyle}
                component={component}
                itemType="custom"
                {...itemProps}
            />
        </TouchableOpacity>
    );
};

CustomButton.propTypes = {
    onPress: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    itemStyle: PropTypes.any,
    component: PropTypes.any,
    itemProps: PropTypes.object,
};

CustomButton.defaultProps = {
    component: View,
};

/**
 * 导航栏按钮item
 * @param {*} props 组件props
 */
export const Item = props => {
    const {
        style,
        itemType,
        component,
        name,
        size,
        source,
        color,
        text,
        ...restProps
    } = props;

    let Component = View;
    if (itemType === 'text') Component = NativeText;
    if (itemType === 'icon') Component = Icon;
    if (itemType === 'image') Component = NativeImageBackground;
    if (itemType === 'custom') Component = component;

    return (
        <Component
            style={[{ backgroundColor: 'transparent' }, style && style]}
            name={name}
            size={size}
            source={source}
            text={text}
            color={color}
            {...restProps}
        />
    );
};

Item.propTypes = {
    itemType: PropTypes.string,
    component: PropTypes.any,
    name: PropTypes.string,
    size: PropTypes.number,
    source: Image.propTypes.source,
    color: PropTypes.string,
    text: PropTypes.string,
};

Item.defaultProps = {};

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonStyle: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    textStyle: {
        fontSize: 16,
    },
});

export default {
    Title,
    IconButton,
    ImageButton,
    TextButton,
    CustomButton,
    Item,
};