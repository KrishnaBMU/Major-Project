let number = 0;
let backendURL = "http://localhost:5000"

function popup(parm) {
    let account = document.querySelector(parm);
    let notPopup = document.querySelector(".NotPopup")
    if (account.style.display == "none") {
        account.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
    }
    else {
        account.style.display = "none"
        notPopup.style.filter = ""
    }
}

function profileSave() {
    document.getElementById("ProfilePic").src = document.getElementById("profileUrl").value;
    document.getElementById("profileUrl").value = "";
    popup('.Account');
}

function stats(SendorId) {

    let link = "https://thingspeak.com/channels/1526741/charts/" + SendorId + "?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"

    let stats = document.querySelector(".Stats");
    let notPopup = document.querySelector(".NotPopup")
    if (stats.style.display == "none") {
        stats.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
        let graph = document.getElementById("iframe1");
        graph['src'] = link;
    }
    else {
        stats.style.display = "none"
        notPopup.style.filter = ""
    }
}

function newSensorPopup() {
    let sensor = document.querySelector(".AddSensor");
    let notPopup = document.querySelector(".NotPopup")
    if (sensor.style.display == "none") {
        sensor.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
        if (number < 8) {
            document.getElementById("pinnum").innerHTML = 'D' + (number + 1);
        }
        else {
            document.getElementById("pinnum").innerHTML = "No more pins available";
        }

    }
    else {
        sensor.style.display = "none"
        notPopup.style.filter = ""
    }
}

function newSensorPopupSave() {

    function reqListener() {
        if (this.status == 200) {
            addSensorToScreen(document.getElementById("sensorName").value, document.getElementById("sensorLocation").value, number + 1);
            number = number + 1;
        }
        newSensorPopup()
    }

    data = {
        "sensor_name": document.getElementById("sensorName").value,
        "location": document.getElementById("sensorLocation").value,
        "pin": number + 1,
        "status": false
    }

    console.log(data)

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("POST", backendURL + "/addsensors");
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(data));
}

function editSensorPopupSave() {
    let editSensorSelect = document.getElementById("editSensorSelect");
    let editSensorName = document.getElementById("editSensorName");
    let editSensorLocation = document.getElementById("editSensorLocation");

    function reqListener() {
        if (this.status == 200) {
            let sensorName = document.getElementById("deviceName" + editSensorSelect.value);
            let sensorLocation = document.getElementById("deviceLocation" + editSensorSelect.value)

            sensorName.innerHTML = editSensorName.value;
            sensorLocation.innerHTML = editSensorLocation.value;
        }
        popup('.EditSensor');
    }

    data = {
        "sensor_name": editSensorName.value,
        "location": editSensorLocation.value,
    }

    console.log(data)

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("POST", backendURL + "/editsensors/" + editSensorSelect.value);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(data));
}

function addSensorToScreen(sensorname, location, pin, currPinStatus) {

    var sensorStart = `<li class="flex-item">
<h2 id="deviceName` + (pin) + `"class="left">`
    var sensorMiddle = `</h2>
<br>
<img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/map-pin.svg" alt="map-pin" class="left svg-white" />
<p id="deviceLocation` + (pin) + `">`
    var sensorEnd = `</p>
<br>
<img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/pie-chart.svg" alt="pie-chart" class="left svg-white" />
<p class="pointer" onclick="stats(`+ pin + `)">See Stats</p>
<div class="slideThree">
<input type="checkbox" value="None" id="slideThree` + pin + `" onchange="checkbox(` + pin + `)" name="check" />
<label for="slideThree` + pin + `"></label>
</div>
</li>`

    var addSensorText = `<div class="addItem pointer" onclick="newSensorPopup()">
<img src="https://github.com/KrishnaBMU/IOT-Dashboard/blob/main/icons/addItem.png?raw=true" width="100px" height="100px" alt="Add">
</div>`

    var sensors = document.querySelector("ul");
    sensors.removeChild(document.querySelector(".addItem"));
    sensors.innerHTML += sensorStart + sensorname + sensorMiddle + location + sensorEnd + "\n\n\n" + addSensorText;

    let newSelect = document.createElement("option");
    newSelect.value = pin
    newSelect.innerHTML = pin
    document.getElementById("editSensorSelect").append(newSelect)

}


function loadSensorItemsFromBackend() {

    function reqListener() {
        var r = JSON.parse(this.responseText);
        r.sensors.forEach(element => {
            addSensorToScreen(element.sensor_name, element.location, element.pin, element.status);
            number += 1
        });
        
        r.sensors.forEach(element => {
            if (element.status) {
                document.getElementById("slideThree" + element.pin).checked = true;
            }
        });
    }

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", backendURL + "/getsensors");
    req.send();
}

loadSensorItemsFromBackend()


function send(link) {
    var xhttp = new XMLHttpRequest();
    console.log(link);
    xhttp.open("GET", link, true);
    xhttp.send();
}

function checkbox(pin) {
    option = document.getElementById("slideThree" + pin);
    if (option.checked) {
        pinStatus = "1";
    }
    else {
        pinStatus = "0";
    }
    let link = "https://api.thingspeak.com/update?api_key=Z23ESCW35RJN0OFD&field" + pin + "=" + pinStatus;
    send(link);
}


function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("ChatbotText").value = "";
    document.getElementById("ChatbotTextOutput").value = "";
}

function keyPress(event) {
    if (window.event.keyCode == 13) {
        sendForm();
    }
}


function sendForm() {
    const chat = document.getElementById("ChatbotText");
    const chatOutput = document.getElementById("ChatbotTextOutput");
    const chatText = chat.value;
    let chatArray = chatText.split(" ")
    try {
        var box = document.getElementById("slideThree" + chatArray[1]);
        if (chatArray[0] == "on") {
            box.checked = true;
            chatOutput.value = "\nswitched " + chat.value
        }
        else if (chatArray[0] == "off") {
            box.checked = false;
            chatOutput.value = "\nswitched " + chat.value
        }
        else if (chatArray[0] == "help") {

            str = `Hello master!
I am here to help you.

Here are my commands - 
1. help
2. on/off deviceID
3. numOf on
4. numOf off      
5. stats deviceID  
`
            chatOutput.value = str
        }
        else if (chatArray[0] == "numOf") {
            if (chatArray[1] == "on") {
                chatOutput.value = "There are " + countOn() + " devices on";
                console.log(countOn());
            }
            if (chatArray[1] == "off") {
                chatOutput.value = "There are " + countOff() + " devices off";
                console.log(countOff());
            }

        }
        else if (chatArray[0] == "stats") {
            stats(chatArray[1])
        }
        else if (chatArray[0] == "profile") {
            popup('.Account')

        }
        else {
            chatOutput = chat.value;
        }
    } catch (error) {
        console.log(error);
    }

    checkbox();
    chat.value = "";

}

function countOn() {
    let count = 0;
    for (i = 1; i < number; i++) {
        temp = document.getElementById("slideThree" + i);
        if (temp.checked) {
            count = count + 1
        }
    }
    return count;
}

function countOff() {
    let count = 0;
    for (i = 1; i < number; i++) {
        temp = document.getElementById("slideThree" + i);
        if (!temp.checked) {
            count = count + 1
        }
    }
    return count;
}