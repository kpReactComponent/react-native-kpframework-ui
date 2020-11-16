# KPDatePickerTouchable

> NOTE: The sources are copy from `mmazzarolo/react-native-modal-datetime-picker` for more informations please move to https://github.com/mmazzarolo/react-native-modal-datetime-picker

 时间选择器(在原来的代码中，移除了 Touchable 的各种默认样式，以便自由的定制，使用时可直接当做`TouchableOpacity`来使用)

## Available props

| Name            | Type        | Default    | Description                                                      |
| --------------- | ----------- | ---------- | ---------------------------------------------------------------- |
| mode            | string      | 'date'     | 日期选择器模式`date` `datetime` `time`                           |
| androidMode     | string      | 'default'  | android 支持的日期选择模式`clock` `calendar` `spinner` `default` |
| date            | string/Date | new Date() | 默认时间                                                         |
| format          | string      |            | 日期格式化方式，例 `YYYY-MM-DD`                                  |
| minDate         | string/Date |            | 日期选择范围                                                     |
| maxDate         | string/Date |            | 日期选择范围                                                     |
| height          | number      | 259        | 组件高度                                                         |
| duration        | number      | 0.3        | 弹出动画时间                                                     |
| confirmBtnText  | string      | '确定'     | 确定按钮文本                                                     |
| cancelBtnText   | number      | 0.3        | 弹出动画时间                                                     |
| iOSCustomStyles | object      |            | iOS 支持自定义样式,见下方说明                                    |
| onDateChange    | function    |            | 点击确定时触发                                                   |
| onOpenModal     | function    |            | 弹出时间选择器时触发                                             |
| onCloseModal    | function    |            | 关闭时间选择器时触发                                             |
| onPressMask     | function    |            | 点击其他区域触发                                                 |
| is24Hour        | bool        | false      | If false, the picker shows an AM/PM chooser on Android           |
| getDateStr      | function    |            | 返回前，日期格式化为 string 的方法                               |
| iOSTitle        | string      | '请选择'   | iOS 端 picker 的标题                                             |
| 其他            |             |            | 与组件`TouchableOpacity`一致                                     |

## iOSCustomStyles

用户自定义样式，仅 iOS 有效

-   **datePickerCon** 弹出框样式
-   **datePicker** 时间选择器样式
-   **btnCancel** 取消按钮样式
-   **btnTextCancel** 取消按钮文本样式
-   **toolTitle** 标题文本样式
-   **btnConfirm** 确定按钮样式
-   **btnTextConfirm** 确定按钮文本样式

## 使用说明

```jsx
<KPDatePickerTouchable
    style={styles.button}
    onDateChange={this._onDateChange}
    getDateStr={date => date.toString()}
>
    <Text>点击选择时间</Text>
</KPDatePickerTouchable>
```
