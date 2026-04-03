export function scrolls(){
    const services = document.getElementById("services");
    const nav = document.getElementById("navbars");
    const navheight = nav.offsetHeight;
    const top = services.getBoundingClientRect().top + window.scrollY - navheight;
    window.scrollTo({
        top:top,
        behavior:"smooth"
    })
} 
