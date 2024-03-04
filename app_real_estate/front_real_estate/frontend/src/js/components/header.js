import { chatForm, wSocket } from "./chat.js";
import { ulAelement, pIelements, aIelements, Ielement } from "./elements.js"


export function headerTopLeft(main_site) {
    let topLeft = document.createElement("div")
    topLeft.classList.add("col-lg-6")
    topLeft.classList.add("header-top-left")
    let faClass;
    let textPart1;

    for (let i = 1; i < 3; i++) {
        let div = document.createElement("div")
        div.classList.add("top-info")
        // console.log(main_site)

        switch (i) {
            case 1: faClass = "fa-phone", textPart1 = " " + main_site["header"]["phone"]
                break
            case 2: faClass = "fa-envelope", textPart1 = " " + main_site["header"]["email"]
                break
        };
        let iElem = Ielement(faClass, textPart1)

        div.append(iElem)
        topLeft.append(div)
    };

    return topLeft
};

export function headerTopRight(main_site) {
    let topRight = document.createElement("div")
    topRight.classList.add("col-lg-6")
    topRight.classList.add("text-lg-right")
    topRight.classList.add("header-top-right")

    let topSocial = document.createElement("div")
    topSocial.classList.add("top-social")

    let links = main_site["header"]["socialLinks"]
    let faClass;

    for (let i = 0; i < links.length; i++) {
        switch (i) {
            case 0: faClass = "fa-facebook"
                break
            case 1: faClass = "fa-twitter"
                break
            case 2: faClass = "fa-instagram"
                break
            case 3: faClass = "fa-pinterest"
                break
            case 4: faClass = "fa-linkedin"
                break
        };

        let a = aIelements(links[i], faClass)
        topSocial.append(a)
    };

    let divUserPanel = document.createElement("div")
    // const auth =  registrationForm()
    // const login =  loginForm()
    // divUserPanel.append(auth, login)
    divUserPanel.classList.add("user-panel")
    let aRegister = aIelements("#", "fa-user-circle-o", " Register")
    aRegister.classList.add("profile-panel")
    aRegister.id = "register-panel"

    let aLogin = aIelements("#", "fa-sign-in", " Login")
    aLogin.classList.add("profile-panel")
    aLogin.id = "login-panel"


    let cookieId;
    let expToken;
    if (document.cookie){

        cookieId = document.cookie.split(";")[1].split("=")[1]
        // console.log(cookieId,  "===1===", +cookieId, !(+cookieId))
        if(!(+cookieId)){
            cookieId = document.cookie.split(";")[0].split("=")[1]
            // console.log(cookieId,  "===2===", +cookieId)
        }

        let decodedString = atob(document.cookie.split(".")[1]);
        
        let exp = Object.values(JSON.parse(decodedString))[1]

        let date = new Date(exp * 1000);
        expToken = date.toISOString()
        // console.log(expToken,"---3---");
        // console.log(document.cookie.split(".")[0],  "=====")
    }
  
    console.log(cookieId,"---3---");
    let aAccount = aIelements("#", "n", "Account")
    aAccount.classList.add("profile-panel-hide")
    aAccount.id = "account-panel"
    aAccount.dataset.id = cookieId

    let aProfile = aIelements("#", "n", "Profile")
    aProfile.classList.add("profile-panel-hide")
    aProfile.id = "profile-panel"
    aProfile.dataset.id = cookieId

    let aLogout = aIelements("#", "fa-sign-in", " Logout")
    aLogout.classList.add("profile-panel-hide")
    aLogout.id = "logout-panel"
    aLogout.dataset.id = cookieId

    // let myobj = JSON.parse(JSON.stringify(document.cookie.split(";")[1]));
    
    

    // console.log(cookieId, "--")

    // aLogout.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     router.navigate("/logout")
    // });
    

    // aLogin.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     router.navigate("/login")
    // });

    // aProfile.addEventListener("click", async function (elem) {
    //     elem.preventDefault();
    //     router.navigate(`/profile/${document.cookie.user_id}`)
    // });

    // let registerPanel = document.querySelector("#register-panel")
    // let loginPanel = document.querySelector("#login-panel")
    // let userPanel = document.querySelector("#profile-panel")

    

    // console.log(userPanel)
    // let exp = token.access_token.split(" ")
    // let expToken = `${exp[0]}T${exp[1]}Z`

    // window.localStorage.setItem("expToken", expToken)

    // let expToken = window.localStorage.getItem("expToken")
    // console.log(expToken, "-=-=-=")
    const currentDate = new Date().toISOString();
    
    if (currentDate < expToken){
        aRegister.classList.remove("profile-panel")
        aRegister.classList.add("profile-panel-hide")

        aLogin.classList.remove("profile-panel")
        aLogin.classList.add("profile-panel-hide")

        aProfile.classList.remove("profile-panel-hide")
        aProfile.classList.add("profile-panel")

        aAccount.classList.remove("profile-panel-hide")
        aAccount.classList.add("profile-panel")

        aLogout.classList.remove("profile-panel-hide")
        aLogout.classList.add("profile-panel")
    }

    divUserPanel.append(aRegister, aLogin, aAccount, aProfile, aLogout)
    topRight.append(topSocial, divUserPanel)
    

	return topRight
};

export function mainMenu(main_site) {
    let  ws = new WebSocket("wss://api.estate.tesseractmaks.tech/api/v1/users/ws/")
    
    const divContainer = document.createElement("div")
    divContainer.classList.add("container")

    let divRow = document.createElement("div")
    divRow.classList.add("row")

    let divCol12 = document.createElement("div")
    divCol12.classList.add("col-12")

    let divNavbar = document.createElement("div")
    divNavbar.classList.add("site-navbar")

    let aLogo = document.createElement("a")
    aLogo.href = "/"
    aLogo.classList.add("site-logo")

    let imgLogo = document.createElement("img")
    imgLogo.setAttribute("src", "/src/img/logo.png")
    imgLogo.setAttribute("alt", "logo")
    aLogo.append(imgLogo)

    let divNaSwich = document.createElement("div")
    divNaSwich.classList.add("nav-switch")
    let i = Ielement("fa-bars")
    divNaSwich.append(i)

    let links = main_site["header"]["mainMenu"]
    let ulMenu = ulAelement("main-menu", links)

    divNavbar.append(aLogo, divNaSwich, ulMenu)
    divCol12.append(divNavbar)
    divRow.append(divCol12)
    const chatBlock = chatForm()
    divContainer.append(divRow, chatBlock)

    // Chat section
    const chatFormElem = chatBlock.querySelector('#cht-form');

    ws.onmessage = function(evt) {
        let recived_msg = evt.data
        let chatForm = document.querySelector("#cht-form")

        const rowSnd = document.createElement("div")
        const rowRsv = document.createElement("div")

        const dots = document.querySelector('#dots')

        
        let cleanMsg = JSON.parse(recived_msg)
        rowRsv.textContent = cleanMsg["username"] + ": " + cleanMsg["message"]

        console.log(cleanMsg["is_me"],"++")
        if (cleanMsg["is_me"]) {
            console.log(cleanMsg["is_me"],"--")
            rowRsv.classList.add("chat-msg-send")
            dots.append(rowRsv)
           
        }else{
            rowRsv.classList.add("chat-msg-rsv")
            dots.append(rowRsv)
            
        };
            
        
        

        // rowSnd.classList.add("chat-msg-send")
        // rowSnd.textContent = chatForm.msg.value
        // dots.append(rowSnd)
        // chatForm.prepend(dots)
        chatForm.msg.value = ""
  }

     chatFormElem.addEventListener("submit", async function(e) {
        await wSocket(ws)
        e.preventDefault()

    })
    return divContainer
};


export async function getHeader(main_site) {

    // let main_site = await mainSite()

    const headerElement = document.createElement("header")
    headerElement.classList.add("header-section")

    let divHeader = document.createElement("div")
    divHeader.classList.add("header-top")

    let divContainerHeader = document.createElement("div")
    divContainerHeader.classList.add("container")

    let divRowHeader = document.createElement("div")
    divRowHeader.classList.add("row")

    const headerLeft = headerTopLeft(main_site)
    const headerRight = headerTopRight(main_site)
    const headerMainMenu = mainMenu(main_site)

    divRowHeader.append(headerLeft, headerRight)
    divContainerHeader.append(divRowHeader)
    divHeader.append(divContainerHeader, headerMainMenu)
    headerElement.append(divHeader)

  
    
    headerElement.querySelector("#btn-chat").addEventListener("click", function(e){
        // let myForm = chatBlock.querySelector("#myForm").setAttribute("style", "display:block")
        // let btnChat = chatBlock.querySelector("#btn-chat").setAttribute("style", "display:none")
        headerElement.querySelector("#myForm").setAttribute("style", "display:block")
        headerElement.querySelector("#btn-chat").setAttribute("style", "display:none")
        // console.log(chatBlock)
    })

    headerElement.querySelector("#close-chat").addEventListener("click", function(e){
        headerElement.querySelector("#myForm").setAttribute("style", "display:none")
        headerElement.querySelector("#btn-chat").setAttribute("style", "display:block")
        // console.log(chatBlock)
    })

     
    
    
    return headerElement
};
