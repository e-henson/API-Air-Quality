const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("ul#results");
const circleGreenGood = document.getElementById("green");
const $location = $(`#location`);
const $aq = $(`#air-quality`);

const accessKeyWAQI = "bc6b140103638ed2e8e41be88f220114d30ba972";
const WAQIurl = `https://api.waqi.info/search/?token=${accessKeyWAQI}&keyword=`;

function resetUI() {
    resultsTag.innerHTML = '';
    // $aq.html('');
}

//when form is submitted, get the info from input
formTag.addEventListener("submit", function(event) {
    resetUI();
    // insert spinner now...
    $location.html('<img src="spinner.png" />');
	//stop form from going to next page
    event.preventDefault();
    // get the info from input 
    const searchTerm = inputTag.value;

    //returns information in console
    const result =
      $.ajax(`${WAQIurl}${searchTerm}`).done(function(response) {
        resetUI();

           console.log(response);     
        //if no data print this
        if (!response.data[0]) {
            // $location.text("No data for this location :(");
            const errorMessage = document.createElement("li");
            errorMessage.innerText = "No data for this location :(";
            resultsTag.appendChild(errorMessage);
            return;
        }

        //this gets the array of data
        const dataArray = response.data;
        
        //element = whole line info + index = number in array (0,1,2 etc)
        dataArray.forEach(function(element, index) {
            
            const location = response.data[index].station.name;            
            const airQualityIndex = "Air Quality Index:" + " " + response.data[index].aqi;
            const aqi = response.data[index].aqi;        
            const addResult = document.createElement("li");
            
            //add div to the locationContainer
            const locationContainer = document.createElement('div');
            //adds div to the aqiContainer
            const aqiContainer = document.createElement('div.aqi');
            //adds div to the circleIndicator
            const circleIndicatorContainer = document.createElement('div');

            //add the location result to the location container
            locationContainer.innerText = location;    
            //add the aqi result to the aqi container                        
            aqiContainer.innerText = airQualityIndex;

            if(aqi > 0 && aqi <= 50) {
                circleIndicatorContainer.classList.add("circle-green-good");
            } else if (aqi >= 51 && aqi <= 100) {
                circleIndicatorContainer.classList.add("circle-yellow-moderate");  
            } else if (aqi >= 101 && aqi <= 150) {
                circleIndicatorContainer.classList.add("circle-orange-unhealthy");
            } else if (aqi >= 151 && aqi <= 200) {
                circleIndicatorContainer.classList.add("circle-red-v-unhealthy");
            } else if (aqi >= 201 && aqi <= 300) {
                circleIndicatorContainer.classList.add("circle-purple-v-v-unhealthy");              
            } else if (aqi >= 301 && aqi <= 500)  {
                circleIndicatorContainer.classList.add("circle-purple-hazardous");                             
            } else {
                circleIndicatorContainer.style.display = "none";
            }
      

            addResult.appendChild(locationContainer);
            addResult.appendChild(aqiContainer);
            addResult.appendChild(circleIndicatorContainer);

            // resultsTag.appendChild(addResult);


            if(aqi === "") {
                resultsTag.removeChild(addResult);
            // } else if (aqi === "-") {
            //     resultsTag.removeChild(addResult);
            } else {
                resultsTag.appendChild(addResult);               
            }

            });

        });
});


    //turn on about nav
    const viewNav = document.getElementById("about");
    const toggleNav = document.getElementsByClassName("toggle-nav")[0];

    viewNav.addEventListener("click", (e) => {
        toggleNav.classList.add("on");      
    });

    //turn off about nav
    const exitNav = document.getElementById("exit-nav");

    exitNav.addEventListener("click", (e) => {
        toggleNav.classList.remove("on"); 
    });
