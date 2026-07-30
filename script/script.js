gsap.registerPlugin(ScrollTrigger);
gsap.to(".timeline_fill",{

    height:"100%",

    ease:"none",

    scrollTrigger:{

        trigger:".process",

        start:"top center",

        end:"bottom center",

        scrub:true

    }

});

gsap.utils.toArray(".circle").forEach(circle=>{

    ScrollTrigger.create({

        trigger:circle,

        start:"top center",

        onEnter:()=>{

            circle.classList.add("active");

        },

        onLeaveBack:()=>{

            circle.classList.remove("active");

        }

    });

});

// FAQ
const items = document.querySelectorAll('.faq_one');
items.forEach(item => {
  const btn = item.querySelector('.button_faq_q');   // кнопка-вопрос 
  const answer = item.querySelector('.faq_a'); // блок ответа
  const icon = item.querySelector('.faq_icon');    // svg-иконка

  btn.addEventListener('click', () => {
    // Запоминаем, был ли этот блок уже открыт ДО того, как начнём всё закрывать
    const isOpen = item.classList.contains('open');

    // Шаг 1: закрываем АБСОЛЮТНО ВСЕ блоки (это и даёт эффект "открыт только один")
    items.forEach(i => {
      i.classList.remove('open');                          // убираем метку "открыт"
      i.querySelector('.faq_a').style.maxHeight = '0px';    // схлопываем ответ
      i.querySelector('.faq_icon').style.transform = 'rotate(0deg)'; // возвращаем иконку в исходное положение
    });

    // Шаг 2: если кликнутый блок был ЗАКРЫТ — открываем именно его
    // (если он был открыт — просто оставляем закрытым, повторный клик = закрытие)
    if (!isOpen) {
      item.classList.add('open');                                   // помечаем как открытый
      answer.style.maxHeight = answer.scrollHeight + 'px';           // ставим реальную высоту контента (иначе анимация не сработает — из 0 в "auto" CSS-transition не умеет)
      icon.style.transform = 'rotate(45deg)';                        // поворачиваем плюсик на 45° — визуально он превращается в "крестик закрытия" / указывает на открытое состояние
    }
  });
});

//попап контакты
const popup = document.getElementById("popup_contact");

const close = document.querySelector(".button_popup_close");

document.querySelectorAll(".open-popup").forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.preventDefault();

        popup.classList.add("active");

        gsap.fromTo(".popup_contant",
        {
            y:40,
            opacity:0,
            scale:.95
        },
        {
            y:0,
            opacity:1,
            scale:1,
            duration:.35,
            ease:"power3.out"
        });

    });

});

close.addEventListener("click",()=>{

    popup.classList.remove("active");

});

document.querySelector(".popup_overlay").addEventListener("click",()=>{

    popup.classList.remove("active");

});

//ПОПАП кейсы
// Открытие попапов кейсов
// ===== ПОПАП КЕЙСЫ =====

// 1. Открытие попапов по кнопке .button_case
document.querySelectorAll('.button_case').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const popupId = btn.dataset.popup; // 'case1', 'case2', 'case3'
        if (!popupId) return;
        const popup = document.getElementById(`popup_${popupId}`);
        if (!popup) return;

        // Закрываем все другие открытые попапы кейсов (чтобы не было двух сразу)
        document.querySelectorAll('.popup[id^="popup_case"]').forEach(p => {
            if (p.id !== `popup_${popupId}`) {
                p.classList.remove('active');
            }
        });

        // Открываем нужный
        popup.classList.add('active');

        // Анимация появления
        gsap.fromTo(popup.querySelector('.popup_contant'),
            { y: 40, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' }
        );

        // Сбрасываем навигацию к первому слайду
        const slides = popup.querySelectorAll('.popup_case_content');
        const points = popup.querySelectorAll('.case_nav_point');
        if (slides.length) {
            slides.forEach(s => s.classList.remove('active'));
            points.forEach(p => p.classList.remove('active'));
            slides[0].classList.add('active');
            points[0].classList.add('active');
        }
    });
});

// 2. Закрытие попапов (по клику на фон + по кнопке ✕)
document.querySelectorAll('.popup[id^="popup_case"]').forEach(popup => {
    // Кнопка закрытия внутри попапа
    const closeBtn = popup.querySelector('.button_popup_close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });
    }

    // Клик по фону (оверлей) — для этого добавляем overlay в разметку
    // Если в попапе нет .popup_overlay — создаём его динамически
    let overlay = popup.querySelector('.popup_overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'popup_overlay';
        popup.prepend(overlay);
    }
    overlay.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // 3. Навигация внутри попапа
    const slides = popup.querySelectorAll('.popup_case_content');
    const points = popup.querySelectorAll('.case_nav_point');
    const nextBtn = popup.querySelector('.case_nav_next');
    const prevBtn = popup.querySelector('.case_nav_back');

    if (!slides.length) return;

    let current = 0;

    function showSlide(index) {
        // Защита от выхода за границы
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach(s => s.classList.remove('active'));
        points.forEach(p => p.classList.remove('active'));

        slides[index].classList.add('active');
        points[index].classList.add('active');
        current = index;
    }

    // Клик по точкам
    points.forEach((point, idx) => {
        point.addEventListener('click', () => {
            showSlide(idx);
        });
    });

    // Стрелка "вперёд"
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(current + 1);
        });
    }

    // Стрелка "назад"
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(current - 1);
        });
    }

    // Показываем первый слайд при загрузке
    showSlide(0);
});

// 4. Закрытие по клавише ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup.active').forEach(p => {
            p.classList.remove('active');
        });
    }
});