// menu deroulalnt
export function serviceslink(){
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