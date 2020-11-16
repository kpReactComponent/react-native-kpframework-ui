/**
 * @author xukj
 * @date 2019/04/03
 * @class
 * @description 提供移除动画
 */
import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import KPDrawerView from './KPDrawerView';

// event
const hideType = 'REACT_NATIVE_KPFRAMEWORK_HIDE_DRAWER';

// static
class KPDrawerController {
    hide = key => {
        DeviceEventEmitter.emit(hideType, key);
    };
}

const control = new KPDrawerController();

export default class KPDrawerControl extends React.PureComponent {
    static hide = control.hide;

    static propTypes = {
        shouldClose: PropTypes.func,
    };

    static defaultProps = {
        shouldClose: key => false,
    };

    componentDidMount() {
        DeviceEventEmitter.addListener(hideType, this._hideByEmit);
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener(hideType, this._hideByEmit);
    }

    render() {
        return (
            <KPDrawerView
                ref={_comp => (this._comp = _comp)}
                {...this.props}
            />
        );
    }

    _hideByEmit = key => {
        if (!key) {
            // 如果没指定key，则关闭所有
            this._comp._close();
            return;
        }

        let should = false;
        if (this.props.shouldClose) should = this.props.shouldClose(key);
        if (!should) return;
        this._comp._close();
    };
}
