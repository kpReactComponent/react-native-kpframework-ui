# Steps 步骤条

展示任务流程的导航条。**_暂时仅支持垂直方向_**

需 step 容器`KPStep`与 step 步骤单元`Item`配合使用

```jsx
<KPStep current={3}>
    <KPStep.Item title="已付款" />
    <KPStep.Item title="订单确认" />
    <KPStep.Item minHeight={120} title="已发货" />
    <KPStep.Item title="等待收货" />
    <KPStep.Item>
        <Text style={{ color: 'red' }}>这里是自定义内容</Text>
    </KPStep.Item>
</KPStep>
```

### KPStep

| Property  | Type     | Default | Description                                |
| --------- | -------- | ------- | ------------------------------------------ |
| `current` | `number` |         | 任务当前执行到第几步                       |
| `status`  | `string` | wait    | 任务当前的执行状态 `wait` `finish` `error` |
| `style`   | `Style`  |         |                                            |

### Item

| Property      | Type      | Default   | Description                                             |
| ------------- | --------- | --------- | ------------------------------------------------------- |
| `index`       | `number`  |           | 当前节点 index,`由KPStep提供，禁止手动设置`            |
| `total`       | `number`  |           | 总节点数量,`由KPStep提供，禁止手动设置`                |
| `current`     | `number`  |           | 当前执行到的节点位置,`由KPStep提供，禁止手动设置`      |
| `status`      | `string`  |           | 当前执行到的节点状态,`由KPStep提供，禁止手动设置`      |
| `icon`        | `bool`    |           | 节点是否使用图标显示状态，如果为 false 则用数字标出位置 |
| `waitColor`   | `color`   | lightgrey | `wait`状态的颜色                                        |
| `doneColor`   | `color`   | #3CB371   | `finish`状态的颜色                                      |
| `errorColor`  | `color`   | red       | `error`状态的颜色                                       |
| `size`        | `number`  | 20        | 节点图标大小                                            |
| `minHeight`   | `number`  | 60        | 节点最小长度                                            |
| `minLeftWidth` | `number`  | 0        | 左边最小宽度                                            |
| `titleStyle`  | `Style`   |           | 标题文本样式,可以不设置                                 |
| `numberStyle` | `Style`   |           | 数字文本样式,可以不设置                                 |
| `children`    | `element` |           | 可在节点中加入自定义功能                                |

### Custom

步骤条支持自定义每一个步骤:

1. 使用`KPStep`作为父组件
2. 根据父组件传递的参数`index` `status` `total` `current`，在自定义组件中实现逻辑

```jsx
<KPStep current={3}>
    <Custom />
    <Custom />
    <Custom />
    <Custom />
    <Custom />
    <Custom />
</KPStep>
```
