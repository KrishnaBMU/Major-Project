let number = 6;


function popup(parm){
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

function profileSave(){
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
            document.getElementById("pinnum").innerHTML = 'D' + (number);
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
    let sensorName = document.getElementById("sensorName");
    let sensorLocation = document.getElementById("sensorLocation");
    newSensor();
    number = number + 1;
}

function newSensor() {
    var code = document.getElementsByTagName("ul");
    var sensorStart = `<li class="flex-item">
<h2 id="deviceName` + (number + 1) + `"class="left">`
    var sensorMiddle = `</h2>
<br>
<img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/map-pin.svg" alt="map-pin" class="left svg-white" />
<p id="deviceLocation` + (number + 1) + `">`
    var sensorEnd = `</p>
<br>
<img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/pie-chart.svg" alt="pie-chart" class="left svg-white" />
<p class="pointer" onclick="stats(`+ number + `)">See Stats</p>
<div class="slideThree">
<input type="checkbox" value="None" id="slideThree` + number + `" onchange="checkbox()" name="check" />
<label for="slideThree` + number + `"></label>
</div>
</li>`

    var addSensorText = `<div class="addItem pointer" onclick="newSensorPopup()">
<img src="https://github.com/KrishnaBMU/IOT-Dashboard/blob/main/icons/addItem.png?raw=true" width="100px" height="100px" alt="Add">
</div>`

    var sensors = document.querySelector("ul");
    sensors.removeChild(document.querySelector(".addItem"));
    console.log(sensors.innerHTML)
    sensors.innerHTML += sensorStart + document.getElementById("sensorName").value + sensorMiddle + document.getElementById("sensorLocation").value + sensorEnd + "\n\n\n" + addSensorText;

    let newSelect = document.createElement("option");
    newSelect.value = number + 1
    newSelect.innerHTML = number + 1
    document.getElementById("editSensorSelect").append(newSelect)

    newSensorPopup();
}

function send(link) {
    var xhttp = new XMLHttpRequest();
    console.log(link);
    xhttp.open("GET", link, true);
    xhttp.send();
}

var option1 = document.getElementById("slideThree1");
var option2 = document.getElementById("slideThree2");
var option3 = document.getElementById("slideThree3");
var option4 = document.getElementById("slideThree4");
var option5 = document.getElementById("slideThree5");
var option6 = document.getElementById("slideThree6");
// var option7 = document.getElementById("slideThree7");
let a = "0";
let b = "0";
let c = "0";
let d = "0";
let e = "0";
let f = "0";
// let g = "0";
function checkbox() {

    if (option1.checked) {
        a = "1";
    }
    else if (!option1.checked) {
        a = "0";
    }
    if (option2.checked) {
        b = "1";
    }
    else if (!option2.checked) {
        b = "0";
    }
    if (option3.checked) {
        c = "1";
    }
    else if (!option3.checked) {
        c = "0";
    }
    if (option4.checked) {
        d = "1";
    }
    else if (!option4.checked) {
        d = "0";
    }
    if (option5.checked) {
        e = "1";
    }
    else if (!option5.checked) {
        e = "0";
    }
    if (option6.checked) {
        f = "1";
    }
    else if (!option6.checked) {
        f = "0";
    }
    let link = "https://api.thingspeak.com/update?api_key=Z23ESCW35RJN0OFD&field1=" + a + "&field2=" + b + "&field3=" + c + "&field4=" + d + "&field5=" + e + "&field6=" + f;
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

function editSensorPopupSave() {
    let editSensorSelect = document.getElementById("editSensorSelect");
    let editSensorName = document.getElementById("editSensorName");
    let editSensorLocation = document.getElementById("editSensorLocation");

    let sensorName = document.getElementById("deviceName" + editSensorSelect.value);
    let sensorLocation = document.getElementById("deviceLocation" + editSensorSelect.value)

    sensorName.innerHTML = editSensorName.value;
    sensorLocation.innerHTML = editSensorLocation.value;
    popup('.EditSensor');
}