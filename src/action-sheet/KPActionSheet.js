import React from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    Animated,
    ScrollView,
    Easing,
} from 'react-native';
import * as utils from './utils';
import styles2 from './styles';
import Portal from '../portal';

const WARN_COLOR = '#FF3B30';
const MAX_HEIGHT = Dimensions.get('window').height * 0.9;

export default class KPActionSheet extends React.PureComponent {
    static propTypes = {
        /**
         * a list of button titles (required)
         * @type string[]
         * @example
         *   ['cancel', 'Apple', 'Banana']
         */
        options: PropTypes.array,

        /**
         * index of cancel button in options
         * @type int
         */
        cancelButtonIndex: PropTypes.number,

        /**
         * index of destructive button in options
         * @type int
         */
        destructiveButtonIndex: PropTypes.number,

        /**
         * a title to show above the action sheet
         * @type string
         */
        title: PropTypes.string,

        /**
         * a message to show below the title
         * @type string
         */
        message: PropTypes.string,

        /**
         * the color used for non-destructive button titles
         * @type string
         * @see http://facebook.github.io/react-native/docs/colors.html
         */
        tintColor: PropTypes.string,

        /**
         * The 'callback' function takes one parameter, the zero-based index of the selected item
         * @type (buttonIndex) => void
         * @example
         *   (buttonIndex) => if (buttonIndex === 1) { // do something }
         */
        onSelection: PropTypes.func,
    };

    static defaultProps = {
        options: [],
        tintColor: '#007AFF',
        buttonUnderlayColor: '#F4F4F4',
        onSelection: (index) => {},
        styles: {},
    };

    constructor(props) {
        super(props);
        this.scrollEnabled = false;
        this.translateY = this._calculateHeight(props);
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY),
            maskAnim: new Animated.Value(0),
        };
        this.anim;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.translateY = this._calculateHeight(nextProps);
    }

    componentWillUnmount() {
        this.anim && this.anim.stop();
        this.anim = null;
    }

    get styles() {
        const { styles } = this.props;
        const obj = {};
        Object.keys(styles2).forEach(key => {
            const arr = [styles2[key]];
            if (styles[key]) {
                arr.push(styles[key]);
            }
            obj[key] = arr;
        });
        return obj;
    }

    show = () => {
        this.setState({ visible: true }, () => {
            this._showSheet();
        });
    };

    hide = index => {
        this._hideSheet(() => {
            this.setState({ visible: false }, () => {
                this.props.onSelection(index);
            });
        });
    };

    render() {
        const styles = this.styles;
        const { visible, sheetAnim, maskAnim } = this.state;

        if (visible) {
            return (
                <Portal>
                    <Animated.View
                        style={[styles.wrapper, { opacity: maskAnim }]}
                    >
                        <Text style={[styles.overlay]} onPress={this._cancel} />
                        <Animated.View
                            style={[
                                styles.body,
                                {
                                    height: this.translateY,
                                    transform: [{ translateY: sheetAnim }],
                                },
                            ]}
                        >
                            {this._renderTitle()}
                            {this._renderMessage()}
                            <ScrollView scrollEnabled={this.scrollEnabled}>
                                {this._renderOptions()}
                            </ScrollView>
                            {this._renderCancelButton()}
                        </Animated.View>
                    </Animated.View>
                </Portal>
            );
        } else {
            return null;
        }
    }

    _cancel = () => {
        const { cancelButtonIndex } = this.props;
        // 保持和 ActionSheetIOS 一致，
        // 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheet
        if (utils.isset(cancelButtonIndex)) {
            this.hide(cancelButtonIndex);
        }
    };

    _showSheet = () => {
        this.anim && this.anim.stop();
        this.anim = null;

        this.anim = Animated.parallel(
            [
                Animated.timing(this.state.maskAnim, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.sheetAnim, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ],
            { stopTogether: true },
        );

        this.anim.start(() => (this.anim = null));
    };

    _hideSheet(callback) {
        this.anim && this.anim.stop();
        this.anim = null;

        this.anim = Animated.parallel(
            [
                Animated.timing(this.state.maskAnim, {
                    toValue: 0,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.sheetAnim, {
                    toValue: this.translateY,
                    duration: 200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ],
            { stopTogether: true },
        );

        this.anim.start(() => {
            callback && callback();
            this.anim = null;
        });
    }

    /**
     * elements: titleBox, messageBox, buttonBox, cancelButtonBox
     * box size: height, marginTop, marginBottom
     */
    _calculateHeight(props) {
        const styles = this.styles;

        const getHeight = name => {
            const style = styles[name][styles[name].length - 1];
            let h = 0;
            ['height', 'marginTop', 'marginBottom'].forEach(attrName => {
                if (typeof style[attrName] !== 'undefined') {
                    h += style[attrName];
                }
            });
            return h;
        };

        let height = 0;
        if (props.title) height += getHeight('titleBox');
        if (props.message) height += getHeight('messageBox');
        if (utils.isset(props.cancelButtonIndex)) {
            height += getHeight('cancelButtonBox');
            height += (props.options.length - 1) * getHeight('buttonBox');
        } else {
            height += props.options.length * getHeight('buttonBox');
        }

        if (height > MAX_HEIGHT) {
            this.scrollEnabled = true;
            height = MAX_HEIGHT;
        } else {
            this.scrollEnabled = false;
        }

        return height;
    }

    _renderTitle() {
        const { title } = this.props;
        const styles = this.styles;
        if (!title) return null;
        return (
            <View style={styles.titleBox}>
                {React.isValidElement(title) ? (
                    title
                ) : (
                    <Text style={styles.titleText}>{title}</Text>
                )}
            </View>
        );
    }

    _renderMessage() {
        const { message } = this.props;
        const styles = this.styles;
        if (!message) return null;
        return (
            <View style={styles.messageBox}>
                {React.isValidElement(message) ? (
                    message
                ) : (
                    <Text style={styles.messageText}>{message}</Text>
                )}
            </View>
        );
    }

    _renderCancelButton() {
        const { options, cancelButtonIndex } = this.props;
        if (!utils.isset(cancelButtonIndex)) return null;
        return this._createButton(
            options[cancelButtonIndex],
            cancelButtonIndex,
        );
    }

    _createButton(title, index) {
        const styles = this.styles;
        const {
            buttonUnderlayColor,
            cancelButtonIndex,
            destructiveButtonIndex,
            tintColor,
        } = this.props;
        const fontColor =
            destructiveButtonIndex === index ? WARN_COLOR : tintColor;
        const buttonBoxStyle =
            cancelButtonIndex === index
                ? styles.cancelButtonBox
                : styles.buttonBox;
        return (
            <TouchableHighlight
                key={index}
                activeOpacity={1}
                underlayColor={buttonUnderlayColor}
                style={buttonBoxStyle}
                onPress={() => this.hide(index)}
            >
                {React.isValidElement(title) ? (
                    title
                ) : (
                    <Text style={[styles.buttonText, { color: fontColor }]}>
                        {title}
                    </Text>
                )}
            </TouchableHighlight>
        );
    }

    _renderOptions() {
        const { cancelButtonIndex } = this.props;
        return this.props.options.map((title, index) => {
            return cancelButtonIndex === index
                ? null
                : this._createButton(title, index);
        });
    }
}
