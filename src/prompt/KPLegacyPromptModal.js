/**
 * @class
 * @author xukj
 * @date 2018/8/10
 * @description 加载提示框 modal样式，会阻止后面的手势接收，必须关闭后才能继续操作
 * 使用方式 <KPLegacyPromptModal show={true} text='加载中' />
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import KPLegacyPromptLoadingView from './KPLegacyPromptLoadingView';


export default class KPLegacyPromptModal extends React.PureComponent {

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
            <Modal
                animationType='fade'
                transparent={true}
                visible={show}
                onRequestClose={() => {}}
            >
                <KPLegacyPromptLoadingView show={true} text={text} />
            </Modal>
        );
    }
}