/**
 * @author xukj
 * @date 2018/10/9
 * @description 展示界面组件 KPPagerList
 * 支持分页的FlatList，自动完成分页的功能(刷新、加载更多、没有更多数据)
 * 支持FlatList的所有props，为了避免使用时与分页功能冲突，推荐仅使用style 和 renderItem
 * ps: 暂时还未支持redux
 *
 * 支持手动刷新方法reload
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Pager from './KPPager';

const LoadMoreComponent = () => (
    <ActivityIndicator size="small" style={styles.loadMore} />
);
const NoMoreComponent = () => <Text style={styles.noMore}>没有更多数据</Text>;

export default class KPPagerList extends React.PureComponent {
    static propTypes = {
        // 默认数据
        defaultData: PropTypes.array,
        // 是否刷新数据，在第一次创建时会获取第一页数据
        reload: PropTypes.bool,
        // 分页器
        pager: PropTypes.any,
        // 数据处理后转换为FlatList的props
        mapDataToProps: PropTypes.func,
        // 附加数据处理后转换为FlatList的props
        mapOtherToProps: PropTypes.func,
        // 加载状态处理后转换为FlatList的props
        // refreshing: 刷新, loading: 是否正在请求中
        mapLoadingToProps: PropTypes.func,
        // 错误状态处理后转换为FlatList的props
        mapErrorToProps: PropTypes.func,
        // 监听加载状态变化 {refreshing, data, other, error}
        onLoadStateChanged: PropTypes.func,
        // v2
        // 分页加载更多的样式
        KPListLoadMoreComponent: PropTypes.any,
        // 分页加载到最后的样式
        KPListNoMoreComponent: PropTypes.any,
        // 加载完成后空界面.该空界面会覆盖掉header和footer,如果需要显示footer和header,请设置为null
        KPListEmptyComponent: PropTypes.any,
    };

    static defaultProps = {
        defaultData: [],
        reload: true,
        pager: Pager.of(25, undefined),
        mapDataToProps: data => ({ data }),
        mapOtherToProps: other => {},
        mapLoadingToProps: (refreshing, loading) => ({ refreshing, loading }),
        mapErrorToProps: error => ({ error }),
        onLoadStateChanged: values => {},
        // v2
        KPListLoadMoreComponent: LoadMoreComponent,
        KPListNoMoreComponent: NoMoreComponent,
    };

    /**
     * @description 刷新数据
     */
    reload = () => {
        this._reload();
    };

    constructor(props) {
        super(props);
        this.state = {
            data: props.defaultData, // 数据
            refreshing: false, // 是否刷新
            error: undefined, // 错误
            loading: false, // 是否加载
            other: undefined, // 扩展数据
        };
    }

    componentDidMount() {
        if (this.props.reload) this._reload();
    }

    render() {
        const { data, refreshing, loading, error, other } = this.state;
        const {
            mapDataToProps,
            mapOtherToProps,
            mapLoadingToProps,
            mapErrorToProps,
            KPListEmptyComponent,
            ListEmptyComponent,
            ...restProps
        } = this.props;

        const dataProps = mapDataToProps(data);
        const otherProps = mapOtherToProps(other);
        const loadingProps = mapLoadingToProps(refreshing, loading);
        const errorProps = mapErrorToProps(error);

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
                    onRefresh={this._reload}
                    onEndReachedThreshold={0.2}
                    onEndReached={this._loadMore(dataProps, loadingProps)}
                    ListFooterComponent={this._getFooterComponent(loadingProps)}
                    ListEmptyComponent={this._getEmptyComponent(
                        loadingProps,
                        dataProps,
                        errorProps,
                        ListEmptyComponent,
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    {...restProps}
                    {...dataProps}
                    {...loadingProps}
                    {...errorProps}
                    {...otherProps}
                />
            );
        }
    }

    // 更新状态实现
    _updatePagerState = context => onLoadStateChanged => refreshState => dataState => {
        // 更新加载状态
        // { refreshing, loading }
        // 更新数据
        // { data, error }
        const values = { ...refreshState, ...dataState };
        // 通知外部状态变化
        onLoadStateChanged(values);
        context.setState(values);
    };

    // 分页的状态
    _pagerStates = stateUpdater => () => {
        const startRefreshing = stateUpdater({
            refreshing: true,
            loading: true,
        });
        const startLoadingMore = stateUpdater({
            refreshing: false,
            loading: true,
        });
        const finishLoading = stateUpdater({
            refreshing: false,
            loading: false,
        });
        return { startRefreshing, startLoadingMore, finishLoading };
    };

    // 刷新
    _onRefresh = pagerStates => pager => () => {
        const { startRefreshing, finishLoading } = pagerStates();
        pager.resetPage();
        startRefreshing();
        pager.getNextPage(
            ({ data, other }) => {
                finishLoading({ data: data, other: other });
            },
            error => {
                finishLoading({ error: error });
            },
        );
    };

    // 加载更多
    _onLoadMore = pagerStates => pager => oldData => isLoading => () => {
        const { startLoadingMore, finishLoading } = pagerStates();
        // 正在加载的不处理
        if (isLoading) return;
        startLoadingMore();
        pager.getNextPage(
            ({ data, other }) => {
                const newData = !oldData ? data : oldData.concat(data);
                finishLoading({ data: newData, other: other });
            },
            error => {
                finishLoading({ error: error });
            },
        );
    };

    /**
     * @private
     * @description 底部组件
     */
    _getFooterComponent = ({ refreshing, loading }) => {
        const {
            pager,
            KPListLoadMoreComponent,
            KPListNoMoreComponent,
        } = this.props;

        if (!loading && pager.isLastPage()) {
            return KPListNoMoreComponent;
        }
        
        if (refreshing) {
            return null;
        }
        
        return KPListLoadMoreComponent;
    };

    /**
     * @private
     * @description 空数据组件, 加载中、有错误、有数据、未设置空页面、均不显示空页面
     */
    _getEmptyComponent = (loadingProps, dataProps, errorProps, component) => {
        return component &&
            !loadingProps.loading &&
            dataProps.data &&
            dataProps.data.length <= 0 &&
            !errorProps.error
            ? component
            : null;
    };

    /*
     * @private
     * @description 刷新
     */
    _reload = () => {
        const { pager, onLoadStateChanged } = this.props;
        const stateUpdater = this._updatePagerState(this)(onLoadStateChanged);
        const pagerStates = this._pagerStates(stateUpdater);
        this._onRefresh(pagerStates)(pager)();
    };

    /*
     * @private
     * @description 加载更多
     */
    _loadMore = (dataProps, loadingProps) => (distance) => {
        const { pager, onLoadStateChanged } = this.props;
        const stateUpdater = this._updatePagerState(this)(onLoadStateChanged);
        const pagerStates = this._pagerStates(stateUpdater);
        this._onLoadMore(pagerStates)(pager)(dataProps.data)(
            loadingProps.loading,
        )();
    };
}

const styles = StyleSheet.create({
    loadMore: {
        marginTop: 14,
        marginBottom: 14,
    },
    noMore: {
        flex: 1,
        textAlign: 'center',
        marginTop: 14,
        marginBottom: 14,
        color: 'gray',
    },
});
