import { afficherpopup } from "./popup.js";


const BOT_RULES = [
    {
        keywords:["administrative","administratif","commercial","commerciale","polyvalent"],
        answer:"Notre assistant polyvalent s'occupe à la fois de vos tâches administratives et commerciales.Souhaitez-vous être rappelés pour en discuter ?",
        ships:["oui, être rappelé","Voir le tarif"]
    },
    {
        keywords:["support client","support","teleoperation","support client & teleoperation"],
        answer:"Notre assistant support client & teleopération répond a vos clients rapidement 24h/24.Voulez-vous en savoir plus ?",
        ships:["oui, être rappelé","Voir le tarif"]
    },
    {
        keywords:["web","digital","web & digital","design"],
        answer:"Notre assistant web & digital est disponible 24h/24 pour répondre à vos questions rapidement. Souhaitez-vous en savoir plus sur nos services ?",
        ships:["oui, être rappelé","Voir le tarif"]
    },
    {
        keywords:["rappele","autre","aute demande","formulaire"],
        answer:"Très bien ! Laisser nous vos coordonnées avec le formulaire ci-dessous et nous vous rappellerons",
        showForm:true
    },
    {   
        weight:0.5,
        keywords:["bonjour","salut","hello","bonsoir","coucou"],
        answer:"Bonjour ! ,comment puis-je vous aider aujourd'huie",
    },
    
    {
        keywords:["prix","cout","tarif","combien"],
        answer:"Nos tarifs dépendent de votre besoin. Remplissez le formulaire de contact pour obtenir un devis personnalisé.",
        showForm:true
    },
    {
        keywords:["horaire","heure","ouvert","ferme"],
        answer:"Nos horaires d'ouverture sont du lundi au vendredi de 9h à 18h. Nous sommes fermés le week-end et les jours fériés."
    },
    {
        keywords: ["contact", "email", "mail", "telephone", "appeler"],
        answer: "Vous pouvez nous écrire via le formulaire de contact de cette page, nous répondons sous 24h.",
        showForm:true
    },
    {
        weight:0.5,
        keywords:["merci","super","parfait"],
        answer:"Je vous en prie ! N'hésitez pas à nous contacter si vous avez d'autres questions."
    },{
        keywords:["au revoir","bye","à bientôt"],
        answer:"Au revoir ! Passez une excellente journée et n'hésitez pas à revenir si vous avez besoin d'aide."
    }
]

const FALLBACK_ANSWER ={
    text: "Je suis désolé, je n'ai pas compris votre question. Veuillez remplir le formulaire de contact pour obtenir une réponse personnalisée.",
    showForm:true
};

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

const espaceregex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function countMatchs(text,keywords){
    return keywords.filter((k)=>
        new RegExp("\\b" + espaceregex(k) + "(s|x)?\\b").test(text)
    ).length;
}
async function getBotReply(userText){
    const text = normalize(userText);
    let best = null;
    let bestScore = 0;
    for(const rule of BOT_RULES){
        const score = countMatchs(text,rule.keywords) *(rule.weight ?? 1);
        if(score > bestScore){
            best = rule;
            bestScore = score;
        }
    }
     if(!best) return FALLBACK_ANSWER;
     return {text:best.answer, showForm: !!best.showForm, chips:best.ships || []};

}


const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms))


export function chat(){
    const {
        send,
        intro,
        contactForm,
        buttons,
        messageContainer,
        messageinput,
        email,
        noms,
        mes,
        count
    } = {
        send:document.getElementById("button_send"),
        intro:document.getElementById("first_mes"),
        contactForm: document.getElementById("seconds_m"),
        buttons: document.getElementById("button_chat"),
        messageContainer:document.getElementById("content_mes"),
        messageinput: document.getElementById("input_message"),
        email: document.getElementById("id_email"),
        noms:document.getElementById("chat_nom"),
        mes:document.getElementById("id_message"),
        count:document.getElementById("charCount"),
    }
    
    const maxlength = mes.getAttribute("maxLength");
    let isBotBusy = false;


    let history = (JSON.parse(localStorage.getItem("chat_history")) || []).map(
        (item) => (typeof item === "string" ? {role:"user",text:item} : item)
    )

    const saveHistory = () => localStorage.setItem("chat_history",JSON.stringify(history));

    const nowTime = () =>
        new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});

    const avatarSrc = document.querySelector(".header_chat .avatar")?.src || "";
    
    
    // affichage bulle
    function renderBubble(role,text,{time = nowTime(), chips = []}={}){
        const row = document.createElement("div");
        row.classList.add("msg_row",role === "bot" ? "bot" :"user");

        if(role === "bot"){
            const img = document.createElement("img");
            img.className = "avatar sm";
            img.src = avatarSrc;
            img.alt = "";
            row.appendChild(img);
        }
        const bubble = document.createElement("div");
        bubble.className = "bubble " + (role === "bot" ? "bot_block" : "user_block");
        const p = document.createElement("p");
        p.textContent = text;
        bubble.appendChild(p);


        if(chips.length > 0){
            const box = document.createElement("div");
            box.className = "chips";
            chips.forEach((label) =>{
                const b = document.createElement("button");
                b.type = "button";
                b.className = "chip";
                b.dataset.text = label;
                b.textContent = label;
                box.appendChild(b);
            })
            bubble.appendChild(box);
        }

        // fotoana
        const t = document.createElement("span");
        t.className = "time";
        t.textContent = role ==="user" ?  time + "✓✓" : time;
        bubble.appendChild(t);

        row.appendChild(bubble);
        return row;

    }
    // insertion des bulles avant le formulaire
    function insertBubble(row){
        messageContainer.insertBefore(row,intro);
    }

    function addMessage(role,text,{save = true,chips=[],time = nowTime()}={}){
        insertBubble(renderBubble(role,text,{time,chips}));
        if(save){
            history.push({role,text,time});
            saveHistory();
        }
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // trois points
    function showTyping(){
        const block = renderBubble("bot","...",{time:""});
        block.classList.add("typing");
        insertBubble(block);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        return block;
    }

    // visibilite du formulaire
    function setFormVisible(visible,{scroll=false} ={}){
        intro.style.display = visible ? "block" : "none";
        contactForm.style.display = visible ? "block" : "none";
        if(visible && scroll) messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // fonction occupation
    function setBusy(state){
        isBotBusy = state;
        messageinput.disabled = state;
        send.disabled = state;
        if(!state) messageinput.focus();

    }
    // reset
    function resetChat(){
        localStorage.removeItem("chat_history");
        history = [];
        setFormVisible(false);
        //restauration au chargement
        if(history.length > 0){
            const saved = history;
            history = [];
            saved.forEach((m) =>{
                addMessage(m.role,m.text,{save:false,time:m.time});
                history.push(m);
            })
        }
        setFormVisible(localStorage.getItem("chat_form_open") === "1");
    }

    async function sendMessage(){
        const message = messageinput.value.trim();
        if(message === "" || isBotBusy) return;
        
        addMessage("user",message);
        messageinput.value = "";

        setBusy(true);
        const typing = showTyping();
        try{
            const [reply] = await Promise.all([
                getBotReply(message),
                delay(600 + Math.random() * 600)
            ])
            typing.remove();
            addMessage("bot",reply.text,{chips:reply.chips});
            if(reply.showForm) setFormVisible(true,{scroll:true})
        }catch(e){
            typing.remove()
            addMessage("bot","Désolé,une erreur est survenue.Réessayer dans un instant");
        }finally{
            setBusy(false);
        }
    }

    // clic un boutton rapide
    messageContainer.addEventListener("click",(e)=>{
        const chip = e.target.closest(".chip");
        if(!chip || isBotBusy) return;
        chip.closest(".chips").remove();

        messageinput.value = chip.dataset.text;
        sendMessage();
    })

      //  mandefa message voalohany
      send.addEventListener('click',sendMessage )
      messageinput.addEventListener("keydown",(e) =>{
          if(e.key == "Enter"){
              e.preventDefault();
              sendMessage();
          }
  
      })

    // compteur
    mes.addEventListener("input",function(){
        const currentLength = mes.value.length;
        count.textContent =currentLength + "/" + maxlength;
        count.style.color = currentLength >=maxlength ? "red" : "black";
    });
    const form = document.getElementById("formchat");
    // const error = document.querySelectorAll("#formchat .errors")
    const geterror = (id) => document.querySelector(`[data-for="${id}"]`);
    const reseterr = () =>{
        document.querySelectorAll("#formchat .errors").forEach(err =>{
            err.style.display = "none";
            err.textContent = "";
        })
    }


    const chatbox = document.getElementById("chat_main");
    const icons = document.querySelector(".button_chat ion-icon");

    buttons.addEventListener('click',()=>{
       
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
        
        const close = document.getElementById("close_chat");
        if(close){
            close.addEventListener("click",() =>{
                const chatContent = chatbox.querySelector(".chat .chat_content");
                chatContent.classList.add("closing");
                chatContent.addEventListener("animationend",() =>{
                    chatbox.style.display = "none";
                    chatContent.classList.remove("closing");
                },{once:true});
                
                icons.setAttribute('name','chatbubble-ellipses-outline');
                document.body.classList.remove('no_scroll');
            })
        }
    
   
    
  
    document.querySelectorAll("#formchat input,#formchat textarea").forEach((elt) =>{
        elt.addEventListener("input",function(){
            const err = geterror(elt.id);
          if(elt.value.trim() !== ""){
            elt.classList.remove("invalid");
            elt.classList.add("valid");
            if(err){
                err.style.display = "none";
                err.textContent = "";
              }
          }
          
          else{
            elt.classList.add("invalid");
            elt.classList.remove("valid");
        }
        })
        elt.addEventListener("blur",function(){
            const err = geterror(elt.id);
            if(elt.value.trim() === ""){
                elt.classList.add("invalid");
                elt.classList.remove("valid");
                if(err){
                    err.style.display = "block";
                    err.textContent = "Veuillez remplir le champ";
                }
                
            
            }else{
                elt.classList.remove("invalid");
                elt.classList.add("valid");
            }
        })
       
    })
    if(form){
       
        form.addEventListener("submit",async function (e){
            let Iserror = false;
            e.preventDefault();
           
            reseterr();
            if( noms.value.trim().length < 3 || !/^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/.test(noms.value.trim())){
                const err = geterror("chat_nom");
                err.style.display = "block";
                err.textContent = "Nom et prenom invalide ou vide(nom manquant ou prenom manquant)";
                Iserror = true;
    
            }
            if(email.value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
                const err = geterror("id_email");
                err.style.display = "block";
                err.textContent = "Email requise ou vide";
                Iserror = true;
            }
            if(mes.value.trim() === "" || mes.value.trim().length < 10){
                const err = geterror("id_message");
                err.style.display = "block";
                err.textContent = "Message invalide ou vide (au moins 10 caractères)";
                Iserror = true;
            }
            const verif = document.querySelectorAll("#formchat input,#formchat textarea");
            const button = document.querySelector("#envoie_button");
            if(!Iserror){
                // alert(`${noms.value.trim()}, votre message a été envoyé avec succès!`);
                button.classList.add("loading");
                button.disabled = true;
              try{
                    const formeData = new FormData(form);
                    const response = await fetch(form.action,{
                            method:"POST",
                            body:formeData
                          });
                    const data = await response.json();
              
                        afficherpopup(data.success,data.message);
                        if(data.success){
                            form.reset();
                              verif.forEach(e =>{
                                 e.classList.remove("invalid","valid");
                              })
                        }
                }catch(e){
                    afficherpopup(false,"Erreur de connexion cote serveur");
                }
                finally{
                    button.classList.remove("loading");
                    button.disabled = false;
                }
            }   
    
        });
        form.addEventListener("reset",function(){   
            reseterr();
            resetChat();
        })
    }   
}