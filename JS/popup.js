
let popuptimout = null;


function injecterCSS(){
    if(document.getElementById("popup_styles")) return;

    const style = document.createElement("style");
    style.id = "popup_styles";
    style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        body{
            font-family: "Poppins",sans-serif;
        }
        .popup_toast{
            position: fixed;
            top: 24px;
            right: 24px;
            max-width: 320px;
            width: 90%;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 8px 24px rgba(0, 0, 0,0.15);
            padding: 16px 40px 16px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            overflow: hidden;
            transform: translateX(120%);
            opacity: 0;
            transition: transform .35s ease,opacity .35s ease;
            z-index:1000
        }
        .popup_toast.show{
            transform: translateX(0);
            opacity: 1;
        }
        .popup_toast.hidden{
            display: none;
        }
        .popup_icon{
            font-size: 24px;
            flex-shrink: 0;
        }
        .popup_icon.success{
            color: #0e8f6e;
        }
        .popup_icon.error{
            color: #c0392b;
        }
        .popup_message{
            font-size: 14px;
            color:#1a1a1a;
            margin:0;
            flex:1;
        }
        .popup_close{
            position:absolute;
        top:10px;
        right:10px;
        background:none;
        border:none;
        font-size:14px;
        color:#888;
        cursor:pointer;
        padding:4px;
        }
        .popup_close:hover{
            color: #1a1a1a;
        }
        .popup_track{
            position:absolute;
        bottom:0; left:0;
        height:3px;
        width:100%;
        background:#e5e5e5
        }
        .progress_bar{
            height:100%; width:100%;
            transform-origin:left;
        }
        .progress_bar.success{
            background: #0e8f6e;
        }
        .progress_bar.error{
            background: #c0392b;
        }
        @keyframes progress-shrink{
            from{ transform:scaleX(1); }
            to{ transform:scaleX(0); }
        }


    `
    document.head.appendChild(style);
}


function creerPopup(){
    if(document.getElementById("popup_toast")) return;

    const div = document.createElement("div");
    div.innerHTML = 
        `<div id="popup_toast" class="popup_toast hidden">
            <div id="popup_icon" class="popup_icon"></div>
            <p id="popup_message" class="popup_message"></p>
            <button id="popup_close" class="popup_close">✕</button>
            <div id="popup_track" class="popup_track">
                <div id="progress_bar" class="progress_bar"></div>
            </div>
        </div>`;
    document.body.appendChild(div.firstElementChild);
    document.getElementById("popup_close").addEventListener("click",FermerPopup);
}
injecterCSS();
creerPopup();

// affiche le popup
export function afficherpopup(success,message,duree=4000){
    const toast = document.getElementById("popup_toast");
    const icon = document.getElementById("popup_icon");
    const text = document.getElementById("popup_message");
    const bar = document.getElementById("progress_bar");
    

    icon.textContent = success ? '✓': '✕';
    icon.className = 'popup_icon ' + (success ? "success" : "error");
    text.textContent = message;

    bar.className = "progress_bar";
    bar.className = 'progress_bar '+ (success ? 'success': 'error');
    bar.style.animation = "none";
    void bar.offsetWidth;
    bar.style.animation = `progress-shrink ${duree}ms linear forwards`;


    toast.classList.remove('hidden');
    requestAnimationFrame(() => toast.classList.add('show'));

    if(popuptimout) clearTimeout(popuptimout);
    popuptimout = setTimeout(FermerPopup,duree);


}

// fermer le popup
function FermerPopup(){
    const toast = document.getElementById("popup_toast");
    toast.classList.remove('show');

    if(popuptimout) clearTimeout(popuptimout);

    setTimeout(()=> toast.classList.add('hidden'),350);
}