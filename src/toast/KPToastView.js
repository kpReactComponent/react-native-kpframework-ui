/**
 * @author xukj
 * @date 2019/03/28
 * @description toast
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Animated, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import theme from '../theme';

export default class KPToastView extends React.PureComponent {
    static propTypes = {
        content: PropTypes.any,
        duration: PropTypes.number,
        onClose: PropTypes.func,
        mask: PropTypes.bool,
        onAnimationEnd: PropTypes.func,
        type: PropTypes.string,
    };

    static defaultProps = {
        duration: 3,
        mask: true,
        onClose: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
        };
        this.anim = null;
    }

    componentDidMount() {
        const { onClose, onAnimationEnd } = this.props;
        const duration = this.props.duration;
        const timing = Animated.timing;
        if (this.anim) {
            this.anim = null;
        }
        const animArr = [
            timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.delay(duration * 1000),
        ];
        if (duration > 0) {
            animArr.push(
                timing(this.state.fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            );
        }
        this.anim = Animated.sequence(animArr);
        this.anim.start(() => {
            if (duration > 0) {
                this.anim = null;
                if (onClose) {
                    onClose();
                }
                if (onAnimationEnd) {
                    onAnimationEnd();
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.anim) {
            this.anim.stop();
            this.anim = null;
        }
    }

    render() {
        const { content, mask, type } = this.props;
        const icon = this._getIconNames(type);
        return (
            <View
                style={[styles.container]}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View style={[styles.innerContainer]}>
                    <Animated.View style={{ opacity: this.state.fadeAnim }}>
                        <View
                            style={[
                                styles.innerWrap,
                                icon ? styles.iconToast : styles.textToast,
                            ]}
                        >
                            {icon && (
                                <Icon
                                    size={40}
                                    color="white"
                                    name={icon}
                                    type="material-community"
                                />
                            )}
                            <Text
                                style={[
                                    styles.content,
                                    icon && {
                                        textAlign: 'center',
                                        marginTop: 4,
                                    },
                                ]}
                            >
                                {content}
                            </Text>
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    }

    _getIconNames = type => {
        const iconNames = {
            success: 'check-circle-outline',
            fail: 'close-circle-outline',
            help: 'help-circle-outline',
            alert: 'alert-circle-outline',
        };
        return iconNames[type];
    };
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: theme.toast_zindex,
    },
    innerContainer: {
        backgroundColor: 'transparent',
        paddingHorizontal: 15,
    },
    innerWrap: {
        alignItems: 'center',
        backgroundColor: theme.toast_fill,
        minWidth: 100,
    },
    textToast: {
        borderRadius: 3,
        paddingVertical: 9,
        paddingHorizontal: 15,
    },
    iconToast: {
        justifyContent: 'center',
        minHeight: 100,
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 3,
    },
    content: {
        color: 'white',
        fontSize: theme.font_size_sm,
        lineHeight: 18,
    },
});
