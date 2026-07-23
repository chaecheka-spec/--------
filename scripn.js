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

//попап
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