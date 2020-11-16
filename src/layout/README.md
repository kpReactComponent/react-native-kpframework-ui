# 布局组件

提供方便快捷的布局用组件

### KPWhiteSpace

空白占位组件

```jsx
// 横向
// ---
<View>
    <Text>内容</Text>
    <KPWhiteSpace />
    <Text>内容</Text>
</View>

// 纵向
// ---
<View style={{ flexDirction: 'row' }}>
    <Text>内容</Text>
    <KPWhiteSpace vertical />
    <Text>内容</Text>
</View>
```

| Property   | Type     | Default | Description                                        |
| ---------- | -------- | ------- | -------------------------------------------------- |
| `size`     | `number` | 20      | 占位大小                                           |
| `vertical` | `bool`   | false   | 是否垂直方向占位, 与`flexDirection: row`布局搭配   |
| `其他`     |          |         | 参考[View](https://reactnative.cn/docs/0.56/view/) |

### KPWingBlank

上下/左右留白组件

```jsx
// 左右
// ---
<KPWingBlank>
    <Text>文字</Text>
</KPWingBlank>

// 上下
// ---
<KPWingBlank vertical>
    <Text>文字</Text>
</KPWingBlank>
```

| Property   | Type     | Default | Description                                        |
| ---------- | -------- | ------- | -------------------------------------------------- |
| `size`     | `number` | 20      | 留白部分大小                                       |
| `vertical` | `bool`   | false   | 是否上下方向留白                                   |
| `其他`     |          |         | 参考[View](https://reactnative.cn/docs/0.56/view/) |
