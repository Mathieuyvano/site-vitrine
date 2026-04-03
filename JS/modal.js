export function initmodal(){
    const closebtn  =document.querySelector(".icon_close");
    const modalImg = document.getElementById("modalimg");
    const modal = document.getElementById("mymodal");
    const h2 = document.getElementById("modaltitres");
    const p = document.getElementById("paragraphes_content");
    const p2 = document.getElementById("paragraphes_content2"); 
    const btnmodal = document.getElementById("buttons_modal");
    const whatsapp = document.getElementById("whtp");
    document.getElementById("buttons_modal").addEventListener('click', function(){
        const service = h2.textContent.trim();
        window.location.href = window.location.origin + "/frontend/contact.html?service=" + encodeURIComponent(service);  
    })
    window.openmodal = function(btn){
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
            if(whatsapp){
                whatsapp.addEventListener('click', () =>{
                    const titre = h2.textContent.trim();
                    const message=`Bonjour, je souhaite planifier un appel concernant l'activité "${titre}" `;
                    const encodeMg = encodeURIComponent(message);
                    const num = "261375893555";
                    const url = `https://wa.me/${num}?text=${encodeMg}`;

                    window.open(url,'_blank');
                })
            }
            if(btnmodal){
                btnmodal.addEventListener('click',function(){

                    const service = h2.textContent.trim();
                    window.location.href = window.location.origin + "/frontend/contact.html?service=" + encodeURIComponent(service);  
                })
            }
            if(closebtn){
                closebtn.addEventListener('click',(e)=>{
                    e.preventDefault();
                    // const link = document.querySelectorAll("#service_p ul li a").forEach(l =>{
                    //     l.classList.remove("active");
                    // })
                    const modalContent = modal.querySelector(".modal .modal_content");
                    modalContent.classList.add("closing");
        
                    modalContent.addEventListener("animationend",() =>{
                        modal.style.display = "none";
                        modalContent.classList.remove("closing");
                    },{once:true});
                    
                    
                            
                });
                window.addEventListener('click',(e) =>{
                    if(e.target === modal){
                        const modalContent = modal.querySelector(".modal .modal_content");
                        modalContent.classList.add("closing");
                        modalContent.addEventListener("animationend",() =>{
                            modal.style.display = "none";
                            modalContent.classList.remove("closing");
                        },{once:true});      
                    }
                });
            }
    

    }
     
        
}

