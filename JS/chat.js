export function chat(){
    const send = document.getElementById("button_send");
    const first = document.getElementById("first_mes");
    const second = document.getElementById("seconds_m");
    const buttons = document.getElementById("button_chat");
    const messageContainer = document.getElementById("content_mes");
    const messageinput = document.getElementById("input_message");
    const user_message = document.getElementById("user_message");
    const email = document.getElementById("id_email");
    const noms = document.getElementById("chat_nom");
    const mes = document.getElementById("id_message");
    const count = document.getElementById("charCount");
    const maxlength = mes.getAttribute("maxLength");
    mes.addEventListener("input",function(){
        const currentLength = mes.value.length;
        count.textContent =currentLength + "/" + maxlength;

        if(currentLength >= maxlength){
            count.style.color = "red";

        }else{
            count.style.color = "black";
        }
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
      

    function sendmessage(){
        const message = messageinput.value.trim();
       
        if(message !== ""){
            user_message.style.display = "block";
            const newmsg = document.createElement("p");
            newmsg.classList.add("user_message");
            newmsg.textContent = message;
            newmsg.style.textAlign = "left";
            user_message.appendChild(newmsg);
            
            messageinput.value = "";
            messageContainer.scrollTop = messageContainer.scrollHeight;
            first.style.display = "block";
            second.style.display = "block";  
           
        }  
    }
    //  mandefa message voalohany
    send.addEventListener('click',sendmessage )
    messageinput.addEventListener("keydown",(e) =>{
        if(e.key == "Enter"){
            e.preventDefault();
            sendmessage();
        }

    })
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
        form.addEventListener("submit", (e) =>{
            let Iserror = false;
            e.preventDefault();
            reseterr();
            if( noms.value.trim().length < 3 || !/^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/.test(noms.value.trim())){
                const err = geterror("chat_nom");
                err.style.display = "block";
                err.textContent = "Nom et prenom invalide ou vide";
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
                err.textContent = "Message invalide ou vide";
                Iserror = true;
            }
            const verif = document.querySelectorAll("#formchat input,#formchat textarea");
            if(!Iserror){
                alert(`${noms.value.trim()}, votre message a été envoyé avec succès!`);
                form.reset();
                verif.forEach(v =>{
                    v.classList.remove("invalid","valid");
                })
            }   
    
        });
        form.addEventListener("reset",function(){   
            reseterr();
        })
    }
    
    
    
}