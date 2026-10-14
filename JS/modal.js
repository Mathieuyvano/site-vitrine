const SERVICE_IMAGES ={
    assistant:"/image/assistant_polyvalent.png",
    support:"/image/assistant_client.jpg",
    web:"/image/devsweb.jpg"
}
function getImage(key){
    return SERVICE_IMAGES[key];
}

Object.values(SERVICE_IMAGES).forEach((src) =>{
    const image = new Image();
    image.src = src;
})

export function initmodal(){
    const closebtn  =document.querySelector(".icon_close");
    const modalImg = document.getElementById("modalimg");
    const modal = document.getElementById("mymodal");
    const h3 = document.getElementById("modaltitres");
    const p = document.getElementById("paragraphes_content");
    const p2 = document.getElementById("paragraphes_content2"); 
    const btnmodal = document.getElementById("buttons_modal");
    const whatsapp = document.getElementById("whtp");

    function c(){
        const modalContent = modal.querySelector(".modal_content");
        modalContent.classList.add("closing");

        modalContent.addEventListener("animationend",() =>{
            modal.style.display = "none";
            modalContent.classList.remove("closing");
        },{once:true});
    }
    document.getElementById("buttons_modal").addEventListener('click', function(){
        const service = h2.textContent.trim();
        window.location.href = window.location.origin + "/contenu/contact.html?service=" + encodeURIComponent(service);  
    })
    window.openmodal = function(btn){
        const card = btn.closest(".card");
            if(card){
                const texttitres = card.querySelector("h3")?.textContent;
                const pt = card.querySelector("div > #p_content1 ")?.innerHTML;
                const pt2 = card.querySelector("#p_content2")?.innerHTML;
                const prixmodal = card.querySelector(".idprix")?.innerHTML;
                modalImg.src = getImage(card.dataset.service);
                h3.textContent = texttitres;
                p.innerHTML = pt;
                p2.innerHTML = pt2;
                prix.innerHTML = prixmodal;
                modal.style.display = "block";
            }  
            else{
                const image = btn.dataset.service;
                const texttitres = btn.dataset.title;
                const paragraphestext = btn.dataset.p;
                const ptext2 = btn.dataset.p2;
                const prixmodal = btn.dataset.price;
                const formatted = prixmodal.replace(/\d+/g, match =>{
                    return `<span class="color_number">${match}</span>`;
                 })
                modalImg.src = getImage(image);
                h3.textContent = texttitres;
                p.innerHTML = paragraphestext;
                p2.innerHTML = ptext2;
                prix.innerHTML = formatted;
                modal.style.display = "block";
              
            } 
            if(whatsapp){
                whatsapp.addEventListener('click', () =>{
                    const titre = h2.textContent.trim();
                    const message=`Bonjour, je souhaite planifier un appel concernant l'activité "${titre}" `;
                    const encodeMg = encodeURIComponent(message);
                    const num="261332045172";
                    const url = `https://wa.me/${num}?text=${encodeMg}`;

                    window.open(url,'_blank');
                })
            }
            if(btnmodal){
                btnmodal.addEventListener('click',function(){

                    const service = h2.textContent.trim();
                    window.location.href = window.location.origin + "/contenu/contact.html?service=" + encodeURIComponent(service);  
                })
            }
            if(closebtn){
                closebtn.addEventListener("click",(e)=>{
                    e.preventDefault();
                    c()
                })
               
                window.addEventListener('click',(e) =>{
                    if(e.target === modal){
                       c()    
                    }
                });
            }
    

    }
     
        
}

