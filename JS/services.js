// menu deroulalnt
export function serviceslink(){
    const assist = document.getElementById("assist");
    const call = document.getElementById("callback");
    const call2 = document.getElementById("callback2");
   if(assist){
    assist.addEventListener("click", function(){
        window.location.href = "contact.html";
    })
   }
   if(call){
        const message = "Bonjour, je souhaite planifier un appel concernant vos services d'assistance.";
        const encodeMg = encodeURIComponent(message);
        const num = "33756835665";
        const send = `https://wa.me/${num}?text=${encodeMg}`;
        call.addEventListener("click", function(){
            window.open(send,'_blank');
        })
   }
   if(call2){
    const message = "Bonjour, je souhaite planifier un appel concernant vos services d'assistance.";
    const encodeMg = encodeURIComponent(message);
    const num = "33756835665";
    const send = `https://wa.me/${num}?text=${encodeMg}`;
    call2.addEventListener("click", function(){
        window.open(send,'_blank');
    })
   }
    
}