/**
 * @author xukj
 * @date 2019/03/28
 * @description index
 */
import React from 'react';
import Portal from '../portal';
import KPToastView from './KPToastView';

function notice(content, type, duration = 2, onClose = () => {}, mask = true) {
    const key = Portal.add(
        <KPToastView
            content={content}
            duration={duration}
            onClose={onClose}
            mask={mask}
            type={type}
            onAnimationEnd={() => Portal.remove(key)}
        />,
    );
    return key;
}

function hide(key) {
    Portal.remove(key);
}

export default {
    SHORT: 3,
    LONG: 8,
    show(content, duration, onClose, mask) {
        return notice(content, '', duration, onClose, mask);
    },
    success(content, duration, onClose, mask) {
        return notice(content, 'success', duration, onClose, mask);
    },
    fail(content, duration, onClose, mask) {
        return notice(content, 'fail', duration, onClose, mask);
    },
    help(content, duration, onClose, mask) {
        return notice(content, 'help', duration, onClose, mask);
    },
    alert(content, duration, onClose, mask) {
        return notice(content, 'alert', duration, onClose, mask);
    },
    hide,
};
