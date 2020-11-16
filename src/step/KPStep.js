/**
 * @author xukj
 * @date 2019/12/04
 * @class
 * @description 与 KPStep 配合使用
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import Item from './Item';

export default class KPStep extends React.PureComponent {
    static propTypes = {
        current: PropTypes.number, // 当前节点
        status: PropTypes.oneOf(['wait', 'finish', 'error']), // 由父组件传递
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        status: 'wait',
    };

    static Item = Item;

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { children, current, status, style } = this.props;
        return (
            <View style={style}>
                {React.Children.map(children, (element, index) => {
                    const props = children[index].props;
                    return React.cloneElement(element, {
                        ...props,
                        index,
                        current,
                        total: children.length,
                        status,
                    });
                })}
            </View>
        );
    }
}
