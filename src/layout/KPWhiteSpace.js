/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description 空白占位组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import theme from '../theme';

export default class KPWhiteSpace extends React.PureComponent {
    static propTypes = {
        size: PropTypes.number,
        vertical: PropTypes.bool,
        style: ViewPropTypes.style,
    };

    static defaultProps = {
        size: theme.space_size_md,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { style, size, vertical, ...restProps } = this.props;
        return (
            <View
                style={[
                    vertical ? { width: size } : { height: size },
                    style && style,
                ]}
                {...restProps}
            />
        );
    }
}
