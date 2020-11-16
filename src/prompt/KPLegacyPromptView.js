/**
 * @class
 * @author xukj
 * @date 2018/8/10
 * @description 加载提示框 view样式，不会阻止后面组件的手势接收
 * 使用方式 <KPLegacyPromptView show={true} text='加载中' />
 * 必须放在页面的root view节点下，否则位置会出现偏差
 */
import React from 'react';
import PropTypes from 'prop-types';
import KPLegacyPromptLoadingView from './KPLegacyPromptLoadingView';

export default class KPLegacyPromptView extends React.PureComponent {

    static propTypes = {
        show: PropTypes.bool,
        text: PropTypes.string,
    };

    static defaultProps = {
        show: false,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { show, text } = this.props;
        return (
            <KPLegacyPromptLoadingView show={show} text={text} />
        );
    }
}