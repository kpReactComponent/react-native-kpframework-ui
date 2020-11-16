/**
 * @author xukj
 * @date 2018/10/09
 * @class
 * @description 展示界面组件 KPNoPagerList
 * 非分页组件。仅提供查询和结果展示
 * 支持FlatList的所有props，为了避免使用时与提供的功能冲突，推荐仅使用style 和 renderItem
 * ps: 暂时还未支持redux
 *
 * 支持手动刷新方法reload
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';

export default class KPNoPagerList extends React.PureComponent {
    static propTypes = {
        // 加载器，加载时呈现下拉刷新样式
        loader: PropTypes.func,
        // 默认值, 在加载的时候展示
        defaultData: PropTypes.array,
        // 是否创建时加载
        loadFirst: PropTypes.bool,
        // 数据处理后转换为FlatList的props
        mapDataToProps: PropTypes.func,
        // 附加数据处理后转换为FlatList的props
        mapOtherToProps: PropTypes.func,
        // 加载状态处理后转换为FlatList的props
        mapLoadingToProps: PropTypes.func,
        // 错误状态处理后转换为FlatList的props
        mapErrorToProps: PropTypes.func,
        // 监听加载状态变化 {refreshing, data, other, error}
        onLoadStateChanged: PropTypes.func,
        // v2
        KPListEmptyComponent: PropTypes.any,
    };

    static defaultProps = {
        loader: () =>
            new Promise(resolve => {
                setTimeout(
                    () =>
                        resolve({
                            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            other: null,
                        }),
                    3000,
                );
            }),
        defaultData: [],
        loadFirst: true,
        mapDataToProps: data => ({ data }),
        mapOtherToProps: other => ({ other }),
        mapLoadingToProps: refreshing => ({ refreshing }),
        mapErrorToProps: error => ({ error }),
        onLoadStateChanged: values => {},
    };

    /**
     * @description 手动刷新
     * @return
     */
    reload() {
        this._reload();
    }

    constructor(props) {
        super(props);
        this.state = {
            data: props.defaultData,
            other: undefined,
            refreshing: false,
            error: undefined,
        };
    }

    componentDidMount() {
        if (this.props.loadFirst) this._reload();
    }

    render() {
        const { data, refreshing, error, other } = this.state;
        const {
            mapDataToProps,
            mapLoadingToProps,
            mapErrorToProps,
            mapOtherToProps,
            KPListEmptyComponent,
            ListEmptyComponent,
            ...restProps
        } = this.props;

        const dataProps = mapDataToProps(data);
        const loadingProps = mapLoadingToProps(refreshing);
        const errorProps = mapErrorToProps(error);
        const otherProps = mapOtherToProps(other);

        // 加载中、错误、有数据，不显示空页面
        const EmptyComponent = this._getEmptyComponent(
            loadingProps,
            dataProps,
            errorProps,
            KPListEmptyComponent,
        );

        if (EmptyComponent) {
            return <EmptyComponent />;
        } else {
            return (
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={this._getEmptyComponent(
                        loadingProps,
                        dataProps,
                        errorProps,
                        ListEmptyComponent,
                    )}
                    {...restProps}
                    {...dataProps}
                    {...otherProps}
                    {...loadingProps}
                    {...errorProps}
                    onRefresh={this._reload}
                />
            );
        }
    }

    /*
     * private
     * @method 组件状态管理
     */
    _updateState = context => onLoadStateChanged => refreshState => dataState => {
        // refreshState = { refreshing }
        // dataState = { data, error }
        const values = { ...refreshState, ...dataState };
        // 通知外部状态变化
        onLoadStateChanged(values);
        context.setState(values);
    };

    /*
     * private
     * @method 刷新
     */
    _onRefresh = stateUpdater => loader => {
        const startLoading = stateUpdater({ refreshing: true });
        const stopLoading = stateUpdater({ refreshing: false });
        return () => {
            startLoading();
            loader()
                .then(({ data, other }) => {
                    stopLoading({ data: data, other: other });
                })
                .catch(error => {
                    stopLoading({ error: error });
                });
        };
    };

    /*
     * private
     * @method 刷新数据
     */
    _reload = () => {
        const { loader, onLoadStateChanged } = this.props;
        const updateState = this._updateState(this)(onLoadStateChanged);
        this._onRefresh(updateState)(loader)();
    };

    /**
     * @private
     * @description 空数据组件, 加载中、有错误、有数据、未设置空页面、均不显示空页面
     */
    _getEmptyComponent = (loadingProps, dataProps, errorProps, component) => {
        return component &&
            !loadingProps.refreshing &&
            dataProps.data &&
            dataProps.data.length <= 0 &&
            !errorProps.error
            ? component
            : null;
    };
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 14,
        color: '#787878',
    },
});
