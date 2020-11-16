/**
 * @author xukj
 * @date 2019/02/24
 * @class
 * @description 侧边组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Modal,
    Animated,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

// 宽度
const screenWidth = Dimensions.get('window').width;

export default class KPSideView extends React.PureComponent {
    static propTypes = {
        sideWidth: PropTypes.number,
        position: PropTypes.string, // left / right
    };

    static defaultProps = {
        sideWidth: 280,
        position: 'left',
    };

    constructor(props) {
        super(props);
        this.animatedValue = this._getAnimatedValue(
            props.position,
            props.sideWidth,
        );
        this.state = {
            marginLeft: new Animated.Value(this.animatedValue.start),
            visible: false,
        };
    }

    componentDidMount() {}

    render() {
        const { marginLeft, visible } = this.state;
        const { sideWidth, children } = this.props;

        return (
            <Modal
                visible={visible}
                transparent={true}
                onRequestClose={this.close}
                animationType="none"
            >
                <TouchableOpacity
                    style={styles.container}
                    activeOpacity={1}
                    onPress={this.close}
                >
                    <Animated.View
                        style={{
                            width: sideWidth,
                            marginLeft: marginLeft,
                            backgroundColor: 'white',
                        }}
                        onStartShouldSetResponder={
                            this._onStartShouldSetResponder
                        }
                    >
                        {children}
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        );
    }

    /**
     * 显示侧边组件
     */
    open = () => {
        this.setState({ visible: true });
        Animated.timing(this.state.marginLeft, {
            toValue: this.animatedValue.end,
            duration: 250,
        }).start();
    };

    /**
     * 关闭侧边组件
     */
    close = () => {
        this.setState({
            visible: false,
            marginLeft: new Animated.Value(this.animatedValue.start),
        });
    };

    _onStartShouldSetResponder = evt => {
        return true;
    };

    _getAnimatedValue = (position, width) => {
        return position === 'right'
            ? {
                  start: screenWidth,
                  end: screenWidth - width,
              }
            : {
                  start: 0 - width,
                  end: 0,
              };
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flexDirection: 'row',
    },
});
