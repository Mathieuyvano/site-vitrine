
export function linkAndNumber(){
    const assist = document.getElementById("assist");
    if(assist){
        assist.addEventListener("click", function(){
            window.location.href = "contact.html";
        })
    }

    const message = "Bonjour, je souhaite planifier un appel concernant vos services d'assistance.";
    const num = "261332045172";
    const ids = ["whtsp_urls","whtsp_url","callback","callback2"];
    ids.forEach(id =>{
       const btn = document.getElementById(id);
       if(btn){
        btn.addEventListener('click',()=>{
            const encodeMg = encodeURIComponent(message);
            const url = `https://wa.me/${num}?text=${encodeMg}`;
            window.open(url,"_blank");
        })
       }
    })
}