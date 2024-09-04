const API_KEY = "";

function getCity() {
    return document.getElementById("city").value;
}

async function getWeather() {
    try {
        const city = getCity();
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const day = data.days[0];
        const info = {
            windSpeed: (day.windspeed * 1.60934).toFixed(2),
            windDirection: day.winddir,
            temperature: ((day.temp - 32) * (5 / 9)).toFixed(2),
            humidity: day.humidity,
            precipitation: day.precip,
            description: day.description,
        };
        return info;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function getAll() {
    const weatherData = await getWeather();
    if(weatherData) {
        document.getElementById("weather-city").textContent = (getCity());
        document.getElementById("temperature").textContent = `${weatherData.temperature} °C`;
        document.getElementById("windspeed").textContent = `${weatherData.windSpeed} km/h`;
        document.getElementById("humidity").textContent = `${weatherData.humidity} %`;
        document.getElementById("precipitation").textContent = `${weatherData.precipitation} mm²`;         
        document.getElementById("description").textContent = `${weatherData.description}`;
    }
}

