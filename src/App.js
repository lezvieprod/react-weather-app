import './App.css';
import { useState } from 'react';

function App() {

  const weatherApi = {
    key: "610a9f2255ef4935042e049162ca8c32",
    urlbase: "https://api.openweathermap.org/data/2.5/"
  }

  const [weatherInfo, setWeatherInfo] = useState({})
  const [city, setCity] = useState('');
  console.log(weatherInfo);

  const getWeather = async () => {
    try {
      let response = await fetch(`${weatherApi.urlbase}weather?q=${city}&lang=ru&units=metric&appid=${weatherApi.key}`);
      let weather = await response.json();
      weather && setWeatherInfo(weather);
    }
    catch {
      alert('undefined error')
    }
  }

  return (
    <div className="app-layout">
      <div className="app-body">
        <p>Введите город или страну</p>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Узнать погоду</button>
        <div className="app-output-info">
          {(typeof weatherInfo.weather !== "undefined") &&
            <div className="weather-output">
              <div className="weather-output__city">
                {weatherInfo.name + ', ' + weatherInfo.sys.country}
              </div>
              <div>
                {weatherInfo.weather.map(i => i.description)}
              </div>
              <div>
              Температура сейчас: <strong>{ Math.round(weatherInfo.main.temp)}</strong>
              </div>
            </div>
          }
          {weatherInfo.message &&
            <div className="weather-output">
              <div>
                {'Error code: ' + weatherInfo.cod}
              </div>
              <div>
                {weatherInfo.message}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
