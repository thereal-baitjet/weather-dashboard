const apiKey = "0b64c884989be34accb83c0b53a2df03"
var city = "New York"
// var dateEl = document.getElementsByClassName("currentDate").innerHTML;
var currentDate = document.getElementById("currentDate")
var searchInput = document.getElementById("searchInput")
var seachButton = document.getElementById("searchButton")
var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var windSpeed = document.getElementById("windSpeed")
var uvIndex = document.getElementById("uvIndex")
var cardRow = document.getElementById("cardRow")
var pastSearches = ["boston", "atlanta"]


searchButton.addEventListener("click", function () {
    var city = searchInput.value
    pastSearches.push(city)
    console.log(city)
    getCityData(city)
    getCityForecast(city)
})
console.log(currentDate)
// value of what is input is city that is searched


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

console.log(today)

currentDate.textContent = today;
//currentDate.innerHTML = "<br>" + today
// gets todays value and renders on currentdate id

function getCityData(city) {

    var url = generateWeatherUrl(city)

    axios.get(url)
        .then((response) => {
            var tempK = response.data.main.temp
            temp.textContent = kToF(tempK)
            humidity.textContent = response.data.main.humidity + "%"
            windSpeed.textContent = response.data.wind.speed + " MPH"
            // uvIndex.textContent = 
            console.log(response)
        });
}
// pulls input fro selected city and places on text content for temp, humidity, windspeed and uvindex 
function generateWeatherUrl(city) {
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(url);
    return url
}
// calls the api make the input city

function kToF(k) {
    //    ° F = 9/5 (K - 273) + 32
    return (k - 273) * 9 / 5 + 32 + " F"
}
// function to turn kelvin to farenhiet

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

function generateFiveDayUrl(city) {
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    console.log(url);
    return url
}

function getCityForecast(city) {

    var url = generateFiveDayUrl(city)

    axios.get(url)
        .then((response) => {
            // uvIndex.textContent = 
            var data = response.data
            var timeSlots = response.data.list
            var timeSlotsToDisplay = [
                //0,8,16,24,32
                timeSlots[0],
                timeSlots[8],
                timeSlots[16],
                timeSlots[24],
                timeSlots[32],
            ]
            console.log(timeSlotsToDisplay)
            for (i = 0; i < timeSlotsToDisplay.length; i++) {
                var slot = timeSlotsToDisplay[i]
                console.log(slot)
                renderCard(slot)
            }
        });
}
{
/* <div class="card-row">
<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">2/21/2021</h5>
        <p class="card-text">temperature 41</p>
        <p class="card-text">Humidity of 20%</p>
    </div>
</div> */}

function renderCard(slot) {
    var date = slot.dt_txt.slice(0,10)
    var iconUrl = "http://openweathermap.org/img/w/" + slot.weather[0].icon + ".png"
    var html = `<div class="card" style="width: 12rem;">
    <div class="card-body">
        <h5 class="card-title">${date}</h5>
        <img src="${iconUrl}">
        <p class="card-text">temperature ${slot.main.temp} </p>
        <p class="card-text">Humidity of ${slot.main.humidity}</p>
    </div>
</div>`
// Makes card rows for the five day forcast and adding styling attributes//
    cardRow.innerHTML += html
}
window.addEventListener("click", function(event){
    console.log(event.target)
    if(event.target.classList.contains("card-text")){
        alert()
    }
}) 

function renderBtn() {
}
