/**
 * ============================================================
 * 1. 全局常量与元素获取
 * ============================================================
 */
const NAV_BAR = document.getElementById('navBar');
const NAV_LIST = document.getElementById('navList');
const HERO_HEADER = document.getElementById('heroHeader');
const HAMBURGER_BTN = document.getElementById('hamburgerBtn');
const NAV_LINKS = Array.from(document.querySelectorAll('.nav__list-link'));
const COMM_BTN = document.getElementById('btnCommission');
const COMM_SECTION = document.getElementById('commission-section');
const NAV_COMM_LINK = document.getElementById('navCommissionLink');
const HISTORY_BTN = document.getElementById('btnHistoryToggle');
const HISTORY_CONT = document.getElementById('historyContainer');
const TRACKER_SECTION = document.getElementById('commission-tracker-section');
const PORTFOLIO_SECTION = document.getElementById('portfolio-section');

/**
 * ============================================================
 * 2. 公共工具函数
 * ============================================================
 */

// 重置导航栏状态（主要用于移动端收起菜单）
const resetActiveState = () => {
    NAV_LIST.classList.remove('nav--active');
    Object.assign(NAV_LIST.style, {height: null});
    Object.assign(document.body.style, {overflowY: null});
};

// 切换委托区域（Commission）的显示与隐藏
function toggleCommissions() {
    const isExpanding = !COMM_SECTION.classList.contains('expanded');

    COMM_SECTION.classList.toggle('expanded');
    TRACKER_SECTION.classList.toggle('expanded');
    PORTFOLIO_SECTION.classList.toggle('expanded');

    if (isExpanding) {
        setTimeout(() => {
            const rect = TRACKER_SECTION.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;
            const offset = 100;

            window.scrollTo({
                top: absoluteTop - offset,
                behavior: 'smooth'
            });
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
        Object.assign(document.body.style, {overflowY: 'hidden'});
        Object.assign(NAV_LIST.style, {height: '100vh'});
    } else {
        Object.assign(NAV_LIST.style, {height: 0});
        Object.assign(document.body.style, {overflowY: null});
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
        if (!TRACKER_SECTION.classList.contains('expanded')) {
            toggleCommissions();
        } else {
            TRACKER_SECTION.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        resetActiveState();
    });
}

// --- 历史记录切换逻辑 ---
if (HISTORY_BTN) {
    HISTORY_CONT.style.display = 'block'; // 始终保持 block，通过 CSS 控制高度
    HISTORY_BTN.addEventListener('click', () => {
        const isShowing = HISTORY_CONT.classList.toggle('show');
        HISTORY_BTN.innerHTML = isShowing
            ? "<i class='bx bx-chevron-up'></i> Hide Commission History"
            : "<i class='bx bx-chevron-down'></i> Show Commission History";
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

window.addEventListener('load', () => {
    // 延迟一小会儿执行，确保 150% 缩放布局计算完成
    setTimeout(() => {
        const hero = document.querySelector('#heroHeader');
        if (hero) {
            hero.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
    }, 100);

    // --- 导航栏高亮逻辑 (Intersection Observer) ---
    const sections = [
        document.getElementById('heroHeader'),
        document.getElementById('commission-tracker-section'),
        document.getElementById('commission-section')
    ];

    const navLinks = {
        'heroHeader': document.querySelector('.nav__list-link[href="#heroHeader"]'),
        'commission-tracker-section': document.getElementById('navCommissionLink'),
        'commission-section': null // 委托详情共用 Commissions 链接或不单独高亮
    };

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // 触发区域在屏幕中间
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 清除所有高亮
                Object.values(navLinks).forEach(link => link?.classList.remove('active'));

                // 为当前板块对应的链接添加高亮
                const activeLink = navLinks[entry.target.id];
                if (activeLink) {
                    activeLink.classList.add('active');
                } else if (entry.target.id === 'commission-section') {
                    // 如果在委托详情板块，也高亮 Commissions 链接
                    navLinks['commission-tracker-section']?.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section) observer.observe(section);
    });
});




