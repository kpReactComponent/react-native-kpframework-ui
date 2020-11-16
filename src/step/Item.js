/**
 * @author xukj
 * @date 2019/12/04
 * @class
 * @description 必须与 KPStep 一同使用
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Item extends React.PureComponent {
    static propTypes = {
        index: PropTypes.number, // 由父组件传递
        total: PropTypes.number, // 由父组件传递
        current: PropTypes.number, // 由父组件传递
        status: PropTypes.oneOf(['wait', 'finish', 'error']), // 由父组件传递

        icon: PropTypes.bool, // true - 头部展示图标; false - 头部展示数字
        waitColor: PropTypes.string,
        doneColor: PropTypes.string,
        errorColor: PropTypes.string,
        size: PropTypes.number,
        titleStyle: Text.propTypes.style,
        numberStyle: Text.propTypes.style,
        minHeight: PropTypes.number,
        leftMinWidth: PropTypes.number, // 左边最小宽度
    };

    static defaultProps = {
        size: 20,
        waitColor: 'lightgrey',
        doneColor: '#3CB371',
        errorColor: 'red',
        minHeight: 60,
        leftMinWidth: 0,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const {
            index,
            title,
            titleStyle,
            minHeight,
            children,
            leftMinWidth,
        } = this.props;
        
        const line = this._getLineColor();

        return (
            <View style={styles.container} key={index}>
                <View style={[styles.left, { minWidth: leftMinWidth }]}>
                    {this._getHead()}
                    {this._getLines()}
                </View>
                <View style={[styles.right, { minHeight: minHeight }]}>
                    {!!title && (
                        <Text style={[styles.content, titleStyle]}>
                            {title}
                        </Text>
                    )}
                    {children}
                </View>
            </View>
        );
    }

    _getHead = () => {
        const {
            waitColor,
            doneColor,
            errorColor,
            current,
            status,
            index,
            icon,
            size,
            numberStyle,
        } = this.props;

        let name = '';
        let color = waitColor;

        if (current > index) {
            // 已完成节点
            color = doneColor;
            name = 'check-circle';
        } else if (current == index) {
            // 当前节点
            switch (status) {
                case 'finish':
                    color = doneColor;
                    name = 'check-circle';
                    break;
                case 'error':
                    color = errorColor;
                    name = 'close-circle';
                    break;
                case 'wait':
                default:
                    color = waitColor;
                    name = 'checkbox-blank-circle';
                    break;
            }
        } else {
            color = waitColor;
            name = 'checkbox-blank-circle';
        }

        if (icon) {
            // 使用图标
            return (
                <Icon
                    name={name}
                    type="material-community"
                    color={color}
                    size={size}
                />
            );
        }
        else {
            // 使用数字
            return (
                <View
                    style={[
                        styles.head,
                        {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            backgroundColor: color,
                        },
                    ]}
                >
                    <Text style={[styles.headTitle, numberStyle]}>
                        {index + 1}
                    </Text>
                </View>
            );
        }
    };

    _getLines = () => {
        const {index, total} = this.props;
        const line = this._getLineColor();
        return index < total - 1 ? [
            <View key={`${index}-t`} style={[styles.line, { backgroundColor: line.top }]} />,
            <View key={`${index}-b`} style={[styles.line, { backgroundColor: line.bottom }]} />
        ] : null;
    }

    _getLineColor = () => {
        const {
            waitColor,
            doneColor,
            errorColor,
            current,
            status,
            index,
        } = this.props;
        let top = waitColor;
        let bottom = waitColor;

        if (current <= index) {
            // do nothing
        } else if (current == index + 1) {
            top = doneColor;
            switch (status) {
                case 'finish':
                    bottom = doneColor;
                    break;
                case 'error':
                    bottom = errorColor;
                    break;
                case 'wait':
                default:
                    bottom = waitColor;
                    break;
            }
        } else {
            top = doneColor;
            bottom = doneColor;
        }

        return { top, bottom };
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    left: {
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    head: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headTitle: {
        textAlign: 'center',
        fontSize: 12,
        color: 'white',
    },
    line: {
        flex: 1,
        width: 2,
    },
    right: {
        flex: 1,
        flexWrap: 'wrap',
    },
    content: {
        fontSize: 16,
    },
});
