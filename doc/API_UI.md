# API and Configuration(UI)

## Available imports

-   [Layout](#layout)
-   [Button](#button)
-   [Badge](#badge)
-   [Image](#image)
-   [List](#list)
-   [Prompt](#prompt)
-   [Input](#input)
-   [Navigation](#navigation)
-   [Toast](#toast)
-   [Drawer](#drawer)
-   [DatePicker](#datepicker)
-   [Gallery](#gallery)
-   [Steps](#steps)
-   [Other](#other)

## Layout

提供各种便捷的布局工具、组件[查看详情](../../src/layout/README.md)

## Button

提供各种 Button, 便于使用 [查看详情](../../src/button/README.md)

## Badge:

提示组件(在 View 右上角添加红点、文字提示) [查看详情](../../src/badge/README.md)

## Image

定义了多种图片的使用组件, 便于使用 [查看详情](../../src/image/README.md)

## List

列表组件

#### KPListCell

提供列表 cell 的基础功能，支持分割线和右边箭头

```jsx
<KPListCell style={styles.cell} arrow separator onPress={this._onPress}>
    <Text>列表标题</Text>
</KPListCell>
```

| Property          | Type       | Default | Description                                       |
| ----------------- | ---------- | ------- | ------------------------------------------------- |
| `arrow`           | `bool`     |         | 是否显示右边箭头                                  |
| `arrowSize`       | `number`   |         | 箭头大小                                          |
| `arrowColor`      | `string`   |         | 箭头颜色                                          |
| `separator`       | `bool`     |         | 是否显示分割线                                    |
| `separatorColor`  | `string`   |         | 分割线颜色                                        |
| `onPress`         | `function` |         | 点击事件                                          |
| `disabled`        | `bool`     |         | 禁用点击                                          |
| `style`           | `Style`    |         | contentView 的样式(除掉箭头部分),与 View 样式一致 |
| `containerStyle`  | `Style`    |         | cell 的样式,与 View 样式一致                      |
| `backgroundColor` | `string`   |         | cell 的背景颜色                                   |
| `其他`            | \*         |         | 其他 props 与 View 一致                           |

#### KPNoPagerList

非分页列表组件，基于 FlatList 组件实现，封装异步获取列表数据逻辑

```javascript
// 需要创建异步获取数据loader方法
const loader = () => {
    return new Promise((resolve, reject) => {
        resolve({
            data: new Array(25), // 列表展示需要的数据
            other: {}, // 附加数据
        });
    });
};
```

```jsx
// 使用方式与FlatList一致，提供loader
<KPNoPagerList
    style={styles.list}
    defaultData={data}
    loader={loader}
    renderItem={this._renderItem}
    {...restProps}
/>
```

| Property                | Type                                  | Default | Options  | Description                                           |
| ----------------------- | ------------------------------------- | ------- | -------- | ----------------------------------------------------- |
| `loader`                | `function`                            |         | required | 异步数据加载器                                        |
| `defaultData`           | `array`                               | []      |          | 默认展示数据                                          |
| `loadFirst`             | `bool`                                | true    |          | 初始化后是否立即执行 loader                           |
| `mapDataToProps`        | `function`                            |         |          | 设置 FlatList 的 props (data) => ({data})             |
| `mapOtherToProps`       | `function`                            |         |          | 设置 FlatList 的 props (other) => ({other})           |
| `mapLoadingToProps`     | `function`                            |         |          | 设置 FlatList 的 props (refreshing) => ({refreshing}) |
| `mapErrorToProps`       | `function`                            |         |          | 设置 FlatList 的 props (error) => ({error})           |
| `KPListEmptyComponent` | `ReactComponent` `function` `element` |         |          | 空页面                                                |
| `renderItem`            | `function`                            |         | required | 列表 cell                                             |
| `style`                 | `Style`                               |         |          | 样式与 FlatList 一致                                  |
| `onLoadStateChanged`    | `function`                            |         |          | 加载状态监听 (values) => {}                           |
| `其他`                  | \*                                    |         |          | 其他 props 与 FlatList 一致                           |

#### KPPagerList

分页列表组件，基于 FlatList 组件实现，封装异步获取列表数据逻辑，提供加载更多、刷新列表，首先需要创建分页器[`KPPager`](#KPPager)

```jsx
import { FLSPager } from 'react-native-kpframework-ui';

// 使用方式与FlatList一致，提供pager
<KPPagerList
    style={styles.list}
    renderItem={renderItem}
    pager={pager}
    defaultData={data}
    onLoadStateChanged={this._onLoadStateChanged(onLoadFinish, onLoadFail)}
    {...restProps}
/>;
```

| Property                   | Type                                  | Default | Options  | Description                                                             |
| -------------------------- | ------------------------------------- | ------- | -------- | ----------------------------------------------------------------------- |
| `pager`                    | `class`                               |         | required | 分页器                                                                  |
| `defaultData`              | `array`                               | []      |          | 默认展示数据                                                            |
| `reload`                   | `bool`                                | true    |          | 初始化后是否立即执行 loader                                             |
| `mapDataToProps`           | `function`                            |         |          | 设置 FlatList 的 props (data) => ({data})                               |
| `mapOtherToProps`          | `function`                            |         |          | 设置 FlatList 的 props (other) => ({other})                             |
| `mapLoadingToProps`        | `function`                            |         |          | 设置 FlatList 的 props (refreshing, loading) => ({refreshing, loading}) |
| `mapErrorToProps`          | `function`                            |         |          | 设置 FlatList 的 props (error) => ({error})                             |
| `KPListEmptyComponent`    | `ReactComponent` `function` `element` |         |          | 空页面                                                                  |
| `KPListLoadMoreComponent` | `ReactComponent` `function` `element` |         |          | 列表最底部展示加载更多                                                  |
| `KPListNoMoreComponent`   | `ReactComponent` `function` `element` |         |          | 列表最底部展示没有更多数据                                              |
| `renderItem`               | `function`                            |         | required | 列表 cell                                                               |
| `style`                    | `Style`                               |         |          | 样式与 FlatList 一致                                                    |
| `onLoadStateChanged`       | `function`                            |         |          | 加载状态监听 (values) => {}                                             |
| `其他`                     | \*                                    |         |          | 其他 props 与 FlatList 一致                                             |

#### KPPager

分页器，可以单独使用。

**_1. static of(pageSize: number, promiseLoader: function)_**

创建分页器，这里需要提供一个异步加载器 loader。见示例

```javascript
import { FLSPager } from 'react-native-kpframework-ui';

// 需要创建异步获取数据loader方法需要以下3个步骤

// 1. 参数: 固定为pageTo(页码)和pageSize(每页数量)
const loader = (pageTo, pageSize) => {
    // 2. 返回: 固定为Promise, 异步加载器
    return new Promise((resolve, reject) => {
        // 3. 异步返回 data - 分页数据、totalPage - 总页码、 other - 附加数据
        resolve({
            data: new Array(25), // 列表展示需要的数据
            totalPage: 10, // 总页码
            other: {}, // 附加数据
        });
    });
};

// 配置KPPager分页器。该分页器需要提供数据获取方法loader和分页数量
const pager = FLSPager.of(25, loader);
```

**_2. resetPage(onSuccess: function)_**

重置分页器到初始状态

onSuccess: ({data, other}) => {}

**_3. getNextPage(onSuccess: function, onFail: function)_**

调用 loader 获取下一页数据, data 为该页数据

onSuccess: ({data, other}) => {}, 如果在最后一页时调用,`data`为空数组

onFail: (error) => {}

**_4. getPreviouPage(onSuccess: function, onFail: function)_**

调用 loader 获取上一页数据, data 为该页数据

onSuccess: ({data, other}) => {}, 如果在第一页时调用,`data`为空数组

onFail: (error) => {}

**_5. isLastPage()_**

是否已到最后一页

## Prompt

加载指示器, 在界面上显示一个等待框。(一个菊花+一个文字)  
使用全新的[KPPrompt](../../src/prompt/README.md)，替换掉以前的 `KPLegacyPromptView` `KPPromptModel`。使用起来更加的便捷。

## Input

输入组件

#### KPNumberInput

用来输入验证码、编号等数字的组件。

```jsx
<KPNumberInput
    style={styles.input}
    number={this.codeNumber}
    cellWidth={40}
    cellHeight={40}
    space={20}
    onChangeText={this._onChangeText}
    onSubmitEditing={this._onSubmitEditing}
/>
```

| Property             | Type       | Default  | Description                     |
| -------------------- | ---------- | -------- | ------------------------------- |
| `number`             | `number`   | 4        | 默认为 4 位数字输入框           |
| `editable`           | `bool`     | true     | 是否可编辑                      |
| `cellWidth`          | `number`   | 40       | 输入框宽度                      |
| `cellHeight`         | `number`   | 40       | 输入框高度                      |
| `space`              | `number`   | 30       | 输入框间隔                      |
| `mode`               | `string`   | `normal` | 模式`normal`和`highlight`       |
| `titleStyle`         | `Style`    |          | 数字样式                        |
| `normalCellStyle`    | `Style`    |          | 每位数字输入框的 normal 样式    |
| `highlightCellStyle` | `Style`    |          | 每位数字输入框的 highlight 样式 |
| `onChangeText`       | `function` |          | 输入内容变更的监听方法          |
| `onSubmitEditing`    | `function` |          | 输入文字提交的监听方法          |
| `style`              | `Style`    |          | 组件样式,`width`和`height`无效  |

## Navigation

定制化导航栏，提供统一的导航栏样式，同时也提供单个页面的导航栏定制。iOS 端请配合[SafeAreaView](https://reactnative.cn/docs/safeareaview/)使用  
[查看详情](../../src/nav/README.md)

## Toast

在界面的正中间出现一个短暂的提示文字，类似于 android 的 `toast` [查看详情](../../src/toast/README.md)

## Drawer

从屏幕边缘滑出的自定义组件，类似于 android 的 `drawer` [查看详情](../../src/drawer/README.md)

## DatePicker

原生的 android/iOS 时间选择组件，使用方式类似于`TouchableOpacity` [查看详情](../../src/datepicker/README.md)

## Gallery

图片浏览器。支持图片缓存、大图缩放、多图片浏览等众多功能。[react-native-kpframework-gallery](https://github.com/kpReactComponent/react-native-kpframework-gallery)  
由于`gallery`属于一个复杂且较大的组件，因此把它独立出来，单独提供

## Steps

展示任务流程的导航条。[查看详情](../../src/step/README.md)

## Other

其他的组件

#### ~~KPSideView~~ _已废弃不再维护_

侧边栏组件  
使用全新的[KPDrawer](../../src/drawer/README.md)，替换掉以前的 `KPSideView`。使用起来更加的便捷。
