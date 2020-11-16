# Button 按钮

定义了多种类型的按钮

### KPButton  
  
通用按钮，用法与 [TouchableOpacity](https://reactnative.cn/docs/0.56/touchableopacity/) 一致
  
```jsx
<KPButton onPress={this._onPress}>
    <Text>点击</Text>
</KPButton>
```
  
  
  
| Property | Type    | Default | Description               |
| -------- | ------- | ------- | ------------------------- |
| `disabled`   | `bool`  | false   | 禁用          |
| `onPress`  | `function` |         | 点击事件 |
| `backgroundColor`  | `color` |         | 背景颜色 |
| `style`  | `Style` |         | 用户自定义样式,可以不设置 |
| `round`  | `bool` |    false     | 圆角 4 |
| `其他`  |  |         | 参考[TouchableOpacity](https://reactnative.cn/docs/0.56/touchableopacity/) |

  
  

### KPTextButton  
  
文本按钮

```jsx
<KPTextButton
    style={styles.button}
    titleStyle={styles.buttonTitle}
    title="计时开始答题"
    onPress={this._onPress}
/>
```
  
| Property | Type    | Default | Description               |
| -------- | ------- | ------- | ------------------------- |
| `disabled`   | `bool`  | false   | 禁用          |
| `onPress`  | `function` |         | 点击事件 |
| `title`  | `string` |         | 按钮文本 |
| `titleColor`  | `color` |    black     | 文本颜色 |
| `backgroundColor`  | `color` |     white    | 背景颜色 |
| `style`  | `Style` |         | 用户自定义样式,可以不设置 |
| `titleStyle`  | `Style` |         | 文本自定义样式,可以不设置 |
| `underlayColor`  | `color` |         | 按下的颜色 |
| `round`  | `bool` |    false     | 圆角 4 |
| `其他`  |  |         | 参考[TouchableHighlight](https://reactnative.cn/docs/0.56/touchablehighlight/) |
  