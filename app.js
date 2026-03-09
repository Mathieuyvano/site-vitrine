const btnburger = document.querySelector('.btn_burger');
const menu = document.querySelector('.navigation');
const iconburger = document.querySelector('.btn_burger ion-icon');
const link = document.querySelectorAll('nav .navigation ul li a');
const abouts = document.querySelectorAll('.hidden');
const modal = document.getElementById("mymodal");
const h2 = document.getElementById("modaltitres");
const p = document.getElementById("paragraphes_content");
const p2 = document.getElementById("paragraphes_content2");
const modalImg = document.getElementById("modalimg");
const closebtn  =document.querySelector(".icon_close");
const prix = document.getElementById("prix");
const accueil = document.getElementById("entreprise");



// makany page hafa
function navigation(){
    const links = {
        "projet":"frontend/contact.html",
        "more-services":"frontend/services.html",
        "moreinfo":"frontend/propos.html",
        
    }
    for(let i in links){
        const elmt = document.getElementById(i)

        if(elmt){
            elmt.addEventListener('click',() =>{
                window.location.href = links[i];
            })
        }
    }
    if(accueil){
        accueil.addEventListener("click", () =>{
           window.location.href = "/index.html";

        })
    } 
    
}
 document.addEventListener("DOMContentLoaded",navigation)
// menu deroulalnt
function serviceslink(){
    const link = document.querySelector(".allservices ion-icon");
    const links = document.querySelector("#service_p ul ")
    links.classList.toggle('show');
    if(links.classList.contains('show')){
        link.setAttribute('name','chevron-down-outline');
    }else{
        link.setAttribute('name','chevron-forward-outline');
    }
    window.addEventListener('click',(e) =>{
        if(!e.target.closest(".allservices")){
            links.classList.remove('show');
            link.setAttribute('name','chevron-forward-outline');
        }
    })
}
function scrolls(){
    const services = document.getElementById("services");
    const nav = document.getElementById("navbars");
    const navheight = nav.offsetHeight;
    const top = services.getBoundingClientRect().top + window.scrollY - navheight;
    window.scrollTo({
        top:top,
        behavior:"smooth"
    })
} 

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
//  mgerer dynamiquement ny boutton active
link.forEach(l =>{
    l.addEventListener('click',function(){
        link.forEach(links => links.classList.remove('active'));
        this.classList.add('active');
    })
})



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
// misokatra ny modal
function openmodal(btn){
   
    document.getElementById("buttons_modal").addEventListener('click', function(){
        const service = h2.textContent.trim();
        window.location.href = "/frontend/contact.html?service=" + encodeURIComponent(service) ;    
    })
    const card = btn.closest(".card");
            if(card){
                const image = card.querySelector("img")?.src;
                const texttitres = card.querySelector("h2")?.textContent;
                const paragraphestext = card.querySelector("div > #p_content1 ")?.innerHTML;
                const paragraphestext2 = card.querySelector("#p_content2")?.innerHTML;
                const prixmodal = card.querySelector(".idprix")?.innerHTML;
                modalImg.src = image;
                h2.textContent = texttitres;
                p.innerHTML = paragraphestext;
                p2.innerHTML = paragraphestext2;
                prix.innerHTML = prixmodal;
                modal.style.display = "block";
            }  
            else{
                const image = btn.dataset.img;
                const texttitres = btn.dataset.title;
                const paragraphestext = btn.dataset.p;
                const ptext2 = btn.dataset.p2;
                const prixmodal = btn.dataset.price;
                const formatted = prixmodal.replace(/\d+/g, match =>{
                    return `<span class="color_number">${match}</span>`;
                 })
                modalImg.src = image;
                h2.textContent = texttitres;
                p.innerHTML = paragraphestext;
                p2.innerHTML = ptext2;
                prix.innerHTML = formatted;
                modal.style.display = "block";
              
            } 
        
}
// charge la page de conact dia aveo zffecter le valeur
const subject = document.getElementById("sujet");
document.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(location.search);
    const serviceP = urlParams.get("service");
    if(serviceP){
        subject.value = serviceP;
    }
    if(window.location.pathname.endsWith("contact.html")){
        window.history.replaceState({},document.title,"contact.html");
    }
    
})
// fermeture du modal
function closemodal(){
    
    if(closebtn){
        closebtn.addEventListener('click',(e)=>{
            e.preventDefault();
            const link = document.querySelectorAll("#service_p ul li a").forEach(l =>{
                l.classList.remove("active");
            })
            
            modal.style.display ="none";
                    
        });
    }
    window.addEventListener('click',(e) =>{
        if(e.target === modal){
            modal.style.display ="none";      
        }
    });
}
document.addEventListener("DOMContentLoaded",closemodal);
// chat
function chat(){
    const send = document.getElementById("button_send");
    const first = document.getElementById("first_mes");
    const second = document.getElementById("seconds_m");
    const buttons = document.getElementById("button_chat");
    const messageContainer = document.getElementById("content_mes");
    const messageinput = document.getElementById("input_message");
    const user_message = document.getElementById("user_message");
    const chat_form = document.getElementById("chat_form");
    const email = document.getElementById("id_email");
    const noms = document.getElementById("chat_nom");
    const mes = document.getElementById("id_message");
    const form = document.getElementById("formchat");
    const error = document.querySelectorAll("#formchat .errors")
    let Iserror = false;
    buttons.addEventListener('click',()=>{
        const chatbox = document.getElementById("chat_main");
        const icons = document.querySelector(".button_chat ion-icon");
        if(chatbox.style.display === "block"){
            chatbox.style.display = "none";
            icons.setAttribute('name','chatbubble-ellipses-outline');
            document.body.classList.remove('no_scroll');
        }else{
            chatbox.style.display = "block";
            icons.setAttribute('name','close-outline');
            document.body.classList.add('no_scroll');

        }
    })
    function sendmessage(){
        const message = messageinput.value.trim();
        user_message.style.display = "block";
        if(message !== ""){
            const newmsg = document.createElement("p");
            newmsg.classList.add("user_message");
            newmsg.textContent = message;
            newmsg.style.textAlign = "left";
            user_message.appendChild(newmsg);
            
            messageinput.value = "";
            messageContainer.scrollTop = messageContainer.scrollHeight;
            first.style.display = "block";
            second.style.display = "block";  
            messageinput.disabled = true;
        }  
    }
    //  mandefa message voalohany
    send.addEventListener('click',sendmessage )
    messageinput.addEventListener("keydown",(e) =>{
        if(e.key == "Enter"){
            e.preventDefault();
            sendmessage()
        }

    })
    document.querySelectorAll("#formchat input,#formchat textarea ").forEach((elt,index) =>{
        elt.addEventListener("input",function(){
          if(elt.checkVisibility()){
            elt.classList.remove("invalid");
            elt.classList.add("valid");
          }
          if(error[index]){
            error[index].style.display = "none";
            error[index].textContent = "";
          }
          else{
            elt.classList.add("invalid");
            elt.classList.remove("valid");
        }
        })
        elt.addEventListener("blur",function(){
            if(elt.value.trim() == ""){
                elt.classList.add("invalid");
                elt.classList.remove("valid");
                error[index].style.display = "block";
                error[index].textContent = "Veuillez remplir le champ";
            
            }else{
                elt.classList.remove("invalid");
                elt.classList.add("valid");
                error[index].style.display = "none";
                error[index].textContent = "";
            }
        })
       
    })
    if(form){
        form.addEventListener("submit", (e) =>{
            e.preventDefault();
            error.forEach(block =>{
                block.style.display = "none";
                block.textContent = "";
            })
            if( noms.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(noms.value.trim())){
                error[0].style.display = "block";
                error[0].textContent = "nom invalide";
                Iserror = true;
    
            }
            if(email.value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
                error[1].style.display = "block";
                error[1].textContent = "Email requise ou invalide";
                Iserror = true;
            }
            if(mes.value.trim() === "" || mes.value.trim().length < 10){
                error[2].style.display = "block";
                error[2].textContent = "Message invalide ou vide";
                Iserror = true;
            }
            if(!Iserror){
                alert("message envoyé avec succès");
                form.reset();
                form.addEventListener("reset",function(){
                    error.forEach(block =>{
                        block.style.display = "none";
                        block.textContent = "";
                    })
                    document.querySelectorAll("#formchat input, textarea").forEach(l =>{
                        l.classList.remove("invalid","valid");
                    })
                })
            }   
    
        })
    }
    
    if(chat_form){
        chat_form.addEventListener("submit",(e)=>{
            e.preventDefault();
            if( !/^[a-zA-Z]+\s+[a-zA-Z]+$/.test(noms.value.trim())){
                error[0].style.display = "block";
                error[0].textContent =  "noms incomplet";
                Iserror = true;
           
            }
            if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
                error[1].style.display = "block";
                error[1].textContent = "email non valide";
                Iserror = true;
                
            }
            if(!/^[a-zA-Z]+$/.test(mes.value.trim()) || mes.value.trim().length < 10){
                error[2].style.display = "block";
                error[2].textContent = "message non valide"
                Iserror = true
            }
            if(!Iserror){
                alert("Données envoyés avec succès");
                chat_form.reset();
            }
    
        })
    }
    
    
}
document.addEventListener("DOMContentLoaded",chat);

// contact 
function contact(){
    const form = document.getElementById("form_contact");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const message = document.getElementById("messages");
    const error = document.querySelectorAll("#form_contact .errors");
    const subject = document.getElementById("sujet");
    let Iserror = false;  
 
    document.querySelectorAll("#form_contact input,#form_contact textarea").forEach((elmt,index) =>{
        elmt.addEventListener("input", function(){
            if(elmt.checkValidity()){
                elmt.classList.remove("invalid");
                elmt.classList.add("valid");
                // miverina manafina anle erreur
            if(error[index]){
                error[index].style.display = "none";
                error[index].textContent = "";
             }
            }
           
            else{
                elmt.classList.add("invalid");
                elmt.classList.remove("valid");
            }  
        })
        elmt.addEventListener("blur",function(){
            if(elmt.value.trim() == ""){
                elmt.classList.add("invalid");
                elmt.classList.remove('valid');
                error[index].style.display = "block";
                error[index].textContent = "Veuillez remplir le champ";
            }else{
                elmt.classList.remove("invalid");
                elmt.classList.add("valid");
                error[index].style.display = "none";
                error[index].textContent = "";
            }
        })
    })
    
    if(form){
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            error.forEach(block => {
                block.style.display = "none";
                block.textContent = "";
                
            } )
           
            
            if( nom.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(nom.value.trim())){
                error[0].style.display = "block";
                error[0].textContent = "nom invalide ou vide";
                Iserror = true;
    
            }
            if( prenom.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(prenom.value.trim())){
                error[1].style.display = "block";
                error[1].textContent = "prenom invalide";
                Iserror = true;
            }
            if(email.value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
                error[2].style.display = "block";
                error[2].textContent = "Email requise ou invalide";
              Iserror = true;
            }
           
            if(subject.value.trim() === "" || subject.value.trim().length < 5){
                error[3].style.display = "block";
                error[3].textContent = "Sujet invalide ou vide";
                Iserror = true;
            }
            if(message.value.trim() === "" || message.value.trim().length < 10){
                error[4].style.display = "block";
                error[4].textContent = "Message invalide ou vide";
                Iserror = true;
            }
           const verif =  document.querySelectorAll("#form_contact  input, #form_contact  textarea")
            if(!Iserror){
                alert("message envoyé avec succès");
                form.reset();
                form.addEventListener("reset", function(){
                    error.forEach(block =>{
                        block.style.display = "none";
                        block.textContent = "";
                    })
                    verif.forEach(el =>{
                        el.classList.remove('invalid');
                        el.classList.add("valid");
                    })
                      
                })
            }else{
                verif.forEach(el =>{
                    el.classList.add("invalid");
                    el.classList.remove("valid");
                })
            }
    
        })
    }
   
   
}   
// footer
const footer = document.getElementById("droit")
footer.textContent = new Date().getFullYear();