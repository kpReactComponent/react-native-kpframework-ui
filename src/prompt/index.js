/**
 * @author xukj
 * @date 2018/8/15
 * @description 等待指示器，显示一个loading + text的等待框
 */
import React from 'react';
import Portal from '../portal';
import KPLoadingView from './KPLoadingView';

/**
 * 显示loading
 * @param {string} content 文字
 * @param {number} duration 自动关闭，默认0不自动关闭
 * @param {bool} mask 是否屏蔽手势
 * @return {string} 返回关闭的值
 */
function loading(content, duration = 0, mask = true) {
    const key = Portal.add(
        <KPLoadingView
            content={content}
            duration={duration}
            mask={mask}
            onAnimationEnd={() => Portal.remove(key)}
        />,
    );
    return key;
}

/**
 * 关闭loading
 * @param {string} key 关闭loading的key
 */
function hide(key) {
    Portal.remove(key);
}

export default {
    loading,
    hide,
};
