import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import KPActionSheet from './KPActionSheet';

export default class KPTouchableActionSheet extends React.PureComponent {
    static propTypes = {
        /**
         * a list of button titles (required)
         * @type string[]
         * @example
         *   ['cancel', 'Apple', 'Banana']
         */
        options: PropTypes.array,

        /**
         * index of cancel button in options
         * @type int
         */
        cancelButtonIndex: PropTypes.number,

        /**
         * index of destructive button in options
         * @type int
         */
        destructiveButtonIndex: PropTypes.number,

        /**
         * a title to show above the action sheet
         * @type string
         */
        title: PropTypes.string,

        /**
         * a message to show below the title
         * @type string
         */
        message: PropTypes.string,

        /**
         * the color used for non-destructive button titles
         * @type string
         * @see http://facebook.github.io/react-native/docs/colors.html
         */
        tintColor: PropTypes.string,

        /**
         * The 'callback' function takes one parameter, the zero-based index of the selected item
         * @type (buttonIndex) => void
         * @example
         *   (buttonIndex) => if (buttonIndex === 1) { // do something }
         */
        onSelection: PropTypes.func,

        /**
         * TouchableOpacity/View style
         */
        containerStyle: PropTypes.any,

        /**
         * TouchableOpacity
         */
        TouchableComponent: PropTypes.any,
    };

    static defaultProps = {
        TouchableComponent: TouchableOpacity,
    };

    constructor(props) {
        super(props);
        this.sheet;
    }

    render() {
        const {
            TouchableComponent,
            containerStyle,
            children,
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
            title,
            message,
            tintColor,
            onSelection,
            ...restProps
        } = this.props;

        return (
            <TouchableComponent
                style={containerStyle}
                onPress={this._onPress}
                {...restProps}
            >
                {children}
                <KPActionSheet
                    ref={_comp => (this.sheet = _comp)}
                    options={options}
                    cancelButtonIndex={cancelButtonIndex}
                    destructiveButtonIndex={destructiveButtonIndex}
                    title={title}
                    message={message}
                    tintColor={tintColor}
                    onSelection={onSelection}
                />
            </TouchableComponent>
        );
    }

    _onPress = () => {
        this.sheet && this.sheet.show();
    };
}
