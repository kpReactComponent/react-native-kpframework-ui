/**
 * @author xukj
 * @date 2018/9/4
 * @description 展示界面组件 KPDotBadge - 右上角红点
 * 使用方法
 * 放入需要添加红点标识的组件，容器组件的overflow必须设置visible，否则红点可能会被裁剪
 * <Image style={{overflow: 'visible'}}>
 *     <KPDotBadge show={true} />
 * </Image>
 * 支持通过style prop 扩展
 */

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

export default class KPDotBadge extends React.PureComponent {
    static propTypes = {
        show: PropTypes.bool,
        size: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        size: 4,
        color: 'red',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { show, style, size, color } = this.props;

        const radius = size / 2;

        if (show) {
            return (
                <View
                    style={[
                        {
                            position: 'absolute',
                            width: size,
                            height: size,
                            borderRadius: radius,
                            right: 0 - radius,
                            top: 0 - radius,
                            backgroundColor: color,
                        },
                        style,
                    ]}
                />
            );
        } else {
            return null;
        }
    }
}
