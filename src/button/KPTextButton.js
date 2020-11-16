/**
 * @author xukj
 * @date 2019/02/21
 * @class
 * @description 文字按钮
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    ViewPropTypes,
} from 'react-native';

export default class KPTextButton extends React.PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        onPress: PropTypes.func,
        title: PropTypes.string,
        titleColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        style: ViewPropTypes.style,
        titleStyle: Text.propTypes.style,
        underlayColor: PropTypes.string,
        round: PropTypes.bool,
    };

    static defaultProps = {
        underlayColor: 'rgba(255, 255, 255, 0.6)',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {
            disabled,
            onPress,
            title,
            titleColor,
            backgroundColor,
            style,
            titleStyle,
            underlayColor,
            round,
            ...restProps
        } = this.props;

        return (
            <TouchableHighlight
                underlayColor={underlayColor}
                disabled={disabled}
                onPress={onPress}
                style={[
                    styles.touch,
                    backgroundColor && { backgroundColor: backgroundColor },
                    round && { borderRadius: 4 },
                    style && style,
                ]}
                activeOpacity={0.8}
                {...restProps}
            >
                <Text
                    style={[
                        styles.title,
                        titleColor && { color: titleColor },
                        titleStyle && titleStyle,
                    ]}
                >
                    {title}
                </Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    touch: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
    },
});
