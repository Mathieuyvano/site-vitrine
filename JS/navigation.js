import { url } from "../config.js";
import { afficherpopup } from "./popup.js";
export function navigation(){
    const{
        link,
        accueil,
        btnburger,
        menu,
        iconburger,
        nav_button,
        projet,
        email,
        assist,
        whtsp,
        button_t
    }={
         link:document.querySelectorAll('nav .navigation ul li a'),
         accueil:document.getElementById("entreprise"),
         menu:document.querySelector(".navigation"),
         btnburger:document.querySelector('.btn_burger'),
         iconburger:document.querySelector('.btn_burger ion-icon'),
         nav_button:document.getElementById("navbar_button"),
         projet:document.querySelectorAll(".projet"),
        email:document.querySelectorAll(".email_url"),
        assist:document.getElementById("assist"),
        whtsp: document.querySelectorAll(".whtsp_url"),
        button_t:document.querySelectorAll(".tarif_button")
    }
  
    if(projet){
        projet.forEach((p)=>{
            p.addEventListener("click",()=>{
                window.location.href = url("contenu/contact.html")
            })
        })

    }

    if(accueil){
        accueil.addEventListener("click", () =>{
           window.location.href = url("accueil.html");

        })
    } 
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
     //  mgerer dynamiquement ny boutton active
     link.forEach(l =>{
        l.addEventListener('click',function(){
            link.forEach(links => links.classList.remove('active'));
            this.classList.add('active');
        })
    })   
    if(nav_button){
        nav_button.addEventListener("click",()=>{
          window.location.href = url("contenu/contact.html");
        })
    }
    
    if(assist){
        assist.addEventListener("click", function(){
            window.location.href = url("contenu/contact.html");
        })
    }

    
    if(whtsp){
        const message = "Bonjour, je souhaite planifier un appel concernant vos services d'assistance.";
        const num = "261332045172";
        whtsp.forEach(w =>{
            w.addEventListener('click',() =>{
                const encodeMg = encodeURIComponent(message);
                const url = `https://wa.me/${num}?text=${encodeMg}`;
                window.open(url,"_blank");
            })
            
        });
       }
    
    
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
    if(button_t){
        button_t.forEach((b)=>{
            b.addEventListener("click",()=>{
               const card = b.closest(".info_tarif");
                const titres = card.querySelector("h3").textContent.trim() ?? "";
                window.location.href = url("contenu/contact.html?tarif=" + encodeURIComponent(titres));
            })
        })
    }
            
}
