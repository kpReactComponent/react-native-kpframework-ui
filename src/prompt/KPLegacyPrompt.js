/**
 * @author xukj
 * @date 2019/07/02
 * @description V1版本遗留的提示框组件
 * 不再维护 KPLegacyPromptModal/KPLegacyPromptView/KPLegacyPromptLoadingView
 * 替换为全局调用方式的 KPPrompt.loading('文本')
 */
import KPLegacyPromptModal from './KPLegacyPromptModal';
import KPLegacyPromptView from './KPLegacyPromptView';
import KPLegacyPromptLoadingView from './KPLegacyPromptLoadingView';

export default {
    Modal: KPLegacyPromptModal, // model形式的等待框
    View: KPLegacyPromptView, // view形式的等待框
    LoadingView: KPLegacyPromptLoadingView, // 等待框
};
