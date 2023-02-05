import { useState, useEffect } from "react";
import cityTimezones from 'city-timezones';
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState({
    "name": "Kolkata",
    "sys": {
      "country": "IN"
    },
    "weather": [{
      "main": "Clear"
    }],
    "wind": {
      "speed": 5.14
    },
    "main": {
      "temp": 25.97,
      "feels_like": 25.97,
      "pressure": 1012,
      "humidity": 53
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [isClickedSearch, setIsClickedSearch] = useState(false);
  const [handleChange, setHandleChange] = useState("");
  const [handleError, setHandleError] = useState(false);
  const [timeZoneName, setTimeZoneName] = useState("Asia/Kolkata");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [icon, setIcon] = useState("clear-day");

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!handleError) {
      const cityLookup = (isClickedSearch) ? cityTimezones.lookupViaCity(handleChange) : cityTimezones.lookupViaCity("Kolkata");
      const searchedCity = cityLookup.filter((city) => {
        return city.iso2 === data.sys.country;
      });
      const options = {
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timeZone: searchedCity[0].timezone
      };
      setTimeZoneName(searchedCity[0].timezone);
      setTime(new Intl.DateTimeFormat('en-US', options).format(date));
      const timerId = setInterval(refreshDate, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [data]);

  useEffect(() => {
    if (!handleError) {
      const options = {
        hour: 'numeric', minute: 'numeric',
        hour12: false,
        timeZone: timeZoneName
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(date));
    }
  }, [date]);

  function refreshDate() {
    setDate(new Date());
  }

  function handleIconChange(weather) {
    switch (weather.main) {
      case "Thunderstorm":
        if (weather.description === "thunderstorm with light rain" || weather.description === "thunderstorm with rain" || weather.description === "thunderstorm with heavy rain")
          setIcon("thunderstorms-rain");
        else
          setIcon("thunderstorms");
        break;
      case "Drizzle":
        setIcon("drizzle");
        break;
      case "Rain":
        setIcon("rain");
        break;
      case "Snow":
        if (weather.description === "Sleet")
          setIcon("sleet");
        else
          setIcon("snow");
        break;
      case "Clear":
        setIcon("clear-day");
        break;
      case "Clouds":
        if (weather.description === "scattered clouds" || weather.description === "few clouds")
          setIcon("cloudy");
        else
          setIcon("overcast");
        break;
      case "Mist":
        setIcon("mist");
        break;
      case "Smoke":
        setIcon("smoke");
        break;
      case "Ash":
        setIcon("smoke");
        break;
      case "Haze":
        setIcon("haze");
        break;
      case "Fog":
        setIcon("fog");
        break;
      case "Dust":
        setIcon("dust");
        break;
      case "Sand":
        setIcon("dust-wind");
        break;
      case "Squall":
        setIcon("wind");
        break;
      case "Tornado":
        setIcon("tornado");
        break;
    }
  }

  async function getLocation() {
    const url = `https://ipapi.co/json/`;
    const response = await fetch(url, {
      method: "GET"
    });
    if (response.ok) {
      const userData = await response.json();
      await handleSearch(userData.city);
      setIsLoading(false);
    } else {
      console.log("Failed to fetch data");
    }
  }

  async function handleSearch(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    const response = await fetch(url, {
      method: "GET"
    });
    if (response.ok && cityTimezones.lookupViaCity(location).length !== 0) {
      const newData = await response.json();
      setData(newData);
      handleIconChange(newData.weather[0]);
    } else {
      setHandleError(true);
    }
  }

  return (
    <>
      <Loader isVisible={isLoading} />
      <div
        className={`h-full w-full flex bg-center ${isLoading ? 'invisible' : 'visible'}`}
        style={{
          backgroundImage: `url("./src/assets/${data.weather[0].main.toLowerCase()}.jpg")`
        }}
      >
        <div className="flex flex-col place-content-center mx-auto font-josefin font-normal text-lg text-gray-200">
          <div className="place-content-evenly w-128 h-128 mb-12 flex flex-col rounded-xl glass-card">
            <div className="m-5 flex place-content-between">
              <h3 className="ml-5">{data.name}, {data.sys.country}</h3>
              <div className="flex">
                <span className="material-symbols-outlined text-base text-gray-300">schedule</span>
                <p className="mr-5 ml-1">{time}</p>
              </div>
            </div>
            <div className="m-5 flex flex-col justify-center">
              <img src={`https://basmilius.github.io/weather-icons/production/fill/all/${icon}.svg`} alt="weather icon" className="w-52 place-self-center" />
              <p className="place-self-center">{data.weather[0].main}</p>
            </div>
            <div className="m-5 flex place-content-between">
              <div className="ml-5">
                <div className="flex">
                  <span className="material-symbols-outlined text-gray-300">air</span>
                  <p className="ml-3">{Math.floor(data.wind.speed)} m/s</p>
                </div>
                <div className="flex">
                  <span className="material-symbols-outlined text-gray-300">water_drop</span>
                  <p className="ml-3">{data.main.humidity}%</p>
                </div>
                <div className="flex">
                  <span className="material-symbols-outlined text-gray-300">waves</span>
                  <p className="ml-3">{data.main.pressure} hPa</p>
                </div>
              </div>
              <div className="mr-5 flex flex-col">
                <h1 className="text-6xl">{Math.floor(data.main.temp)}°</h1>
                <p className="text-gray-300">Feels like {Math.floor(data.main.feels_like)}°</p>
              </div>
            </div>
          </div>
          <div
            className={`w-14 h-14 mx-auto flex glass-card place-content-center ${!isSearchDisabled ? "justify-between animate-expand" : "items-center cursor-pointer hover:scale-110"} rounded-full transition-transform ease-in-out delay-50 duration-300`}
            onClick={event => {
              setIsSearchDisabled(false);
            }}
          >
            <span
              className={`material-symbols-outlined text-3xl place-self-center ml-3 cursor-pointer ${!isSearchDisabled ? "visible relative" : "invisible absolute"}`}
            >home_pin</span>
            <input
              type="text"
              name="searchtext"
              placeholder="Search by city name."
              autoComplete="off"
              value={handleChange}
              className={`h-8 w-96 pl-2 bg-transparent place-self-center outline-none border-b-2 border-gray-500 focus:border-gray-300 ${handleError && "border-red-600 focus:border-red-600"} ${!isSearchDisabled ? "visible relative" : "invisible absolute"}`}
              onChange={event => {
                setHandleChange(event.target.value);
                setHandleError(false);
              }}
            />
            <span
              className={`material-symbols-outlined text-3xl place-self-center cursor-pointer ${!isSearchDisabled && "mr-3"} ${isSearchDisabled && "pointer-events-none"}`}
              onClick={event => {
                handleSearch(handleChange);
                setIsClickedSearch(true);
              }}
            >search</span>
          </div>
        </div >
      </div>
    </>
  );
}

export default App;
