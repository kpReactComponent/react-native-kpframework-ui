/**
 * @author xukj
 * @date 2019/07/02
 * @class
 * @description KPCachedImagePage
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { KPTextButton, KPWhiteSpace, KPCachedImage } from 'react-native-kpframework-ui';

export default class KPCachedImagePage extends React.PureComponent {
    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <View style={styles.page}>
                <KPWhiteSpace />
                <KPCachedImage
                    style={styles.header}
                    source={{
                        uri:
                            'https://www.baidu.com/img/flexible/logo/pc/result@2.png',
                    }}
                    width={80}
                    height={80}
                    resizeMode="cover"
                    onPress={this.props.onPress}
                />
                <KPWhiteSpace />
            </View>
        );
    }

    _onPress = () => {};
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F5F5F5',
        overflow: 'hidden',
    },
});
