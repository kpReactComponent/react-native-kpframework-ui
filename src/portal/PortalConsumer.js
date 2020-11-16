/**
 * @author xukj
 * @date 2019/03/28
 * @description PortalConsumer
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class PortalConsumer extends React.Component {
    static propTypes = {
        manager: PropTypes.any,
        children: PropTypes.node,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this._key = null;
    }

    componentDidMount() {
        if (!this.props.manager) {
            throw new Error(
                'Looks like you forgot to wrap your root component with `KPProvider` component from `react-native-kpframework-ui`.\n\n',
            );
        }

        this._key = this.props.manager.mount(this.props.children);
    }

    componentDidUpdate() {
        this.props.manager.update(this._key, this.props.children);
    }

    componentWillUnmount() {
        this.props.manager.unmount(this._key);
    }

    render() {
        return null;
    }
}
