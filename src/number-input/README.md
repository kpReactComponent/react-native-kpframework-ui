# KPNumberInput

类似支付宝、微信的支付密码输入框
  
  
| Property             | Type       | Default | Description                     |
| -------------------- | ---------- | ------- | ------------- |
| `number`             | `number`   | 4       | 默认为 4 位数字输入框|
| `editable`           | `bool`     | true    | 是否可编辑|
| `cellWidth`           | `number`     | 40    | 输入框宽度|
| `cellHeight`           | `number`     | 40    | 输入框高度|
| `space`           | `number`     | 30    | 输入框间隔|
| `mode`           | `string`     | `normal`    | 模式`normal`和`highlight`|
| `titleStyle`         | `Style`    |         | 数字样式|
| `normalCellStyle`    | `Style`    |         | 每位数字输入框的 normal 样式|
| `highlightCellStyle` | `Style`    |         | 每位数字输入框的 highlight 样式 |
| `onChangeText`       | `function` |         | 输入内容变更的监听方法|
| `onSubmitEditing`    | `function` |         | 输入文字提交的监听方法|
| `style`              | `Style`    |         | 组件样式,`width`和`height`无效|
| `keyboardType`              | `string`    |         | 支持的键盘样式,参考[TextInput](https://reactnative.cn/docs/0.56/textinput/#keyboardtype) |

  

```jsx
import { KPNumberInput } from 'react-native-kpframework-ui';
// ...
// render方法
{
    <KPNumberInput
        style={styles.input}
        number={6}
        cellWidth={40}
        cellHeight={40}
        space={10}
        onChangeText={text => {}}
        onSubmitEditing={() => {}}
    />;
}
// ...
```

## API

-   `focus()`
-   `clear()`

```jsx
// 获取焦点
this.input.focus();
// 清空
this.input.clear();
```