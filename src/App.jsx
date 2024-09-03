import { useState, useEffect } from 'react'
import { empty, wind, humidity, d01, n01, d02, n02, d03, n03, d04, n04, d09, n09, d10, n10, d11, n11, d13, n13, d50, n50 } from './assets/img.js';

function App() {
  const [userInput, setUserInput] = useState('')
  const [city, setCity] = useState('peshawar')
  const [weather, setWeather] = useState(false);

  const getData = async () => {
    const url = `.netlify/functions/hello?city=${city}`

    try {
      console.log('data loading...');
      const response = await fetch(url)
      const data = await response.json()
      console.log('data loaded successfully . .. ' ,data);
      setWeather({
        icon: data.weather[0].icon,
        temp: data.main.temp.toFixed(),
        weather: data.weather[0].main,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        location: data.name,
        date: new Date(data.dt * 1000).toDateString(),
        desc: data.weather[0].description
      });
    } catch (error) {
      console.log(error);
      setWeather({
        icon: false,
        temp: 0,
        weather: 0,
        windSpeed: 0,
        humidity: 0,
        location: 'Not Found',
        date: 'Please Enter a Valid City Name',
      });
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(userInput);    
    setCity(userInput)
    console.log(city);    
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  const weatherIcons = {
    '01d': d01,
    '01n': n01,
    '02d': d02,
    '02n': n02,
    '03d': d03,
    '03n': n03,
    '04d': d04,
    '04n': n04,
    '09d': d09,
    '09n': n09,
    '10d': d10,
    '10n': n10,
    '11d': d11,
    '11n': n11,
    '13d': d13,
    '13n': n13,
    '50d': d50,
    '50n': n50,
  };

  const currentIcon = weatherIcons[weather.icon] || empty;

  return (
    <div className="bg-slate-800 w-screen h-screen flex items-center flex-col text-white pt-8">
      <h1 className='text-4xl text-center mb-8 max-w-[20rem]'>Your Daily Forecast Clear and Simple</h1>

      <div className="w-1/4 min-w-[24rem] p-6 rounded-lg grid bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% backdrop-blur-2xl">
        <form className="flex justify-between" onSubmit={submitHandler}>
          <input
            type="text"
            required
            placeholder="Search"
            className="pl-5 outline-0 bg-white text-black/70 capitalize rounded-3xl w-10/12"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" className="py-[0.5rem] rounded-full bg-white w-[3.1rem]">
            <i className="las la-search text-black text-2xl scale-x-[-1]"></i>
          </button>
        </form>

        <h1 className="text-lg font-semibold text-center mt-6">{weather.date}</h1>

        <div className="w-full flex justify-center p-8">
          <img
            src={currentIcon}
            alt="Weather Icon"
            className="w-28 object-cover"
            style={{ filter: 'drop-shadow(0 0 10px lightblue)' }}
          />
        </div>

        <div className="text-center">
          <h2 className='capitalize mb-2'>{weather.desc}</h2>
          <h1 className="text-6xl font-semibold">{weather.temp}°<span className="text-4xl">C</span></h1>
          <p className="text-4xl mt-2">{weather.location}</p>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <img src={humidity} alt="Humidity" className="h-8 object-cover" />
            </div>
            <div className="ml-2 text-left">
              <p className="text-2xl">{weather.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="flex justify-end items-center w-full mt-4">
            <div className="flex-shrink-0">
              <img src={wind} alt="Wind Speed" className="h-8 object-cover" />
            </div>
            <div className="ml-2 flex flex-col items-end justify-end">
              <p className="text-2xl">{weather.windSpeed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
