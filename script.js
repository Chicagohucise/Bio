const {createApp, ref, computed, onMounted, reactive, onUnmounted, nextTick} = Vue;

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '[]░▒▓█▀▄⣿';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));

        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';

            const start = Math.floor(i * 1.5);
            const end = start + Math.floor(Math.random() * 15) + 15;

            this.queue.push({from, to, start, end});
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

createApp({
    setup() {
        const isNavOpen = ref(false);
        const isScrolled = ref(false);
        const activeSection = ref('home');
        const showCommissions = ref(false);
        const showHistory = ref(false);
        const typedElement = ref(null);
        const bioText = ref(null);
        const article = ref('an');

        const handleScroll = () => {
            isScrolled.value = window.scrollY > 50;
        };

        const initScrollReveal = () => {
            const revealElements = document.querySelectorAll('.reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, {threshold: 0.15});

            revealElements.forEach((el) => observer.observe(el));
        };

        const socials = [
            {icon: 'bx bxl-twitter', link: 'https://x.com/ChicagoHucise'},
            {icon: 'bx bxl-github', link: 'https://github.com/Chicagohucise'},
            {icon: 'bx bxl-discord', link: 'https://discordapp.com/users/792591311190228994'},
            {icon: 'bx bxl-steam', link: 'https://steamcommunity.com/id/Hucies'},
            {
                icon: 'bx bxl-spotify',
                link: 'https://open.spotify.com/user/31chfbbi4id7bdjyurr27iamqrcm?si=fbb5dc6e53384b65'
            }
        ];

        const projects = ref([
            {
                client: 'Finn',
                type: 'Half Body/Painterly Style',
                payment: 'Prepaid ¥350',
                progress: 100,
                due: '2026/1/15',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=761874227&s=100'
            },
            {
                client: '长者森中魔沼蛙',
                type: 'Expression*3/Chibi Style||Avatar*1/Painterly Style',
                payment: 'Prepaid ¥400',
                progress: 100,
                due: '2026/2/28',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=923339837&s=100'
            },
            {
                client: 'ALExEWolf',
                type: 'Painterly Style Half Body (2 Characters)',
                payment: 'Prepaid ？',
                progress: 100,
                due: '2026/2/12',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1069454358&s=100'
            },
            {
                client: 'Seigfried',
                type: 'Painterly Style Half Body (2 Characters)',
                payment: 'Prepaid ¥450',
                progress: 100,
                due: '2026/3/6',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2208439874&s=100'
            },
            {
                client: 'TowDas',
                type: 'Half Body/Flat Color',
                payment: 'Quote ¥250',
                progress: 10,
                due: '2026/3/10',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2284852944&s=100'
            },
            {
                client: 'kirin_white 麒麟白牙',
                type: 'Half Body Background included/Flat Color/',
                payment: 'Quote ¥300',
                progress: 10,
                due: '2026/3/10',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2302740884&s=100'
            },
            {
                client: '哈草咪',
                type: 'Queue',
                payment: '-',
                progress: 0,
                due: '2026/3/10',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2318219600&s=100'
            },
            {
                client: 'AzoRyan',
                type: 'Painterly Style Half Body (2 Characters)',
                payment: '--',
                progress: 20,
                due: '2026/-/-',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=3040129349&s=100'

            }
        ]);


        const history = ref([
            {client: '沧屿', type: 'Half Body/Painterly Style', amount: '¥350', date: '2025/11/7'},
            {client: 'kirin_white 麒麟白牙', type: 'Chibi Avatar', amount: '¥150', date: '2025/11/15'},
            {client: '沧屿', type: 'Expression', amount: '¥50', date: '2025/11/7'},
            {
                client: 'Seigfried',
                type: 'Half Body (2 Characters)/Painterly Style',
                amount: '¥450',
                date: '2025/11/3'
            },
            {
                client: '零贰',
                type: 'Half Body (2 Characters)/Flat Color',
                amount: '¥250+Support Tip ¥33 Thank you for the additional tip 💖',
                date: '2025/10/9'
            },
            {client: 'Seigfried', type: 'Half Body (2 Characters)/Flat Color', amount: '¥250', date: '2025/9/25'},
        ]);

        const commissionTypes = [
            {
                title: 'ICON / HEAD',
                price: 'Start from ¥150 / $25',
                desc: 'Perfect for social media avatars. High resolution with simple background.',
                icon: 'bx bxs-face'
            },
            {
                title: 'HALF BODY',
                price: 'Start from ¥300 / $45',
                desc: 'Waist-up character drawing showing clothing details and accessories.',
                icon: 'bx bxs-user'
            },
            {
                title: 'FULL BODY',
                price: 'Start from ¥500 / $75',
                desc: 'Full character design with dynamic posing and complex shading.',
                icon: 'bx bxs-user-detail'
            }
        ];


        const baseUrl = '/api/images/';

        const list = [
            'Chibi Style Avatar',                       // id: 1
            'Painterly Style Half Body',                // id: 2
            'Chibi Style Avatar',                       // id: 3
            'Flat Color Full Body (2 Characters)',      // id: 4
            'Flat Color Custom Character Expression',   // id: 5
            'Painterly Style Half Body',                // id: 6
            'Flat Color Full Body',                     // id: 7
            'Painterly Style Half Body',                // id: 8
            'Painterly Style Half Body',                // id: 9
            'Painterly Style Half Body (2 Characters)', // id: 10
            'Painterly Style Half Body',                // id: 11
            'Flat Color Half Body (2 Characters)',      // id: 12
            'Painterly Style Half Body',                // id: 13
            'Painterly Style Custom Character Expression', // 14
            'Chibi Style Avatar',                       // 15
            'Painterly Style Avatar',                   // 16
            'Painterly Style Avatar'                    // 17
        ];

        const artworks = ref(list.map((desc, index) => {
            const id = index + 1;

            const category = desc.split(' ').slice(0, 2).join(' ');

            return {
                id: id,
                title: '--',
                category: category,
                url: `${baseUrl}${id}.jpg`,
                desc: desc
            };
        }));

        const lightbox = reactive({open: false, current: {}});

        const toggleCommissions = () => {
            if (!showCommissions.value) {
                showCommissions.value = true;
                setTimeout(() => {
                    const el = document.getElementById('commission-content');
                    if (el) {
                        el.scrollIntoView({behavior: 'smooth', block: 'start'});
                    }
                }, 150);

                nextTick(() => {
                    setTimeout(initScrollReveal, 300);
                });
            } else {
                showCommissions.value = false;
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        };

        const scrollTo = (id) => {
            isNavOpen.value = false;
            document.getElementById(id).scrollIntoView({behavior: 'smooth'});
        };

        const openLightbox = (art) => {
            lightbox.current = art;
            lightbox.open = true;
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);

            if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0, 0);

            const baseStrings = ["Artist.", "Engineer.", "Gamer.", "Furry.", "Architect.", "Illustrator.", "Analyst.", "Developer."];

            if (Math.random() < 0.2) {
                baseStrings.push("Idiot sandwich.^1000");
                console.log("Easter Egg: Idiot Sandwich Mode Activated 🍞");
            }

            new Typed(typedElement.value, {
                strings: baseStrings,
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 1500,
                startDelay: 500,
                loop: true,
                smartBackspace: true,
                cursorChar: '_',
                preStringTyped: (arrayPos, self) => {
                    const word = self.strings[arrayPos];
                    const firstChar = word.charAt(0).toLowerCase();
                    const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(firstChar);
                    article.value = isVowel ? 'an' : 'a';
                }
            });

            new SweetScroll({trigger: 'a[href^="#"]', offset: -80});

            if (bioText.value) {
                const el = bioText.value;
                const targetText = "A digital artist & developer based in China. My fursonas are a wolf and a bird. I love bringing characters to life through code and art.";
                const fx = new TextScramble(el);
                setTimeout(() => {
                    fx.setText(targetText);
                }, 800);
            }
        });


        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            article,
            isNavOpen, isScrolled, activeSection, showCommissions, showHistory,
            typedElement, socials, projects, history, commissionTypes,
            artworks, lightbox,
            toggleCommissions, scrollTo, openLightbox,
            bioText
        };
    }
}).mount('#app');

document.oncontextmenu = function () {
    return false;
};
document.onkeydown = function (e) {
    if (e.keyCode === 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) return false;
    if (e.ctrlKey && e.keyCode === 85) return false;
};
