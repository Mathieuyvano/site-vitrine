import {afficherpopup} from "./popup.js";


export function linkAndNumber(){
    const assist = document.getElementById("assist");
    if(assist){
        assist.addEventListener("click", function(){
            window.location.href = "contact.html";
        })
    }

    const message = "Bonjour, je souhaite planifier un appel concernant vos services d'assistance.";
    const num = "261332045172";
    const whtsp = document.querySelectorAll(".whtsp_url")
       if(whtsp){
        whtsp.forEach(w =>{
            w.addEventListener('click',() =>{
                const encodeMg = encodeURIComponent(message);
                const url = `https://wa.me/${num}?text=${encodeMg}`;
                window.open(url,"_blank");
            })
            
        });
       }
    
    const email = document.querySelectorAll(".email_url");
    if(email){
        email.forEach(e =>{
            e.addEventListener("click",async () =>{
                const text = e.querySelector("p") ?? e.querySelector("a");
                if(!text) return;
                try{
                    await navigator.clipboard.writeText(text);
                    afficherpopup(true,`Adresse email ${text.textContent.trim()} copiée dans le presse-papier`);
                }catch(e){
                    afficherpopup(false,"Impossible de copier l'adresse email dans le presse-papier");
                }
            })
        })
      
       
    }
    
}