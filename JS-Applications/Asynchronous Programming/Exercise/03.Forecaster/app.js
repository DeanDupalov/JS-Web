function attachEvents() {
    /*
        Make get request and receive an array of objs
        Find the object, corresponding to the name that the user submitted
        Obj.code make GET req forecast today
        Obj.code make GET req forecast upcoming
        Dom operations
        - div forecast set to visible
        -read input
        -find the Btn
        Error Handling
 */

    let locationName = document.getElementById('location');
    const getWeatherBtn = document.getElementById('submit');
    const forecastDiv = document.getElementById('forecast');
    const currentWeatherDiv = document.getElementById('current');
    const upcomingWeatherDiv = document.getElementById('upcoming');

    const conditionSymbols = {
        'sunny': '&#x2600;',
        'partly sunny': '&#x26C5;',
        'overcast': '&#x2601;',
        'rain': '&#x2614;',
        'degrees': '&#176;'
    }
    getWeatherBtn.addEventListener('click', requestHandler);

    async function requestHandler() {

        let urlLocations = 'http://localhost:3030/jsonstore/forecaster/locations';
        let location;
        try {
            const response = await fetch(urlLocations);
            if (response.status !== 200) {
                throw new Error();
            }
            const locationsData = await response.json();
            location = findLocationObj(locationsData, locationName.value)

            if (location === undefined) {
                throw new Error();
            }
        } catch (error) {
            console.log('Error')
        }

        const [todayWeatherObj, upcomingWeatherObj] = await Promise.all([
            fetch(`http://localhost:3030/jsonstore/forecaster/today/${location.code}`)
                .then((response) => response.json()),
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`)
                .then(response => response.json()),
        ]);

        console.log(upcomingWeatherObj);
        addElementsToCurrentWeather(currentWeatherDiv, todayWeatherObj);
        addElementsToUpcomingWeather(upcomingWeatherDiv, upcomingWeatherObj)


        forecastDiv.style.display = '';

        function addElementsToCurrentWeather(div, todayWeather) {
            let low = todayWeather.forecast.low;
            let high = todayWeather.forecast.high;
            let condition = todayWeather.forecast.condition;

            let forecastDiv = document.createElement('div');
            forecastDiv.classList.add('forecasts');

            let conditionSymbolSpan = document.createElement('span');

            conditionSymbolSpan.classList.add('condition');
            conditionSymbolSpan.classList.add('symbol');
            conditionSymbolSpan.innerHTML = conditionSymbols[condition.toLowerCase()];

            let conditionAllSpan = document.createElement('span');
            conditionAllSpan.classList.add('condition');

            let nameSpan = document.createElement('span');
            nameSpan.classList.add('forecast-data');
            nameSpan.textContent = todayWeather.name;

            let temperatureSpan = document.createElement('span');
            temperatureSpan.classList.add('forecast-data');
            temperatureSpan.innerHTML = `${low}${conditionSymbols['degrees']}/${high}${conditionSymbols['degrees']}`;

            let conditionSpan = document.createElement('span');
            conditionSpan.classList.add('forecast-data');
            conditionSpan.textContent = condition;

            conditionAllSpan.appendChild(nameSpan);
            conditionAllSpan.appendChild(temperatureSpan);
            conditionAllSpan.appendChild(conditionSpan);

            forecastDiv.appendChild(conditionSymbolSpan);
            forecastDiv.appendChild(conditionAllSpan);
            div.appendChild(forecastDiv);

        }

        function addElementsToUpcomingWeather(div, upcomingWeather) {
            const [day1, day2, day3] = upcomingWeather.forecast;

            let foreCastInfoDiv = document.createElement('div');
            foreCastInfoDiv.classList.add('forecast-info');

            function createUpcomingDay(day) {
                let upcomingSpanDay = document.createElement('span');
                upcomingSpanDay.classList.add('upcoming');

                let symbolSpan = document.createElement('span');
                symbolSpan.classList.add('symbol');
                symbolSpan.innerHTML = conditionSymbols[day.condition.toLowerCase()];

                let tempSpan = document.createElement('span');
                tempSpan.classList.add('forecast-data');
                tempSpan.innerHTML = `${day.low}${conditionSymbols["degrees"]}/${day.high}${conditionSymbols["degrees"]}`

                let conditionSpan = document.createElement('span');
                conditionSpan.classList.add('forecast-data');
                conditionSpan.textContent = day.condition;

                upcomingSpanDay.appendChild(symbolSpan);
                upcomingSpanDay.appendChild(tempSpan);
                upcomingSpanDay.appendChild(conditionSpan);

                return upcomingSpanDay;
            }

            const dayOne = createUpcomingDay(day1);
            const dayTwo = createUpcomingDay(day2);
            const dayThree = createUpcomingDay(day3);

            foreCastInfoDiv.appendChild(dayOne);
            foreCastInfoDiv.appendChild(dayTwo);
            foreCastInfoDiv.appendChild(dayThree);
            div.appendChild(foreCastInfoDiv);
        }

        locationName.value = '';

        function findLocationObj(locationsArr, name) {
            return locationsArr.find((l) => l.name === name);
        }
    }


}

attachEvents();