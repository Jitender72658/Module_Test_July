const contentDiv = document.getElementById('weather-data'); 

/// Adding a city
const addCityButton = document.getElementById('add-city');
const formContainer = document.getElementById('formContainer');
const closeButton = document.getElementById('closeButton1');

// Add a click event listener to the button
addCityButton.addEventListener('click', () => {
    // Show the pop-up by removing the 'hidden' class
    formContainer.classList.remove('hidden');
});

// Close the pop-up when clicking the close button
closeButton.addEventListener('click', (event) => {
    // Stop event propagation to prevent the click on closeButton from reaching popupContainer
    event.stopPropagation();
    
    formContainer.classList.add('hidden');
});

// Close the pop-up when clicking outside the content
formContainer.addEventListener('click', (event) => {
    if (event.target === formContainer) {
        formContainer.classList.add('hidden');
    }
});


const apiKey = '98fc1d63fdc4dcf6b9c074cce4e64803';
const addCity = document.getElementById("cityName");
const cityForm = document.getElementById("cityForm");
let cityNameList =['london', 'delhi', 'mumbai','paris','tokyo', 'sydney','rome','barcelona','istanbul','beijing','bangkok','amsterdam','moscow','budapest','chicago','dhaka','shanghai'];

cityForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    const cityName = addCity.value;
    console.log(cityName);
   if(cityNameList.includes(cityName.toLowerCase())){
    console.log("name-present");
     const alreadyExistCityElement = document.getElementById("cityAlreadyExistDiv");
     alreadyExistCityElement.classList.remove('already-exist-city-div');

     const btnDiv = document.getElementById("btnDiv");
     btnDiv.classList.add("btn-div-hidden");

     const closeBtn2 = document.getElementById("closeButton2");
      closeBtn2.addEventListener('click', (event) => {
        console.log(btnDiv.classList.remove("btn-div-hidden"));
        alreadyExistCityElement.classList.add("already-exist-city-div");
    });


    // const promptDiv = document.getElementById('promptContainer')
    //  promptDiv.classList.remove('hidden');

    //  const promptCloseButton = document.getElementById('closeButton2');
    //  promptCloseButton.addEventListener('click', (event) => {
    // // Stop event propagation to prevent the click on closeButton from reaching popupContainer
    
    //  promptDiv.classList.add('hidden');
    //  });
    //  promptDiv.addEventListener('click', (event) => {
    //     if (event.target === promptDiv) {
    //         promptDiv.classList.add('hidden');
    //     }
    // });

   }
   
  })

cityNameList.forEach((city)=>{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
      renderWeatherList(data);
   })
   .catch(error => console.error("Error fetching data:", error));
})


//    name: City Name
// weather: Array containing weather conditions (e.g., "Rain", "Clear")
// main: Object containing temperature, humidity, pressure
// wind: Object containing wind speed and direction
// clouds: Object containing cloudiness percentage
// sys: Object containing country code, sunrise, and sunset times


    function renderWeatherList(coin){
    const itemDiv = document.createElement('div');
    itemDiv.className="data-item";

    const cityName = document.createElement('h6');
    cityName.innerText=coin.name;
    const weather = document.createElement('p');
    weather.innerText="weather";
    const wind = document.createElement('p');
    wind.innerText ="wind";
    const clouds = document.createElement('p');
    const sys = document.createElement('p');
    itemDiv.appendChild(cityName);
    itemDiv.appendChild(weather);
    itemDiv.appendChild(wind);
    itemDiv.appendChild(clouds);
    itemDiv.appendChild(sys);
    contentDiv.appendChild(itemDiv);
  }