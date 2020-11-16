# KPPrompt
  

一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。  
展示方式类似于`Modal`, 但是界面展示优先级低于`Modal`

### 规则

-   一次只显示一个
-   字数不宜超过 10 个。

## API

-   `KPPrompt.loading(content, duration, mask)`
-   `KPPrompt.hide(key)`


组件提供了2个静态方法，参数如下：

| 属性     | 说明                           | 类型                    | 默认值 |
| -------- | ------------------------------ | ----------------------- | ------ |
| content  | 提示内容                       | React.Element or string | 无     |
| duration | 自动关闭的延时，单位秒         | number                  | 3      |
| mask     | 是否显示透明蒙层，防止触摸穿透 | bool                 | true   |


```jsx
  import { KPPrompt } from 'react-native-kpframework-ui'
  const key = KPPrompt.loading('messsage')
  KPPrompt.hide(key)
```
  
## KPLegacyPromptViews  
除了使用[API](#api)方式展示loading外，还能直接在`render`中渲染，

  
- **KPLoadingView**  等待框
  
| 属性     | 说明                           | 类型                    | 默认值 |
| -------- | ------------------------------ | ----------------------- | ------ |
| content  | 提示内容                       | React.Element or string | 无     |
| duration | 自动关闭的延时，单位秒         | number                  | 3      |
| onClose  | 关闭后回调                     | function                | 无     |
| mask     | 是否显示透明蒙层，防止触摸穿透 | bool                 | true   |  
| onAnimationEnd     | 关闭动画结束后调用 | function                 | 无   |  

  
```jsx
import { KPLoadingView } from 'react-native-kpframework-ui';
// ...
// render方法
{
    this.state.loading && (
        <KPLoadingView content='请稍后' />
    );
}
// ...
```

## 注意事项

如果要使用该全局提示组件 `KPPrompt`，还需要在 App 的入口处加上 `KPProvider`

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

  
- 因为组件展示优先级低于`Modal`，如果需要在`Modal`组中显示Prompt，必须在`render`中加入[需要使用Prompt组件](#KPLegacyPromptViews)而不能使用API方式。
