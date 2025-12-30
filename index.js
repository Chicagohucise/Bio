/**
 * ============================================================
 * 1. 全局常量与元素获取
 * ============================================================
 */
const NAV_BAR        = document.getElementById('navBar');
const NAV_LIST       = document.getElementById('navList');
const HERO_HEADER    = document.getElementById('heroHeader');
const HAMBURGER_BTN  = document.getElementById('hamburgerBtn');
const NAV_LINKS     = Array.from(document.querySelectorAll('.nav__list-link'));
const COMM_BTN       = document.getElementById('btnCommission');
const COMM_SECTION   = document.getElementById('commission-section');
const NAV_COMM_LINK  = document.getElementById('navCommissionLink');

/**
 * ============================================================
 * 2. 公共工具函数
 * ============================================================
 */

// 重置导航栏状态（主要用于移动端收起菜单）
const resetActiveState = () => {
    NAV_LIST.classList.remove('nav--active');
    Object.assign(NAV_LIST.style, { height: null });
    Object.assign(document.body.style, { overflowY: null });
};

// 切换委托区域（Commission）的显示与隐藏
function toggleCommissions() {
    COMM_SECTION.classList.toggle('expanded');

    // 展开后平滑滚动到目标区域
    if (COMM_SECTION.classList.contains('expanded')) {
        setTimeout(() => {
            COMM_SECTION.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

/**
 * ============================================================
 * 3. 交互事件监听
 * ============================================================
 */

// --- 汉堡菜单逻辑 ---
HAMBURGER_BTN.addEventListener('click', () => {
    NAV_LIST.classList.toggle('nav--active');

    if (NAV_LIST.classList.contains('nav--active')) {
        Object.assign(document.body.style, { overflowY: 'hidden' });
        Object.assign(NAV_LIST.style, { height: '100vh' });
    } else {
        Object.assign(NAV_LIST.style, { height: 0 });
        Object.assign(document.body.style, { overflowY: null });
    }
});

// --- 导航链接点击处理 ---
NAV_LINKS.forEach(link => {
    link.addEventListener('click', resetActiveState);
});

// --- 委托区域触发逻辑 ---
if (COMM_BTN) {
    COMM_BTN.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCommissions();
    });
}

if (NAV_COMM_LINK) {
    NAV_COMM_LINK.addEventListener('click', (e) => {
        e.preventDefault();
        // 若未展开则展开，已展开则直接滚动
        if (!COMM_SECTION.classList.contains('expanded')) {
            toggleCommissions();
        } else {
            COMM_SECTION.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        resetActiveState(); // 关闭移动端菜单
    });
}

/**
 * ============================================================
 * 4. 第三方库初始化
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Typed.js 打字机动画初始化
    if (document.querySelector(".auto-type")) {
        new Typed(".auto-type", {
            strings: ["Artist.", "Developer.", "Gamer.", "Furry."],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            smartBackspace: true,
            cursorChar: '_',
        });
    }

    // SweetScroll 平滑滚动初始化
    new SweetScroll({
        trigger: '.nav__list-link[href^="#"]',
        easing: 'easeOutQuint',
        offset: -80 // 抵消导航栏高度
    });
});