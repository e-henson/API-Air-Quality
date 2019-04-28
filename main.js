//form search event
const formTag = document.querySelector("form")
const inputTag = formTag.querySelector("input")

const accessKeyWAQI = "bc6b140103638ed2e8e41be88f220114d30ba972";
const WAQIurl = `https://api.waqi.info/search/?token=${accessKeyWAQI}&keyword=`;


//when we submit the form, get the info from input
formTag.addEventListener("submit", function(event) {
	//stop form from going to next page
    event.preventDefault()
    // get the info from input 
    const searchTerm = inputTag.value
	//returns information in console
	$.ajax(`WAQIurl${searchTerm}`).done(function (response) {
    	console.log(response);
  	});
});
