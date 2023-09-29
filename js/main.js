const sendBtn = document.getElementById("send")

sendBtn.addEventListener("click",() => {

    console.log("Ishladimi?");

    let name, phone;
    let admin = ["714122575"];


    const validatePhone = (phone) => {
        const phoneRegex = /^\+?\d{7,}$/;
        return phoneRegex.test(phone);
    };

    const showError = (field, errorMessage) => {
        field.classList.add("error");
        const errorSent = document.querySelector(".error_sent");
        errorSent.innerHTML = errorMessage;
        errorSent.style.visibility = "visible";
    };

    const hideError = (field) => {
        field.classList.remove("error");
        const errorSent = document.querySelector(".error_sent");
        errorSent.innerHTML = "";
        errorSent.style.visibility = "hidden";
    };

    const resetForm = () => {
        

        const check = document.querySelector(".check")
        check.style.visibility = "visible";
        check.innerHTML = `<i class="fa-solid fa-check"></i>`
        

        const name = document.getElementById("name");
        const phone = document.getElementById("w0");
        

        name.style.display = 'none'
        phone.style.display = 'none'

        const special = document.querySelector(".special")
        special.style.marginTop = '50px'

        
        
        const sendTitle = document.querySelector(".send-title")
        sendTitle.innerHTML = "Ma'lumotlaringiz qabul qilindi <br>  Tez orada menejerlarimiz <br> Siz bilan bog'lanishadi!"
        sendTitle.style.color = 'green'
        sendTitle.style.fontSize = '16px'
        

        const removeBtn = document.querySelector(".send")
        removeBtn.style.background = 'transparent'


        setTimeout(() => {
            // name.style.display = 'block'
            // name.value = ""
            // phone.style.display = 'block'
            // phone.value = ""
            // check.style.visibility = "hidden";
            // check.innerHTML = "";
            // special.style.marginTop = '0px'
            // sendTitle.textContent = "Jo'natish"
        }, 3000);

        sendBtn.innerHTML = ""
        sendBtn.style.cursor = 'none'
    };

    const sendTelegramMessage = (name, phone, id) => {
        let txt =
            "*Имя пользователя: *" +
            name +
            "*%0AТелефон: *" +
            phone;
        var xmlHttp = new XMLHttpRequest();
        let theUrl =
            "https://api.telegram.org/bot6642360754:AAHG23DIMuYTHQyZL3wBeQYfZ4Rl3MYZ2Uw/sendMessage?chat_id=" +
            id +
            "&parse_mode=markdown&text=" +
            txt;
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return JSON.parse(xmlHttp.responseText).ok;
    };

    const nameInput = document.getElementById("name");
    // const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("w0");
    // const messageInput = document.getElementById("message");

    if(nameInput.value.trim() === "" && phoneInput.value.trim() === "") {
        showError(nameInput, "Iltimos, ism va telefon raqam kiriting");
        return;
    }
    else if (nameInput.value.trim() === "") {
        showError(nameInput, "Iltimos, ism kiriting");
        return;
    } 
    else {
        hideError(nameInput);
        name = nameInput.value.trim();
    }

    phone = phoneInput.value.trim();

    if (phone === "") {
        showError(phoneInput, "Iltimos, telefon raqam kiriting.");
        return;
    } else {
        hideError(phoneInput);
    }

    // if (phone !== "" && !validatePhone(phone)) {
        // showError(phoneInput, "Please enter a valid phone number.");
        // return;
    // } else {
        // hideError(phoneInput);
    // }


    let send = false;
    for (let i = 0; i < admin.length; i++) {
        let id = admin[i];
        if (sendTelegramMessage(name, phone, id)) {
            send = true;
        } else {
            send = false;
            break;
        }
    }

    if (send) {
        resetForm();
    }
})