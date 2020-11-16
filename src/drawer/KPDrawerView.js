/**
 * @author xukj
 * @date 2019/03/29
 * @class
 * @description 抽屉
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions,
    View,
} from 'react-native';
import theme from '../theme';

const Bounce = 8; // 弹性长度

const defaultConfig = {
    mask: true, // 是否显示蒙层
    maskColor: 'rgba(0, 0, 0, 0.4)', // 蒙层颜色
    closeable: true, // 是否可以点击蒙层关闭
    drawerColor: 'white', // 抽屉的背景颜色
    bounce: true, // 弹性动画
    duration: 0, // 如果不为0则自动关闭
};

export default class KPDrawerView extends React.PureComponent {
    static propTypes = {
        expand: PropTypes.number,
        position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        children: PropTypes.node,
        onClose: PropTypes.func,
        onAnimationEnd: PropTypes.func,
        config: PropTypes.object, // 相关配置
    };

    static defaultProps = {
        expand: 280,
        position: 'left',
        config: defaultConfig,
    };

    constructor(props) {
        super(props);
        this.animatedValue = this._getAnimatedValue(
            props.position,
            props.expand,
        );
        this.state = {
            translateXY: new Animated.ValueXY({ x: 0, y: 0 }),
            fadeAnim: new Animated.Value(0),
        };
        this.anim = null;
    }

    componentDidMount() {
        this._open();
        const { duration } = this._getDrawerConfig();
        if (duration > 0) setTimeout(this._close, duration * 1000);
    }

    componentWillUnmount() {
        if (this.anim) {
            this.anim.stop();
            this.anim = null;
        }
    }

    render() {
        const { translateXY, fadeAnim } = this.state;
        const { children, position, expand } = this.props;
        const {
            closeable,
            mask,
            maskColor,
            drawerColor,
        } = this._getDrawerConfig();

        this.animatedValue = this._getAnimatedValue(position, expand)

        let TouchComponent = View;
        if (closeable && mask) TouchComponent = TouchableOpacity;

        return (
            <Animated.View
                style={[
                    styles.container,
                    mask && maskColor && { backgroundColor: maskColor },
                    { opacity: fadeAnim },
                ]}
                pointerEvents={mask ? null : 'box-none'}
            >
                <TouchComponent
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={this._close}
                    pointerEvents={mask ? null : 'box-none'}
                >
                    <Animated.View
                        style={[
                            this.animatedValue.initialStyle,
                            drawerColor && { backgroundColor: drawerColor },
                            { transform: translateXY.getTranslateTransform() },
                        ]}
                        onStartShouldSetResponder={
                            this._onStartShouldSetResponder
                        }
                    >
                        {children}
                    </Animated.View>
                </TouchComponent>
            </Animated.View>
        );
    }

    /**
     * 显示侧边组件
     */
    _open = () => {
        if (this.anim) this.anim = null;
        this.animatedValue = this._getAnimatedValue(this.props.position, this.props.expand)
        const { bounce } = this._getDrawerConfig();
        const animateFunc = bounce ? Animated.spring : Animated.timing;
        const drawAnim = animateFunc(this.state.translateXY, {
            toValue: this.animatedValue.openXY,
            duration: 250,
            useNativeDriver: true,
        });
        const fadeAnim = Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
        });
        this.anim = Animated.parallel([drawAnim, fadeAnim], {
            stopTogether: false,
        });
        this.anim.start(() => (this.anim = null));
    };

    /**
     * 关闭侧边组件
     */
    _close = () => {
        if (this.anim) this.anim = null;
        this.animatedValue = this._getAnimatedValue(this.props.position, this.props.expand)
        const timing = Animated.timing;
        const drawAnim = timing(this.state.translateXY, {
            toValue: this.animatedValue.closeXY,
            duration: 250,
            useNativeDriver: true,
        });

        const fadeAnim = timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        });
        this.anim = Animated.parallel([drawAnim, fadeAnim], {
            stopTogether: false,
        });
        this.anim.start(() => {
            this.anim = null;
            if (this.props.onClose) this.props.onClose();
            if (this.props.onAnimationEnd) this.props.onAnimationEnd();
        });
    };

    _onStartShouldSetResponder = evt => {
        return true;
    };

    _getAnimatedValue = (position, expand) => {
        let animatValues = {};
        const window = Dimensions.get('window');
        switch (position) {
            case 'right':
                animatValues = {
                    initialStyle: {
                        left: window.width,
                        top: 0,
                        position: 'absolute',
                        overflow: 'hidden',
                        width: expand + Bounce,
                        paddingRight: Bounce,
                        height: window.height,
                        backgroundColor: 'white',
                    },
                    openXY: { x: 0 - expand, y: 0 },
                    closeXY: { x: expand, y: 0 },
                };
                break;
            case 'top':
                animatValues = {
                    initialStyle: {
                        left: 0,
                        top: 0 - expand - Bounce,
                        position: 'absolute',
                        overflow: 'hidden',
                        width: window.width,
                        height: expand + Bounce,
                        paddingTop: Bounce,
                        backgroundColor: 'white',
                    },
                    openXY: { x: 0, y: expand },
                    closeXY: { x: 0, y: 0 - expand },
                };
                break;
            case 'bottom':
                animatValues = {
                    initialStyle: {
                        left: 0,
                        top: window.height,
                        position: 'absolute',
                        overflow: 'hidden',
                        width: window.width,
                        height: expand + Bounce,
                        paddingBottom: Bounce,
                        backgroundColor: 'white',
                    },
                    openXY: { x: 0, y: 0 - expand },
                    closeXY: { x: 0, y: expand },
                };
                break;
            case 'left':
            default:
                animatValues = {
                    initialStyle: {
                        left: 0 - expand - Bounce,
                        top: 0,
                        position: 'absolute',
                        overflow: 'hidden',
                        width: expand + Bounce,
                        paddingLeft: Bounce,
                        height: window.height,
                        backgroundColor: 'white',
                        overflow: 'hidden',
                    },
                    openXY: { x: expand, y: 0 },
                    closeXY: { x: 0 - expand, y: 0 },
                };
                break;
        }
        return animatValues;
    };

    _getDrawerConfig = () => ({ ...defaultConfig, ...this.props.config });
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        zIndex: theme.modal_zindex,
    },
});
