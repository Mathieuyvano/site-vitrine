// makany page hafa
export function navigation(){
    const link = document.querySelectorAll('nav .navigation ul li a');
    const accueil = document.getElementById("entreprise");
    const btnburger = document.querySelector('.btn_burger');
    const menu = document.querySelector('.navigation');
    const iconburger = document.querySelector('.btn_burger ion-icon');
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
            
}
