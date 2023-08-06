const contentDiv = document.getElementById('weatherData'); 

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
const alreadyExistCityElement = document.getElementById("cityAlreadyExistDiv");
const btnDiv = document.getElementById("btnDiv");
cityForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    const cityName = addCity.value;
   if(cityNameList.includes(cityName.toLowerCase())){
     alreadyExistCityElement.classList.remove('already-exist-city-div');
     btnDiv.classList.add("btn-div-hidden");
   }
   else{
    function checkingValidName(cityNmae) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                
               // Check if the response contains valid data
                if (data.cod!=='404') {
                    resolve(data);
                } else {
                    reject(new Error("Invalid data received"));
                }
            } catch (error) {
                reject(error);
            }
        });
    }
       
    checkingValidName().then(()=>{
        cityNameList.push(cityName.toLowerCase());
        if (event.target === cityForm) {
            formContainer.classList.add('hidden');
        }
        const parentElement = document.getElementById("weatherData"); 
        while (parentElement && parentElement.firstChild) {
         parentElement.removeChild(parentElement.firstChild);
           }
          loaddata().then(refresh);
        })
    checkingValidName().catch(()=>{
    })
   }
   
  })

  const closeBtn2 = document.getElementById("closeButton2");
  closeBtn2.addEventListener('click', (event) => {
     event.stopPropagation();
    btnDiv.classList.remove("btn-div-hidden");
     alreadyExistCityElement.classList.add("already-exist-city-div");
});

let weatherData = [];
async function loaddata() {
    weatherData = [];
    
    for (const city of cityNameList) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            weatherData.push(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}

loaddata().then(refresh);
  
function refresh(){
    weatherData.sort((a, b) => a.main.temp - b.main.temp);
    for(let i = 0;i<weatherData.length;i++){
     const weatherDataItem =weatherData[i];
    const itemDiv = document.createElement('div');
    itemDiv.className="weatherDataItem-item";
    itemDiv.style.display='flex';
    itemDiv.style.justifyContent="space-between";


    const leftDiv = document.createElement('div');
    leftDiv.style.display="flex";
    leftDiv.style.flexDirection="column";
    leftDiv.style.justifyContent="start";
    leftDiv.style.alignItems="start";
    leftDiv.style.rowGap="10px";

    const temperature = document.createElement('p');
    temperature.innerText = weatherDataItem.main.temp+"°";
    temperature.style.fontSize='45px';
    const tempDiv = document.createElement('div');
    tempDiv.style.display="flex";
    tempDiv.style.gap="10px";
    const maxTemp = document.createElement('p');
    maxTemp.innerText = "H: "+weatherDataItem.main.temp_max+"°";
    const minTemp = document.createElement('p');
    minTemp.innerText = "L: "+weatherDataItem.main.temp_min+"°";
    tempDiv.appendChild(maxTemp);
    tempDiv.appendChild(minTemp);


    const cityName = document.createElement('p');
    cityName.innerText=weatherDataItem.name+", "+  weatherDataItem.sys.country;
    cityName.style.fontSize="19px";

    leftDiv.appendChild(temperature)
    leftDiv.appendChild(tempDiv);
    leftDiv.appendChild(cityName);

    const rightDiv = document.createElement('div');
    rightDiv.style.display="flex";
    rightDiv.style.flexDirection="column";
    rightDiv.style.justifyContent="start";
    rightDiv.style.alignItems="center";
    rightDiv.style.rowGap="10px";
    const weatherIcon = document.createElement('img');
    weatherIcon.src= `http://openweathermap.org/img/wn/${weatherDataItem.weather[0].icon}.png`;
    weatherIcon.style.width="170px";
    const weatherDescription = document.createElement('p');
    weatherDescription.innerText= weatherDataItem.weather[0].description;


    rightDiv.appendChild(weatherIcon);
    rightDiv.appendChild(weatherDescription);


    itemDiv.appendChild(leftDiv);
    itemDiv.appendChild(rightDiv);
    contentDiv.appendChild(itemDiv);
    
  }
}
