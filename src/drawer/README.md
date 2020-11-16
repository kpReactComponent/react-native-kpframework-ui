# KPDrawer

从屏幕边缘滑出可操作的 View，类似 android 的 Drawer  
展示方式类似于`Modal`, 但是界面展示优先级低于`Modal`

### 规则

-   一次只显示一个
-   需要指定滑出的 drawer 宽度`expand`

## API

-   `KPDrawer.left(view, expand, config)`
-   `KPDrawer.right(view, expand, config)`
-   `KPDrawer.top(view, expand, config)`
-   `KPDrawer.bottom(view, expand, config)`
-   `KPDrawer.show(view, position, expand, onClose, config)`
-   `KPDrawer.hide(key)`

组件提供了 2 个静态方法，参数如下：  

| 属性      | 说明                                    | 类型          | 默认值   |
| --------- | --------------------------------------- | ------------- | -------- |
| view      | 展示内容                                | React.Element | 无       |
| position  | 从哪边滑出`left` `top` `right` `bottom` | string        | left     |
| expand    | 侧边滑出宽度，必须指定                  | number        | 280      |
| onClose   | 关闭时的回调                            | function      | () => {} |
| config | 其他扩展配置 | object | 见以下说明 |

```jsx
import { KPDrawer } from 'react-native-kpframework-ui';
const key = KPDrawer.left(<Text style={{ height: 400 }}>{文档}</Text>);
// ...
KPPrompt.hide(key);
```

## KPDrawerView

除了使用[API](#api)方式展示 drawer 外，还能直接在`render`中渲染 `KPDrawerView`，属性如下:  

| 属性 | 说明 | 类型 | 默认值 |
| -------- | ------------------------------ | ----------------------- | ------ |
| position | 从哪边滑出`left` `top` `right` `bottom` | string | left |
| closeable | 是否支持触摸其他区域关闭 | bool | true |
| expand | 侧边滑出宽度，必须指定 | number | 280 |
| transparent | 是否透明 | bool | 无 |
| onClose | 关闭时的回调 | function | () => {} |
| onAnimationEnd | 关闭动画结束后调用 | function | 无 |  
| config | 其他扩展配置 | object | 见以下说明 |
| children | 展示在 drawer 上的组件 | React.Node | 无 |

  
- **config**  
  
| 属性 | 说明 | 类型 | 默认值 |
| -------- | ------------------------------ | ----------------------- | ------ |
| mask | 是否显示蒙层 | bool | true |
| maskColor | 蒙层颜色 | color | 'rgba(0, 0, 0, 0.4)' |
| closeable | 是否支持触摸蒙层关闭 | bool | true |
| drawerColor | 滑出的区域颜色 | color | 'white' |
| bounce | 弹性动画 | bool | true |
| duration | 自动关闭，如果为 0 需要手动关闭 | number | 0 |  
  
  

```jsx
import { KPDrawerView } from 'react-native-kpframework-ui';
// ...
// render方法
{
    this.state.show && (
        <KPDrawerView
            position="right"
            closeable
            onAnimationEnd={() => this.setState({ show: false })}
        >
            <Text
                style={{ width: 200, height: 200, backgroundColor: 'yellow' }}
            >
                文字
            </Text>
        </KPDrawerView>
    );
}
// ...
```

## 注意事项

- 如果要使用该全局提示组件 `KPDrawer`，还需要在 App 的入口处加上 `KPProvider`

```jsx
import React, { Component } from 'react';
import { KPProvider } from 'react-native-kpframework-ui';

class HelloWorldApp extends Component {
    render() {
        return (
            <KPProvider>
                <Text>Hello world</Text>
            </KPProvider>
        );
    }
}
```

-   因为组件展示优先级低于`Modal`，如果需要在`Modal`组件中显示 KPDrawer，必须在`render`中加入[KPDrawerView](#KPDrawerView)而不能使用 API 方式。
