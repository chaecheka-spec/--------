<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
gsap.registerPlugin(ScrollTrigger);
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>

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