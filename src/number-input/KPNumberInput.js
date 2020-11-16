/**
 * @author xukj
 * @date 2019/07/08
 * @class
 * @description KPNumberInput 用来输入验证码等数字控件
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
} from 'react-native';

export default class KPNumberInput extends React.PureComponent {
    static propTypes = {
        number: PropTypes.number,
        editable: PropTypes.bool,
        mode: PropTypes.oneOf(['normal', 'highlight']),
        titleStyle: PropTypes.any,
        normalCellStyle: PropTypes.any,
        highlightCellStyle: PropTypes.any,
        onChangeText: PropTypes.func, // 内容变更
        onSubmitEditing: PropTypes.func,
        cellWidth: PropTypes.number,
        cellHeight: PropTypes.number,
        space: PropTypes.number,
        keyboardType: PropTypes.string,
    };

    static defaultProps = {
        number: 4,
        editable: true,
        mode: 'normal',
        onChangeText: text => {},
        onSubmitEditing: () => {},
        cellWidth: 40,
        cellHeight: 50,
        space: 30,
        highlightCellStyle: { borderColor: '#378cdc' },
        keyboardType: 'numeric',
    };

    focus() {
        this._input.focus();
    }

    clear() {
        this._input.clear();
    }

    constructor(props) {
        super(props);
        this.state = { codes: [] };
    }

    componentDidMount() {}

    render() {
        return this._renderCodes();
    }

    /*
     * @private
     * @description 输入编码container
     */
    _renderCodes = () => {
        const {
            number,
            style,
            cellWidth,
            cellHeight,
            space,
            editable,
            onSubmitEditing,
            keyboardType,
        } = this.props;
        const focusIndex = this.state.codes.length;
        const cells = new Array(number).fill('').map((_, index) => {
            return this._renderCodeCell(index, focusIndex === index);
        });

        // 输入框大小
        const containerSize = {
            width: cellWidth * number + space * number,
            height: cellHeight,
        };

        return (
            <TouchableWithoutFeedback
                style={[style, containerSize]}
                onPress={this._onPress}
            >
                <View style={[styles.container, style, containerSize]}>
                    <TextInput
                        ref={comp => (this._input = comp)}
                        style={styles.backInput}
                        autoFocus={true}
                        autoCorrect={false}
                        keyboardType={keyboardType}
                        maxLength={number}
                        returnKeyLabel="确定"
                        returnKeyType="done"
                        editable={editable}
                        caretHidden={true}
                        blurOnSubmit={true}
                        underlineColorAndroid="transparent"
                        onChangeText={this._onChangeText}
                        onSubmitEditing={onSubmitEditing}
                    />
                    {cells}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /*
     * @private
     * @description 输入编码cell
     */
    _renderCodeCell = (index, highlight) => {
        const { codes } = this.state;
        const {
            mode,
            titleStyle,
            normalCellStyle,
            highlightCellStyle,
            cellWidth,
            cellHeight,
        } = this.props;
        let cellStyle = normalCellStyle;

        const code = codes[index];
        if (mode === 'highlight') {
            cellStyle =
                code && code.length > 0 ? highlightCellStyle : normalCellStyle;
        }
        cellStyle = highlight ? highlightCellStyle : cellStyle;
        const codeStr = code ? code.toUpperCase() : code;

        return (
            <View
                style={[
                    styles.cell,
                    cellStyle,
                    { width: cellWidth, height: cellHeight },
                ]}
                key={index.toString()}
            >
                <Text
                    allowFontScaling={false}
                    style={[styles.cellText, titleStyle]}
                >
                    {codeStr}
                </Text>
            </View>
        );
    };

    /*
     * @private
     * @description 获得焦点
     */
    _onPress = () => {
        if (this._input.isFocused()) {
            Keyboard.dismiss();
        } else {
            this._input.focus();
        }
    };

    _onChangeText = text => {
        let values = [];
        for (let i = 0; i < text.length; i++) {
            values.push(text.charAt(i));
        }
        this.setState({
            codes: values,
        });

        // 通知外部
        this.props.onChangeText(text);
    };
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    backInput: {
        position: 'absolute',
        width: 40,
        opacity: 0,
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    cellText: {
        fontSize: 28,
    },
});
