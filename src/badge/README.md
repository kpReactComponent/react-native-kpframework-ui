# Badge 标注
  
定义了多种类型的标注
  
### KPDotBadge
  
圆点标注。***dot的父组件不能使用样式`overflow: 'hidden'`，否则会裁剪掉一部分的标注***
  
```jsx
<Image source={require('../images/header.png')}>
    <KPBadge.Dot show />
</Image>
```
  
| Property | Type     | Default | Description               |
| -------- | -------- | ------- | ------------------------- |
| `show`   | `bool`   | false   | 是否显示圆点标注          |
| `color`  | `string` | red     | 圆点颜色                  |
| `size`   | `number` | 4       | 圆点大小                  |
| `style`  | `Style`  |         | 用户自定义样式,可以不设置 |
<br />  
<br />  
#### KPTextBadge
  
文字标注。***dot的父组件不能使用样式`overflow: 'hidden'`，否则会裁剪掉一部分的标注***
  
```jsx
<Image source={require('../images/header.png')}>
    <KPBadge.Text text="99" />
</Image>
```
  
| Property     | Type     | Default | Description                                                  |
| ------------ | -------- | ------- | ---------------------------------------------------------- |
| `autoSize`   | `bool`   | true    | 自动调整文字大小                                            |
| `show`       | `bool`   | false   | 是否显示文字提示                                            |
| `text`       | `string` |         | 文字内容                                                   |
| `color`      | `string` | red     | 标注颜色                                                   |
| `textColor`  | `string` | white   | 文字颜色                                                   |
| `textSize`   | `number` | 10      | 文字大小                                                   |
| `titleStyle` | `Style`  |         | 文字样式                                                   |
| `style`      | `Style`  |         | 用户自定义样式,可以不设置, 该组件组合方式 View 包裹一个 Text     |
  