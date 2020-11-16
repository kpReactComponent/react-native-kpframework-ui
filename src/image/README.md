# Image 图片

定义了多种图片的使用组件  

### KPCachedImage  
  
替换 V1 版本的 KPCommonImage  
  
通用图片组件，提供网络缓存、默认图片、默认背景功能。缓存模块基于[react-native-img-cache-kp](https://github.com/kpReactComponent/react-native-img-cache)实现  

```jsx
<KPCachedImage
    style={learnStyles.courseCoverImage}
    source={{ uri: xxxxxxxxxxx }}
    defaultSource={require('xxxxxxxxxxx')}
/>
```
  
| Property        | Type       | Default | Description                                                     |
| --------------- | ---------- | ------- | --------------------------------------------------------------- |
| `source`        | `object`   |         | 图片 source 与 Image 组件一致                                   |
| `defaultSource` | `object`   |         | 在 source 图片还未获取完毕时展示用                              |
| `style`         | `Style`    |         | 与 View 样式一致，除非特殊需求，其他情况请设置`width`和`height` |
| `imageStyle`    | `Style`    |         | 与 Image 样式一致                                               |
| `onPress`       | `function` |         | 点击事件                                                        |
| `其他`          | \*         |         | 其他 props 与 Image 一致                                        |
  

#### KPNameHeader  
  
定制的头像图片，如果设置了姓名，则在没有头像图片是展示姓名的第一个字符。该图片基于[KPCachedImage](#KPCachedImage)实现。  

```jsx
<KPNameHeader
    style={styles.header}
    size={40}
    name="张三"
    source={{ uri: 'https://avatar.csdn.net/C/E/1/3_moxiaoya1314.jpg' }}
/>
```

| Property        | Type       | Default | Description                                                       |
| --------------- | ---------- | ------- | ----------------------------------------------------------------- |
| `defaultSource` | `object`   |         | 在 source 图片还未获取完毕时展示用                                |
| `name`          | `string`   |         | 姓名                                                              |
| `onPress`       | `function` |         | 点击事件                                                          |
| `source`        | `object`   |         | 图片 source 与 Image 组件一致                                     |
| `style`         | `Style`    |         | 与 Image 样式一致，其中 width 和 height 无效必须在 props 里面设置 |
| `size`          | `number`   |         | 大小(高宽一致)                                                    |
| `imageStyle`    | `Style`    |         | 与 Image 样式一致                                                 |
| `titleStyle`    | `Style`    |         | 与 Text 样式一致                                                  |
| `其他`          | \*         |         | 其他 props 与 Image 一致                                          |
