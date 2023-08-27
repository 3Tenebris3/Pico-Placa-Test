
function soloNum(evt) {
    var asCCI = (evt.which) ? evt.which : evt.keyCode;
    if (asCCI > 31 && (asCCI < 48 || asCCI > 57)) {
        return false;
    }
    return true;
}

function soloLetter(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode != 32) {
        return false;
    }
    return true;
}

function liveClock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = 'AM';

    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        session = 'PM';
    }

    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    document.getElementById('hours').innerText = h + ':';
    document.getElementById('minutes').innerText = m + ':';
    document.getElementById('seconds').innerText = s + ' ';
    document.getElementById('session').innerText = session;

    setTimeout(liveClock, 1000);
}

document.getElementById("picoBtn").addEventListener("click", function () {
    // Recolecta los valores de los campos
    let letters = [
        document.getElementById("placaLetter1").value,
        document.getElementById("placaLetter2").value,
        document.getElementById("placaLetter3").value
    ];
    let numbers = [
        document.getElementById("placaNum1").value,
        document.getElementById("placaNum2").value,
        document.getElementById("placaNum3").value,
        document.getElementById("placaNum4").value
    ];

    let dateValue = new Date(document.getElementById("date").value);
    let timeValue = document.getElementById("time").value;
    let dayOfWeek = dateValue.getUTCDay();

    // Comprueba si algún campo está vacío
    if (letters.includes("") || numbers.includes("") || dateValue === "" || timeValue === "") {
        alert("Please fill in all fields before checking.");
        return;
    }

    let plateNumber = letters.join('') + numbers.join('');
    let lastDigit = plateNumber[plateNumber.length - 1];
    let restrictedHours = ["07:00-09:30", "16:00-19:30"];
    let isRestricted = false;

    switch (dayOfWeek) {
        case 1: // Lunes
            isRestricted = ["1", "2"].includes(lastDigit);
            break;
        case 2: // Martes
            isRestricted = ["3", "4"].includes(lastDigit);
            break;
        case 3: // Miércoles
            isRestricted = ["5", "6"].includes(lastDigit);
            break;
        case 4: // Jueves
            isRestricted = ["7", "8"].includes(lastDigit);
            break;
        case 5: // Viernes
            isRestricted = ["9", "0"].includes(lastDigit);
            break;
        default:
            isRestricted = false;
    }

    if (isRestricted) {
        for (let range of restrictedHours) {
            let [start, end] = range.split("-").map(str => str.replace(':', ''));
            let currentTime = timeValue.replace(':', '');
            if (currentTime >= start && currentTime <= end) {
                isRestricted = true;
                break;
            } else {
                isRestricted = false;
            }
        }
    }

    let infoContainer = document.querySelector(".infoCont");

    // Limpia los mensajes anteriores
    infoContainer.innerHTML = '';

    let messageDiv = document.createElement("div");
    if (isRestricted) {
        messageDiv.textContent = `The car with plate number ${plateNumber} is not currently allowed to circulate.`;
    } else {
        messageDiv.textContent = `The car with plate number ${plateNumber} is allowed to circulate.`;
    }

    infoContainer.appendChild(messageDiv);
});

liveClock();
