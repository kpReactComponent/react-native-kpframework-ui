# react-native-kpframework-ui

[![](https://img.shields.io/npm/v/react-native-kpframework-ui.svg?style=flat-square)](https://www.npmjs.com/package/react-native-kpframework-ui)
[![](https://img.shields.io/npm/dm/react-native-kpframework-ui.svg?style=flat-square)](https://www.npmjs.com/package/react-native-kpframework-ui)
[![](https://travis-ci.org/xuwaer/react-native-kpframework-ui.svg)](https://travis-ci.org/xuwaer/react-native-kpframework-ui)
[![](https://img.shields.io/github/license/xuwaer/react-native-kpframework-ui.svg?style=flat-square)](https://github.com/xuwaer/react-native-kpframework-ui/blob/master/LICENSE)

提供 react-native 的常用组件

## 安装说明

#### 自动安装

1. 安装

```
// npm
npm install react-native-kpframework-ui --save
// or yarn
yarn add react-native-kpframework-ui
```

2. 执行安装脚本

```
node node_modules/react-native-kpframework-ui/script/install-cli
```

3. 如果失败，请重新执行安装脚本，或者使用下面的手动安装方式

#### 手动安装

1.安装

```
// 安装react-native-kpframework-ui
npm install react-native-kpframework-ui --save
npm install react-native-elements --save
npm install react-native-img-cache-kp --save
npm install react-native-vector-icons --save
npm install rn-fetch-blob --save

// or yarn
yarn add react-native-kpframework-ui
yarn add react-native-elements
yarn add react-native-img-cache-kp
yarn add react-native-vector-icons
yarn add rn-fetch-blob
```

**RN < 0.60.0 执行以下步骤**
2.link 到原生

```
react-native link react-native-vector-icons
react-native link rn-fetch-blob
```

3.iOS 端如果使用了 CocoaPods 管理第三方包
在 Pod 文件中添加

```ruby
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
pod 'rn-fetch-blob', :path => '../node_modules/rn-fetch-blob'
```

## 版本说明

支持 **RN 0.60.0** 及以上版本

## API 说明

[界面 UI 相关组件](/doc/API_UI.md)

## react-native-elements

该组件集成了 [react-native-elements](https://reactnativeelements.com/docs/)，也是对该库的补足。因此可以直接使用该库，不需要重复安装。**如果有与该库重复的组件，后续将不再维护**
