# ActionSheet

> NOTE: The sources are modify from `beefe/react-native-actionsheet` for more informations please move to https://github.com/beefe/react-native-actionsheet

 选择器

### KPActionSheet

选择器，展示、隐藏等逻辑需要另外实现

```jsx
<TouchableOpacity onPress={() => this.refs.sheet.show()}>
    <KPActionSheet
        ref="sheet"
        title="城市"
        message="这个是重点城市列表（部分）"
        style={styles.button}
        options={['北京', '上海', '天津', '深圳', '重庆', '取消']}
        cancelButtonIndex={5}
        destructiveButtonIndex={this.state.index}
        onSelection={index => this.setState({ index })}
    />
</TouchableOpacity>
```

#### API

-   `show()`
-   `hide(index)`

#### Attributes

| Name                   | Type   | Default | Description                         |
| ---------------------- | ------ | ------- | ----------------------------------- |
| title                  | string |         | 标题部分                            |
| message                | string |         | 副标题部分                          |
| options                | array  |         | PropTypes.string, PropTypes.element |
| tintColor              | string |         | #007AFF                             |
| cancelButtonIndex      | number |         | 取消 index，如果为 -1 则没有        |
| destructiveButtonIndex | number |         | 当前 index                          |
| onSelection            | func   |         | 选中事件                            |
| 其他                   |        |         | 与组件`View`一致                    |

### KPTouchableActionSheet

按钮组件，封装了点击打开选择器逻辑

```jsx
<KPTouchableActionSheet
    title="城市"
    message="这个是重点城市列表（部分）"
    containerStyle={styles.button}
    options={['北京', '上海', '天津', '深圳', '重庆', '取消']}
    cancelButtonIndex={5}
    destructiveButtonIndex={this.state.index}
    onSelection={index => this.setState({ index })}
>
    <Text>请选择</Text>
</KPTouchableActionSheet>
```

#### Attributes

| Name                   | Type   | Default | Description                         |
| ---------------------- | ------ | ------- | ----------------------------------- |
| title                  | string |         | 标题部分                            |
| message                | string |         | 副标题部分                          |
| options                | array  |         | PropTypes.string, PropTypes.element |
| tintColor              | string |         | #007AFF                             |
| cancelButtonIndex      | number |         | 取消 index，如果为 -1 则没有        |
| destructiveButtonIndex | number |         | 当前 index                          |
| onSelection            | func   |         | 选中事件                            |
| 其他                   |        |         | 与组件`TouchableOpacity`一致        |
