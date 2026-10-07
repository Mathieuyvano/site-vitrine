import { navigation } from "./JS/navigation.js";
import { contact } from "./JS/contact.js";
import { initmodal } from "./JS/modal.js";
import { chat } from "./JS/chat.js";
import { scrolls } from "./JS/scrolls.js";

import {linkAndNumber} from "./JS/linkAndNumber.js";
window.scrolls = scrolls;
document.addEventListener("DOMContentLoaded",() =>{
    // module
    navigation();
    initmodal();
    chat();
    contact();
    linkAndNumber();


   
    // mivoaka tsikelikely ny contenue page
    const mjr = new IntersectionObserver((entry) =>{
        const visibles = entry.filter((el) =>el.isIntersecting)
        visibles.forEach((entries,index) =>{
           entries.target.style.setProperty("--i",index);
           entries.target.classList.add("show");
           mjr.unobserve(entries.target);
        });
    },{threshold:0.2});
    document.querySelectorAll(".hidden").forEach((el) => mjr.observe(el))
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


