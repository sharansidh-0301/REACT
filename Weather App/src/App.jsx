import propTypes from 'Prop-Types';
import { useEffect, useState } from 'react'
import './App.css'
import cloudsIcon from "./assets/clouds.png"
import clearIcon from "./assets/sunny.png"
import rainIcon from "./assets/rain.png"
import drizzleIcon from "./assets/wet.png"
import snowIcon from "./assets/winter.png"
import searchIcon from "./assets/search.png"
import humidityIcon from "./assets/humidity.png"
import windIcon from "./assets/wind.png"

const WeatherDetails = ({icon, temp, city, country,lat, long, wind, humidity}) =>{
  return (
    <>
    <div className="weather-container">
      <div className="weather-icon">
        <img src={icon} alt="image" className='weather-img'/>
      </div>
      <div className="weather-info">
      <div className="temp">{temp}°C</div>  
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">Longitude</span>
          <span>{long}</span>
      </div>
      </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" />
          <div className="data">
            <div className="data-precent">{humidity} %</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="" />
          <div className="data">
            <div className="data-precent">{wind} Km/Hr</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

function App() {
  const apiKey = "799a16ff3e720fb92b5254915694eb07";
  const [icon, setIcon] = useState(clearIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("India");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("Chennai");
  const [error, setError] = useState("");

  const weatherIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudsIcon,
    "02n": cloudsIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };


  const getData = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
      const res = await fetch(url);
      const data = await res.json();
      if(data.cod==="404"){
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setTemp(data.main.temp);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setLat(data.coord.lat);
      setLong(data.coord.lon);
      setCountry(data.sys.country);
      setCity(data.name);
      setText(data.name);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIcons[weatherIconCode] || clearIcon);  
      setCityNotFound(false);
      }catch(e){
      console.log(e);
      setError("Something went wrong");
      setCityNotFound(true);
      setLoading(false);
      return;
    }finally{
      setLoading(false);
    }

  }
  const handleCity = (e)=>{
    setCity(e.target.value);
  }

  const proceedData = (e) => {
    if(e.key === "Enter"){
      getData(); 
    }
  }

  useEffect(() => {
    getData();
  }
  ,[]);


  return (
    <>
    <div className="container">
      <div className="input-container">
        <input type="text" className='cityInput' placeholder='Search City'  onChange={handleCity} value={city} onKeyDown={proceedData}/>
        <div className="search-icon">
          <img src={searchIcon} alt="search" onClick={() => getData()} />
        </div>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {cityNotFound && <div className="cityNotFound">City Not Found !!</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !cityNotFound  && <WeatherDetails icon={icon} temp={temp} city={text} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />}
      <footer>
      <p className="footer">Made with ❤️ by <a href="https://www.linkedin.com/in/sharansidh0301/" target="_blank" rel="noopener noreferrer">Sidh</a></p>    
      </footer>
    </div>
    </>
  )
}

WeatherDetails.propTypes = {
  icon: propTypes.string.isRequired,
  temp: propTypes.number.isRequired,
  city: propTypes.string.isRequired,
  country: propTypes.string.isRequired,
  lat: propTypes.number.isRequired,
  long: propTypes.number.isRequired,
  wind: propTypes.number.isRequired,
  humidity: propTypes.number.isRequired
}

export default App
