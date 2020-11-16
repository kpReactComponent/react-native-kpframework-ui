# KPNavigator/KPNavigationItems

定制化导航栏，提供统一的导航栏样式，同时也提供单个页面的导航栏定制。iOS 端请配合[SafeAreaView](https://reactnative.cn/docs/safeareaview/)使用

## KPNavigator

定制化导航栏，支持标题、左右 item 扩展。

| Property                  | Type       | Default   | Description|
| ------------------------- | ---------- | --------- | --------------------------------------------------- |
| `title`                   | `string`   |           | 导航栏标题|
| `titleStyle`              | `Style`    |           | 标题样式|
| `renderTitle`             | `function` |           | 自定义标题|
| `itemTintColor`           | `string`    |      | 导航栏左右图标、文字颜色|
| `barTintColor`           | `string`    |      | 导航栏背景颜色|
| `backMode`                | `bool`     | true      | 在导航栏左方展示返回按钮，**优先级：最低**|
| `onBackPress`             | `function` |           | 返回按钮点击的监听方法|
| `renderBackButton`        | `function` |           | 自定义导航栏返回按钮，仅 backMode 有效时调用 (onBackPress, iconname, color) => {}|
| `closeMode`               | `bool`     |           | 在导航栏左方展示关闭按钮，**优先级：低**|
| `onClosePress`            | `function` |           | 关闭按钮点击的监听方法|
| `renderCloseButton`       | `function` |           | 自定义导航栏关闭按钮，仅 closeMode 有效时调用 (onClosePress, iconname, color) => {}|
| `leftIcon`                | `string`   |           | 在导航栏左方展示图标按钮，[图标名称点击这里查询](https://oblador.github.io/react-native-vector-icons/)，默认使用的是`Ionicons`，**优先级：中** |
| `leftText`                | `string`   |           | 在导航栏左方展示文字按钮，**优先级：中高**|
| `onLeftPress`             | `function` |           | 左方按钮点击的监听方法|
| `renderLeftIconButton`    | `function` |           | 自定义导航栏左方 icon 按钮，仅`leftIcon`有效时调用 (onLeftPress, iconname, color) => {}|
| `renderLeftTextButton`    | `function` |           | 自定义导航栏左方 text 按钮，仅`leftText`有效时调用 (onLeftPress, text, color) => {}|
| `rightIcon`               | `string`   |           | 在导航栏右方展示图标按钮，[图标名称点击这里查询](https://oblador.github.io/react-native-vector-icons/)，默认使用的是`Ionicons`，**优先级：中**|
| `rightText`               | `string`   |           | 在导航栏右方展示文字按钮，**优先级：中高**|
| `onRightPress`            | `function` |           | 右方按钮点击的监听方法|
| `renderRightIconButton`   | `function` |           | 自定义导航栏右方 icon 按钮，仅`rightIcon`有效时调用 (onLeftPress, iconname, color) => {}|
| `renderRightTextButton`   | `function` |           | 自定义导航栏右方 text 按钮，仅`rightText`有效时调用 (onLeftPress, text, color) => {}|
| `renderLeftButton`        | `function` |           | 导航栏左方的自定义按钮，**优先级：最高**|
| `renderRightButton`       | `function` |           | 导航栏右方的自定义按钮，**优先级：最高**|
| ~~`iosisProfiledScreen`~~ | ~~`bool`~~ | ~~false~~ | ~~ios 端有效，是否适配异形屏（iPhoneX...）~~ v2 请在界面最外层使用`SafeAreaView`替换`View`|
| `style`                   | `Style`    |           | 组件样式|
| `shadow`           | `bool`    |  true    |下方阴影分割线|
  
```jsx
// 更多的使用方式请见Demo工程
<KPNavigator title="登录" closeMode={true} onClosePress={() => {}} />
```

## KPNavigationItems

提供了导航栏上面的各种 item，可以与`KPNavigator`配套使用  

-   [Title](#title)
-   [TextButton](#textbutton)
-   [IconButton](#iconbutton)
-   [ImageButton](#imagebutton)
-   [CustomButton](#custombutton)
-   [Item](#item)

### Title  
标题

```jsx
<Title title={title} style={titleStyle} />
```
  
| Property | Type     | Default | Description |
| -------- | -------- | ------- | ----------- |
| `title`  | `string` |         | 标题        |

### TextButton  
文本按钮

| Property         | Type       | Default | Description                  |
| ---------------- | ---------- | ------- | ---------------------------- |
| `onPress`        | `function` |         | 点击事件                     |
| `containerStyle` | `Style`    |         | 设置`TouchableOpacity`的样式 |
| `itemStyle`      | `Style`    |         | 设置`Text`的样式             |
| `text`           | `string`   |         | 文本内容                     |
| `itemProps`      | `Object`   |         | 设置`Text`的 props           |
  
```jsx
<TextButton
    containerStyle={styles.textButtonStyle}
    itemStyle={{ color: 'black' }}
    text={text}
    onPress={onPress}
/>
```  
  
### IconButton  
图标按钮
  
| Property         | Type       | Default                 | Description|
| ---------------- | ---------- | ----------------------- | ----------------------------------- |
| `onPress`        | `function` |                         | 点击事件|
| `containerStyle` | `Style`    | {width: 44, height: 44} | 设置`TouchableOpacity`的样式|
| `itemStyle`      | `Style`    |                         | 设置[Icon](https://react-native-training.github.io/react-native-elements/docs/0.19.1/icon.html)的样式|
| `name`           | `string`   |                         | 图标名称，[点击这里查看](https://oblador.github.io/react-native-vector-icons/)|
| `size`           | `number`   | 26                      | 图标大小|
| `color`          | `string`   |                         | 图标颜色|
| `itemProps`      | `Object`   |                         | 设置[Icon](https://react-native-training.github.io/react-native-elements/docs/0.19.1/icon.html)的 props |
  
```jsx
<IconButton
    containerStyle={styles.buttonStyle}
    name={name}
    size={40}
    color={color}
    onPress={onPress}
    itemProps={{ type: 'ionicon' }}
/>
```  
  
### ImageButton  
图片按钮
  
| Property         | Type       | Default | Description                  |
| ---------------- | ---------- | ------- | ---------------------------- |
| `onPress`        | `function` |         | 点击事件                     |
| `containerStyle` | `Style`    |         | 设置`TouchableOpacity`的样式 |
| `itemStyle`      | `Style`    |         | 设置`Image`的样式            |
| `source`         | `any`      |         | `Image`的 source             |
| `itemProps`      | `Object`   |         | 设置`Image`的 props          |
  
```jsx
<ImageButton
    containerStyle={styles.buttonStyle}
    source={require('xxxxxxxx/xxxxx/xxxx.jpg')}
    onPress={onPress}
/>
```
  
### CustomButton  
自定义按钮
  
| Property         | Type       | Default | Description                  |
| ---------------- | ---------- | ------- | ---------------------------- |
| `onPress`        | `function` |         | 点击事件                     |
| `containerStyle` | `Style`    |         | 设置`TouchableOpacity`的样式 |
| `itemStyle`      | `Style`    |         | 设置`component`的样式        |
| `component`      | `element`  |         | 指定使用`component`          |
| `itemProps`      | `Object`   |         | 设置`component`的 props      |
  
```jsx
<NavigationCustomButton
    containerStyle={styles.buttonStyle}
    component={Icon}
    itemProps={{
        size: 26,
        name: 'back',
        color: 'white',
    }}
    onPress={onPress}
/>
```
  
### Item  
导航栏左右两边的基础 item
  
| Property    | Type      | Default | Description|
| ----------- | --------- | ------- | --------------------------------------- |
| `itemType`  | `string`  |         | item 类型`text` `icon` `image` `custom`，如果都不符合则为`View`组件|
| `component` | `element` |         | 指定使用`component`|
| `name`      | `string`  |         | 当`icon`类型时使用，icon 的名称[点击这里查看](https://oblador.github.io/react-native-vector-icons/) |
| `size`      | `number`  |         | 当`icon`类型时使用，icon 的大小|
| `text`      | `string`  |         | 当`text`类型时使用，文本|
| `source`    | `any`     |         | 当`image`类型时使用，图片资源|
| `color`     | `string`  |         | 当`icon`类型时使用，icon 的颜色|
| `style`     | `Style`   |         | 组件 style|
  
```jsx
<Item style={itemStyle} source={source} itemType="image" {...itemProps} />
```
  
## 参考代码  
具体的使用方式，参考附带的Demo程序  
  
## V1版本

### KPLegacyNavigator  
   
v1版本的导航栏，不能与`SafeAreaView`共用，需要指定设备是否为异形屏