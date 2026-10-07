import { afficherpopup } from "./popup.js";

export function contact(){
    const form = document.getElementById("form_contact");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const subject = document.getElementById("sujet");
    const menus = document.querySelectorAll("#data_services option");
    const geterror = (id) => document.querySelector(`[data-for="${id}"]`);

    const resetErr = () =>{
        document.querySelectorAll("#form_contact .errors").forEach(err =>{
            err.style.display = "none";
            err.textContent = "";
        });
    }
    
    // validation
    document.querySelectorAll("#form_contact .input_info input,#form_contact .textarea_info textarea").forEach((elmt) =>{
        const box = elmt.closest(".input_info,.textarea_info") ?? elmt;
        elmt.addEventListener("input", () =>{
            const err = geterror(elmt.id);
            if(elmt.checkValidity() && elmt.value.trim()!== ""){
                box.classList.remove("invalid");
                box.classList.add("valid");
                if(err){
                    err.style.display = "none";
                    err.textContent = "";
                }

            }
            else{
                box.classList.add("invalid");
                box.classList.remove("valid");
            }  
        })
        elmt.addEventListener("blur",function(){
            const err = geterror(elmt.id);
            if(elmt.value.trim() === ""){
                box.classList.add("invalid");
                box.classList.remove('valid');
                if(err){
                    err.style.display = "block";
                    err.textContent = "Veuillez remplir le champ";
                }
            }else{
                box.classList.remove("invalid");
                box.classList.add("valid");
            }
        })
    })
    
    if(form){
        form.addEventListener("submit", async function(e) {
            let Iserror = false; 
            e.preventDefault();
            resetErr();
            if( nom.value.trim().length < 2 || !/^[a-zA-ZÀ-ÿ]+$/.test(nom.value.trim())){
                const err = geterror("nom");
                err.style.display = "block";
                err.textContent = "Nom invalide ou vide";
                Iserror = true;
    
            }
            if( prenom.value.trim().length < 2 || !/^[a-zA-ZÀ-ÿ]+$/.test(prenom.value.trim())){
                const err = geterror("prenom");
                err.style.display = "block";
                err.textContent = "Prenom invalide ou vide";
                Iserror = true;
            }
            if(email.value.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
                const err = geterror("email");
                err.style.display = "block";
                err.textContent = "Email requise ou vide";
              Iserror = true;
            }
            let found = false;
            menus.forEach(m =>{
                if(subject.value.trim() === m.value.trim()) found = true;
           });
          
            if(subject.value.trim() === "" || !found){
                const err = geterror("sujet");
                err.style.display = "block";
                err.textContent = "Veuillez choisir un sujet ou sujet n existe pas";
                Iserror = true;
            }
            if(message.value.trim()==="" || message.value.trim().length < 5){
                const err = geterror("message");
                err.style.display = "block";
                err.textContent = "Message invalide ou vide";
                Iserror = true;
            }
            
            const verif =  document.querySelectorAll("#form_contact .input_info,#form_contact .textarea_info");
            if(!Iserror){
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
                    afficherpopup(false,"Erreur de connexion coté serveur");
                    console.err(e);
               }
                
            }
    
        });
        form.addEventListener("reset", () =>{
            resetErr();
        })
    }
   
   
}   
