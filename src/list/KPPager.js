/**
 * @author xukj
 * @date 2018/7/3
 * @class
 * @description 异步分页器，需要一个异步加载方法Promise
 *
 * 使用方式
 * 1.首先初始化
 const defaultLoader = (pageTo, pageSize) => {
    return new Promise((resolve,reject) => {
        resolve({
            data: [],
            totalPage: 0,
            other: 0,
        });
    });
 };
 const pager = new KPPager(20, loader);
 * 2.获取各个数据
 pager.getNextPage(onSuccess, onFail); 获取下一页数据
 pager.getPreviousPage(onSuccess, onFail); 获取上一页数据
 pager.restPage(); 重置分页器
 pager.isLastPage(); 是否最后一页
 */
export default class KPPager {
    static of(pageSize = 20, promiseLoader = defaultLoader) {
        return new KPPager(pageSize, promiseLoader);
    }

    constructor(pageSize = 20, promiseLoader) {
        this.pageSize = pageSize;
        this.loader = promiseLoader;
        this.other = undefined;
    }

    /**
     * @description 重置分页器
     * @param {func} [onSuccess] (currentPage, data) => {}
     */
    resetPage(onSuccess) {
        this.currentPage = 0;
        this.totalPage = Number.MAX_VALUE;
        this.data = [];
        this.other = undefined;
        if (onSuccess) onSuccess(this._dataForSuccess(this.data));
    }

    /**
     * @description 获取下一页
     * @param {func} [onSuccess] ({data, other}) => {}
     * @param {func} [onFail] (error) => {}
     */
    getNextPage(onSuccess, onFail) {
        let nextPage = this.currentPage + 1;
        // 如果超出了最大数量，返回空
        if (nextPage > this.totalPage) {
            onSuccess(this._dataForSuccess([]));
            return;
        }
        if (!this.loader) {
            return;
        }

        this.loader(nextPage, this.pageSize)
            .then(({ data, other, totalPage }) => {
                this._updatePagerData(nextPage, totalPage, data);
                this._updateOtherData(other);
                onSuccess(this._dataForSuccess(data));
            })
            .catch((error) => {
                // 如果是第一页则需要处理, 防止不停的刷新
                if (nextPage == 1) this.totalPage = 0;
                onFail(error);
            });
    }

    /**
     * @method 获取上一页
     * @param {func} [onSuccess] ({data, other}) => {}
     * @param {func} [onFail] (error) => {}
     */
    getPreviouPage(onSuccess, onFail) {
        let prevPage = this.currentPage - 1;
        // 如果到了第一页, 则直接返回空数据
        if (prevPage <= 0 || prevPage > this.totalPage) {
            onSuccess(this._dataForSuccess([]));
            return;
        }
        if (!this.loader) {
            return;
        }

        this.loader(prevPage, this.pageSize)
            .then(({ data, other, totalPage }) => {
                this._updatePagerData(prevPage, totalPage, data);
                this._updateOtherData(other);
                onSuccess(this._dataForSuccess(data));
            })
            .catch((error) => {
                // 如果是第一页则需要处理, 防止不停的刷新
                if (nextPage == 1) this.totalPage = 0;
                onFail(error);
            });
    }

    /**
     * @description 是否最后一页
     * @return {bool}
     */
    isLastPage() {
        return this.currentPage >= this.totalPage;
    }

    /*
     * private
     * @description 更新分页数据
     */
    _updatePagerData = (currentPage, totalPage, data) => {
        this.totalPage = totalPage;

        if (data.length <= 0) {
            return;
        }

        this.currentPage = currentPage;

        if (currentPage === 1) {
            this.data = data;
        } else {
            this.data = this.data.concat(data);
        }
    };

    /**
     * @private
     * @description 更新other
     */
    _updateOtherData = (other) => {
        this.other = other;
    };

    /*
     * @private
     * @description 分页返回的数据封装
     * @return {data, other}
     */
    _dataForSuccess(data) {
        return { data: data, other: this.other };
    }
}

/**
 * @description 默认的loader
 * @param {number} [pageTo] 页码
 * @param {number} [pageSize] 每页数量
 * @return {Promise} resolve的数据如下
 * 1.data 当前页数据
 * 2.totalPage 总页码
 * 3.other 附加数据(扩展用)
 */
const defaultLoader = (pageTo, pageSize) => {
    return new Promise((resolve, reject) => {
        resolve({
            data: [],
            totalPage: 0,
            other: 0,
        });
    });
};
