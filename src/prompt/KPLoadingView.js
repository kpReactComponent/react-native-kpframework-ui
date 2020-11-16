/**
 * @author xukj
 * @date 2019/03/28
 * @class
 * @description 等待框
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,
    View,
    ActivityIndicator,
    Text,
} from 'react-native';
import theme from '../theme';

export default class KPLoadingView extends React.PureComponent {
    static propTypes = {
        content: PropTypes.any,
        duration: PropTypes.number,
        onClose: PropTypes.func,
        mask: PropTypes.bool,
        onAnimationEnd: PropTypes.func,
    };

    static defaultProps = {
        duration: 0,
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
        const { content, mask } = this.props;
        return (
            <View
                style={[styles.container]}
                pointerEvents={mask ? undefined : 'box-none'}
            >
                <View style={[styles.innerContainer]}>
                    <Animated.View style={{ opacity: this.state.fadeAnim }}>
                        <View style={styles.innerWrap}>
                            <ActivityIndicator size="large" color="white" />
                            {content && (
                                <Text style={styles.content}>{content}</Text>
                            )}
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    }
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
        zIndex: theme.prompt_zindex,
    },
    innerContainer: {
        backgroundColor: 'transparent',
    },
    innerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.loading_fill,
        minWidth: 100,
        minHeight: 100,
        paddingVertical: 9,
        paddingHorizontal: 15,
        borderRadius: 3,
    },
    content: {
        color: 'white',
        fontSize: theme.font_size_sm,
        textAlign: 'center',
        marginTop: 8,
    },
});
