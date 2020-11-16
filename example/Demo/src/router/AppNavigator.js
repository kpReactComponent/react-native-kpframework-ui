import { createStackNavigator, createAppContainer } from "react-navigation";
import HomePage from "../page/HomePage";
import KPButtonPage from "../page/button/KPButtonPage";
import KPTextButtonPage from "../page/button/KPTextButtonPage";
import KPNumberInputPage from "../page/input/KPNumberInputPage";
import KPNumberInputListPage from "../page/input/KPNumberInputListPage";
import KPToastPage from "../page/toast/KPToastPage";
import KPPromptPage from "../page/prompt/KPPromptPage";
import KPBadgePage from "../page/badge/KPBadgePage";
import KPDrawerPage from "../page/drawer/KPDrawerPage";
import KPNavigationPage from "../page/nav/KPNavigationPage";
import KPPagerListPage from "../page/list/KPPagerListPage";
import KPNoPagerListPage from "../page/list/KPNoPagerListPage";
import KPDatePickerPage from "../page/datepick/KPDatePickerPage";
import LayoutPage from "../page/layout/LayoutPage";
import KPWhiteSpacePage from "../page/layout/KPWhiteSpacePage";
import KPWingBlankPage from "../page/layout/KPWingBlankPage";
import KPCachedImagePage from "../page/image/KPCachedImagePage";
// step
import StepPage from "../page/step/StepPage";
import KPStepStandardPage from "../page/step/KPStepStandardPage";
import KPStepCustomPage from "../page/step/KPStepCustomPage";
// action sheet
import ActionSheetPage from "../page/actionsheet/ActionSheetPage";

const AppNavigator = createStackNavigator(
  {
    HomePage: { screen: HomePage, navigationOptions: { title: "Demo" } },
    KPBadgePage: {
      screen: KPBadgePage,
      navigationOptions: { title: "Badge" }
    },
    KPButtonPage: {
      screen: KPButtonPage,
      navigationOptions: { title: "Button" }
    },
    KPTextButtonPage: {
      screen: KPTextButtonPage,
      navigationOptions: { title: "TextButton" }
    },
    KPNumberInputPage: {
      screen: KPNumberInputPage,
      navigationOptions: { title: "NumberInput" }
    },
    KPNumberInputListPage: {
      screen: KPNumberInputListPage,
      navigationOptions: { title: "NumberInput" }
    },
    KPToastPage: {
      screen: KPToastPage,
      navigationOptions: { title: "Toast" }
    },
    KPPromptPage: {
      screen: KPPromptPage,
      navigationOptions: { title: "Prompt" }
    },
    KPDrawerPage: {
      screen: KPDrawerPage,
      navigationOptions: { title: "Drawer" }
    },
    KPNavigationPage: {
      screen: KPNavigationPage,
      navigationOptions: { title: "Navigator" }
    },
    KPPagerListPage: {
      screen: KPPagerListPage,
      navigationOptions: { title: "PagerList" }
    },
    KPNoPagerListPage: {
      screen: KPNoPagerListPage,
      navigationOptions: { title: "NoPagerList" }
    },
    KPDatePickerPage: {
      screen: KPDatePickerPage,
      navigationOptions: { title: "DatePicker" }
    },
    KPCachedImagePage: {
      screen: KPCachedImagePage,
      navigationOptions: { title: "CachedImage" }
    },
    // 布局
    // ---
    LayoutPage: {
      screen: LayoutPage,
      navigationOptions: { title: "Layout" }
    },
    KPWhiteSpacePage: {
      screen: KPWhiteSpacePage,
      navigationOptions: { title: "WhiteSpace" }
    },
    KPWingBlankPage: {
      screen: KPWingBlankPage,
      navigationOptions: { title: "WingBlank" }
    },

    // step
    // ---
    StepPage: {
      screen: StepPage,
      navigationOptions: { title: "Step" }
    },
    KPStepStandardPage: {
      screen: KPStepStandardPage,
      navigationOptions: { title: "Step standard" }
    },
    KPStepCustomPage: {
      screen: KPStepCustomPage,
      navigationOptions: { title: "Step custom" }
    },

    // actionsheet
    // ---
    ActionSheetPage: {
      screen: ActionSheetPage,
      navigationOptions: { title: "ActionSheet" }
    }
  },
  {
    initialRouteName: "HomePage"
  }
);

export default createAppContainer(AppNavigator);
