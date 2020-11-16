/**
 * @author xukj
 * @date 2019/03/28
 * @description Portal
 */
import React from 'react';
import PropTypes from 'prop-types';
import PortalConsumer from './PortalConsumer';
import PortalHost, { portal, PortalContext } from './PortalHost';

/**
 * Portal allows to render a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](portal-host.html) component to be rendered somewhere in the parent tree.
 *
 * ## Usage
 * ```js
 * import React from 'react';
 * import { Text } from 'react-native'
 * import { Portal } from 'react-native-kpframework-ui';
 *
 * export default class MyComponent extends React.Component {
 *   render() {
 *     const { visible } = this.state;
 *     return (
 *       <Portal>
 *         <Text>This is rendered at a different place</Text>
 *       </Portal>
 *     );
 *   }
 * }
 * ```
 */
class Portal extends React.Component {
    static Host = PortalHost;
    static add = portal.add;
    static remove = portal.remove;

    static propTypes = {
        children: PropTypes.node,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;

        return (
            <PortalContext.Consumer>
                {manager => (
                    <PortalConsumer manager={manager}>
                        {children}
                    </PortalConsumer>
                )}
            </PortalContext.Consumer>
        );
    }
}

export default Portal;
