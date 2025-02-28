import React, { useEffect,useState } from 'react'
import "./Home.css"; 
import { useNavigate } from 'react-router-dom';
import cities from "../Asset/Cities.json"

function Home() {
  const [Weather, setWeather] = useState({});
  const [Loading, setLoading] = useState(true);
  const [City, setCity] = useState("");
  const navigate = useNavigate(); 

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const searchCity = () => {
    fetchWeather(City, navigate);
    setCity("");
  };

  const fetchWeather = async (city, navigate) => {
    try {
      setLoading(true); 
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=c1973ce5139b4f5396e170351223001&q=${city}&aqi=no`
      );
      const data = await response.json();

      if (data.error) {
        console.log("hello");
        navigate("/errorP");
      } else {
        setWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      navigate("/errorP");
    } finally {
      setLoading(false); 
    }
  };

  const allCities=cities.filter((city)=>{
    return city.name.toLowerCase().includes(City.toLowerCase())
  })
  console.log(allCities);

  var listCity=allCities.map((city)=>{
    return <p onClick={()=>{ fetchWeather(city.name,navigate); setCity("")}}>{city.name}</p>
  }).slice(0,10)

  useEffect(() => {
    fetchWeather("Pune", navigate); 
  }, [navigate]); 

    
  return (
    <>
        <div className="container">
        <h1>Real-Time Weather App</h1>

        <div className="search-box">
            <input type="text" onChange={changeHandler} value={City} placeholder="Enter city name..." id="city-input"/>
            <button id="search-btn" onClick={searchCity}>Search</button>
        </div>
        {City ? <div className="drop-down">
          {listCity}
        </div> : <p></p> }
        
        {Loading? <p>Loading...</p> :<div className="weather-card">
            <h2 id="city-name">{Weather.location.name}, {Weather.location.region}</h2>
            <p id="weather-status"><img src={Weather.current.condition.icon} height={100} alt='Loading....'/></p>
            <h3 id="temperature">{Weather.current.temp_c}°C</h3>
            <p id="humidity">Humidity: {Weather.current.humidity}%</p>
            <p id="wind-speed">Wind Speed: {Weather.current.wind_kph} km/h</p>
        </div>}
    </div>
    </>
  )
}

export default Home;