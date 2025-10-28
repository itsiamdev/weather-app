import sunny from "../images/sunny.png";
import cloudy from "../images/cloudy.png";
import rainy from "../images/rainy.png";
import snowy from "../images/snowy.png";
import { useState, useEffect } from "react";
import loadingGif from "../images/loading.gif";

const WeatherApp = () => {
  const api_key = "630693b2ad7cda52a560aa706cfe0b8f";
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLocation = "Tbilisi";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=630693b2ad7cda52a560aa706cfe0b8f&units=metric`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLocation("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  const background = {
    Clear: "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)",
    Clouds: "linear-gradient(to right, #bdc3c7, #2c3e50)",
    Rain: "linear-gradient(to right, #000046, #1cb5e0)",
    Snow: "linear-gradient(to right, #83a4d4, #b6fbff)",
    Haze: "linear-gradient(to right, #3e5151, #decba4)",
    Mist: "linear-gradient(to right, #606c88, #3f4c6b)",
  };

  const backgroundImage = data.weather
    ? background[data.weather[0].main]
    : "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)";

  const currentDate = new Date();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

  return (
    <div className="container" style={{ backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage:
            backgroundImage && backgroundImage.replace
              ? backgroundImage.replace("to right", "to top")
              : null,
        }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {loading ? (
          <div className="loading">
            <img src={loadingGif} alt="Loading..." />
          </div>
        ) : data.notFound ? (
          <div className="not-found"> Not Found 😒</div>
        ) : (
          <>
            <div className="weather">
              <img
                src={weatherImage}
                alt={data.weather ? data.weather[0].main : "Weather"}
              />
              <div className="weather-type">
                {data.weather ? data.weather[0].main : null}
              </div>
              <div className="temp">
                {data.main ? `${Math.floor(data.main.temp)}°C` : null}
              </div>
            </div>
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <div className="humidity">
              <div className="date-name">Humidity</div>
              <i className="fa-solid fa-droplet"></i>
              <div className="data">{data.main ? data.main.humidity : null}%</div>
            </div>
            <div className="wind">
              <div className="date-name">Wind Speed</div>
              <i className="fa-solid fa-wind"></i>
              <div className="data">
                {data.wind ? data.wind.speed : null} km/h
              </div>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default WeatherApp;
