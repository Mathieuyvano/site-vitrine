 export function contact(){
    const form = document.getElementById("form_contact");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const email = document.getElementById("email");
    const message = document.getElementById("messages");
    // const error = document.querySelectorAll("#form_contact .errors");
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
    document.querySelectorAll("#form_contact input,#form_contact textarea").forEach((elmt) =>{
        elmt.addEventListener("input", () =>{
            const err = geterror(elmt.id);
            if(elmt.checkValidity() && elmt.value.trim()!== ""){
                elmt.classList.remove("invalid");
                elmt.classList.add("valid");
                if(err){
                    err.style.display = "none";
                    err.textContent = "";
                }

            }
            else{
                elmt.classList.add("invalid");
                elmt.classList.remove("valid");
            }  
        })
        elmt.addEventListener("blur",function(){
            const err = geterror(elmt.id);
            if(elmt.value.trim() === ""){
                elmt.classList.add("invalid");
                elmt.classList.remove('valid');
                if(err){
                    err.style.display = "block";
                    err.textContent = "Veuillez remplir le champ";
                }
            }else{
                elmt.classList.remove("invalid");
                elmt.classList.add("valid");
            }
        })
    })
    
    if(form){
        form.addEventListener("submit", function (e) {
            let Iserror = false; 
            // e.preventDefault();
            resetErr();
           
            
            if( nom.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(nom.value.trim())){
                const err = geterror("nom");
                err.style.display = "block";
                err.textContent = "Nom invalide ou vide";
                Iserror = true;
    
            }
            if( prenom.value.trim().length < 3 || !/^[a-zA-Z]+$/.test(prenom.value.trim())){
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
           if(!found){
                const err = geterror("sujet");
                err.style.display = "block";
                err.textContent = "Le sujet n'existe pas";
                Iserror = true;
            }
            if(subject.value.trim() === ""){
                const err = geterror("sujet");
                err.style.display = "block";
                err.textContent = "Veuillez choisir un sujet";
                Iserror = true;
            }
            if(message.value.trim()==="" || message.value.trim().length < 5){
                const err = geterror("message");
                err.style.display = "block";
                err.textContent = "Message invalide ou vide";
                Iserror = true;
            }
            
            const verif =  document.querySelectorAll("#form_contact input,#form_contact textarea")
            if(!Iserror){
                // alert(`${nom.value.trim()} ${prenom.value.trim()}, merci pour votre demande. Nous vous contactons dès que possible.`); 
                form.submit();
                form.reset();
                verif.forEach(el => {
                    el.classList.remove("invalid", "valid");
                });
                
            }
    
        });
        form.addEventListener("reset", () =>{
            resetErr();
        })
    }
   
   
}   
