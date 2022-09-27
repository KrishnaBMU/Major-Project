function account(){

    let account = document.querySelector(".Account");
    let notPopup = document.querySelector(".NotPopup")
    if(account.style.display == "none"){
        account.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
        
    }
    else{
        account.style.display = "none"
        notPopup.style.filter = ""
    }
}

function stats(SendorId){

    let stats = document.querySelector(".Stats");
    let notPopup = document.querySelector(".NotPopup")
    if(stats.style.display == "none"){
        stats.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
    }
    else{
        stats.style.display = "none"
        notPopup.style.filter = ""
    }
}

function newSensorPopup(){
    let sensor = document.querySelector(".AddSensor");
    let notPopup = document.querySelector(".NotPopup")
    if(sensor.style.display == "none"){
        sensor.style.display = "flex"
        notPopup.style.filter = "blur(7px)";
    }
    else{
        sensor.style.display = "none"
        notPopup.style.filter = ""
    }
}

function newSensorPopupSave(){
    let sensorName = document.getElementById("sensorName");
    let sensorLocation = document.getElementById("sensorLocation");
    newSensor();
}

function newSensor(){
    var code = document.getElementsByTagName("ul");
    var sensorStart = `<li class="flex-item">
    <h2 class="left">`
    var sensorMiddle = `</h2>
    <br>
    <img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/map-pin.svg" alt="map-pin" class="left svg-white" />
    <p>`
    var sensorEnd = `</p>
    <br>
    <img src="https://raw.githubusercontent.com/KrishnaBMU/IOT-Dashboard/fc2a4b3d087394b534a8ddc8ce897679f96a9321/icons/pie-chart.svg" alt="pie-chart" class="left svg-white" />
    <p class="pointer" onclick="stats(8)">See Stats</p>
    <div class="slideThree">
        <input type="checkbox" value="None" id="slideThree8" name="check" />
        <label for="slideThree8"></label>
    </div>
</li>`

    var addSensorText = `<div class="addItem pointer" onclick="newSensorPopup()">
    <img src="https://github.com/KrishnaBMU/IOT-Dashboard/blob/main/icons/addItem.png?raw=true" width="100px" height="100px" alt="Add">
</div>`
    
    var sensors = document.querySelector("ul");
    sensors.removeChild(document.querySelector(".addItem"));
    console.log(sensors.innerHTML)
    sensors.innerHTML += sensorStart + document.getElementById("sensorName").value + sensorMiddle + document.getElementById("sensorLocation").value +  sensorEnd +"\n\n\n" + addSensorText;
    newSensorPopup();
}

var ctx = document.getElementById('WashroomTap').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
