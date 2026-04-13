import { navigation } from "./JS/navigation.js";
import { contact } from "./JS/contact.js";
import { initmodal } from "./JS/modal.js";
import { chat } from "./JS/chat.js";
import { scrolls } from "./JS/scrolls.js";
import { serviceslink } from "./JS/services.js";

window.scrolls = scrolls;
document.addEventListener("DOMContentLoaded",() =>{
    const btnburger = document.querySelector('.btn_burger');
    const abouts = document.querySelectorAll('.hidden');
    // module
    navigation();
    initmodal();
    chat();
    serviceslink();
    contact();

    if(btnburger){
        // menu burger
        btnburger.addEventListener('click',(e) =>{
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('active');
            if(menu.classList.contains('active')){
                iconburger.setAttribute('name','close-outline');
                document.body.classList.add('no_scroll');
            }else{
                iconburger.setAttribute('name','menu-outline');
                document.body.classList.remove('no_scroll');
            }
        
            })
    }
    // mivoaka tsikelikely ny contenue page
    const mjr = new IntersectionObserver((entry) =>{
        entry.forEach(entries =>{
            if(entries.isIntersecting){
                entries.target.classList.add('show');
            }
        });
    });
    abouts.forEach(about =>{
        mjr.observe(about)

    })
// charge la page de conact dia aveo zffecter le valeur
    const subject = document.getElementById("sujet");
    if(subject){
        const urlParams = new URLSearchParams(location.search);
        const serviceP = urlParams.get("service");
        if(serviceP){
            subject.value = serviceP;
        }
        if(window.location.pathname.endsWith("contact.html")){
            window.history.replaceState({},document.title,"contact.html");
        }

    }
 
});
const footer = document.getElementById("droit")
footer.textContent = new Date().getFullYear();

