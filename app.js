import { navigation } from "./JS/navigation.js";
import { contact } from "./JS/contact.js";
import { initmodal } from "./JS/modal.js";
import { chat } from "./JS/chat.js";
import { scrolls } from "./JS/scrolls.js";

import {linkAndNumber} from "./JS/linkAndNumber.js";
window.scrolls = scrolls;
document.addEventListener("DOMContentLoaded",() =>{
    const abouts = document.querySelectorAll('.hidden');
    // module
    navigation();
    initmodal();
    chat();
    contact();
    linkAndNumber();


   
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
// charge la page de contact dia aveo zffecter le valeur
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
const footer = document.getElementById("droit");
if(footer){
    footer.textContent = new Date().getFullYear();
}


