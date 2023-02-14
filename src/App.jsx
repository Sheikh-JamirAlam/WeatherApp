import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState({
    name: "London",
    sys: {
      country: "GB",
    },
    weather: [
      {
        main: "Clear",
      },
    ],
    wind: {
      speed: 1.03,
    },
    main: {
      temp: 7.37,
      feels_like: 7.37,
      pressure: 1037,
      humidity: 70,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [handleChange, setHandleChange] = useState("");
  const [handleError, setHandleError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [offsetSeconds, setOffsetSeconds] = useState(0);
  const [icon, setIcon] = useState("clear-day");
  const [backgroundImage, setBackgroundImage] = useState("clear");

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!handleError) {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(date));
      const timerId = setInterval(refreshDate, 1000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [data]);

  useEffect(() => {
    if (!handleError) {
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(date));
    }
  }, [date]);

  function refreshDate() {
    getTimeZone(offsetSeconds);
  }

  function handleIconChange(weather) {
    switch (weather.main) {
      case "Thunderstorm":
        if (weather.description === "thunderstorm with light rain" || weather.description === "thunderstorm with rain" || weather.description === "thunderstorm with heavy rain")
          setIcon("thunderstorms-rain");
        else setIcon("thunderstorms");
        setBackgroundImage("thunderstorm");
        break;
      case "Drizzle":
        setIcon("drizzle");
        setBackgroundImage("drizzle");
        break;
      case "Rain":
        setIcon("rain");
        setBackgroundImage("rain");
        break;
      case "Snow":
        if (weather.description === "Sleet") setIcon("sleet");
        else setIcon("snow");
        setBackgroundImage("snow");
        break;
      case "Clear":
        setIcon("clear-day");
        setBackgroundImage("clear");
        break;
      case "Clouds":
        if (weather.description === "scattered clouds" || weather.description === "few clouds") setIcon("cloudy");
        else setIcon("overcast");
        setBackgroundImage("clouds");
        break;
      case "Mist":
        setIcon("mist");
        setBackgroundImage("haze");
        break;
      case "Smoke":
        setIcon("smoke");
        setBackgroundImage("fog");
        break;
      case "Ash":
        setIcon("smoke");
        setBackgroundImage("fog");
        break;
      case "Haze":
        setIcon("haze");
        setBackgroundImage("haze");
        break;
      case "Fog":
        setIcon("fog");
        setBackgroundImage("fog");
        break;
      case "Dust":
        setIcon("dust");
        setBackgroundImage("haze");
        break;
      case "Sand":
        setIcon("dust-wind");
        setBackgroundImage("haze");
        break;
      case "Squall":
        setIcon("wind");
        setBackgroundImage("haze");
        break;
      case "Tornado":
        setIcon("tornado");
        setBackgroundImage("fog");
        break;
    }
  }

  async function getLocation() {
    const success = async (position) => {
      await getLocationName(position.coords.latitude, position.coords.longitude);
      setIsLoading(false);
    };
    const error = () => {
      console.log("Unable to retrieve location.");
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Your browser does not support location tracking, or permission is denied.");
    }
  }

  async function getLocationName(lat, lon) {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_API_KEY}`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const newData = await response.json();
      await getTimeZone(lat, lon);
      await handleSearch(newData[0].name);
    }
  }

  async function handleSearch(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const newData = await response.json();
      await getTimeZone(newData.timezone);
      handleIconChange(newData.weather[0]);
      setData(newData);
    } else {
      setHandleError(true);
    }
  }

  async function getTimeZone(offset) {
    setOffsetSeconds(offset);
    const date = new Date();
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    date.setSeconds(date.getSeconds() + offset);
    setDate(date);
  }

  return (
    <>
      <Loader isVisible={isLoading} />
      <div
        className={`h-full w-full flex bg-center bg-cover ${isLoading ? "invisible" : "visible"}`}
        style={{
          backgroundImage: `url("./assets/${backgroundImage}.jpg")`,
        }}
      >
        <div className="flex flex-col place-content-center mx-auto font-josefin font-normal text-base md:text-lg text-gray-200">
          <div className="place-content-evenly w-72 h-96 md:w-128 md:h-128 mb-12  flex flex-col rounded-xl glass-card">
            <div className="m-3 md:m-5 flex place-content-between">
              <h3 className="ml-3 md:ml-5">
                {data.name}, {data.sys.country}
              </h3>
              <div className="flex">
                <span className="material-symbols-outlined text-base text-gray-300">schedule</span>
                <p className="mr-3 md:mr-5 ml-1">{time}</p>
              </div>
            </div>
            <div className="m-3 md:m-5 flex flex-col justify-center">
              <img src={`https://basmilius.github.io/weather-icons/production/fill/all/${icon}.svg`} alt="weather icon" className="w-44 md:w-52 place-self-center" />
              <p className="place-self-center">{data.weather[0].main}</p>
            </div>
            <div className="m-3 md:m-5 flex place-content-between">
              <div className="ml-3 md:ml-5">
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
              <div className="mr-3 md:mr-5 flex flex-col">
                <h1 className="text-5xl md:text-6xl">{Math.floor(data.main.temp)}°</h1>
                <p className="text-gray-300">Feels like {Math.floor(data.main.feels_like)}°</p>
              </div>
            </div>
          </div>
          <div
            className={`w-14 h-14 mx-auto flex glass-card place-content-center ${
              !isSearchDisabled ? "justify-between animate-expand_mobile md:animate-expand" : "items-center cursor-pointer hover:scale-110"
            } rounded-full transition-transform ease-in-out delay-50 duration-300`}
            onClick={(event) => {
              setIsSearchDisabled(false);
            }}
          >
            <span
              className={`material-symbols-outlined text-3xl place-self-center ml-1 md:ml-3 cursor-pointer ${!isSearchDisabled ? "visible relative" : "invisible absolute"}`}
              onClick={(event) => {
                getLocation();
                setHandleChange("");
                setHandleError(false);
              }}
            >
              home_pin
            </span>
            <input
              type="text"
              name="searchtext"
              placeholder="Search by city name."
              autoComplete="off"
              value={handleChange}
              className={`h-8 w-52 md:w-96 pl-2 bg-transparent place-self-center outline-none border-b-2 border-gray-500 focus:border-gray-300 ${
                handleError && "border-red-600 focus:border-red-600"
              } ${!isSearchDisabled ? "visible relative" : "invisible absolute"}`}
              onChange={(event) => {
                setHandleChange(event.target.value);
                setHandleError(false);
              }}
            />
            <span
              className={`material-symbols-outlined text-3xl place-self-center cursor-pointer ${!isSearchDisabled && "mr-1 md:mr-3"} ${isSearchDisabled && "pointer-events-none"}`}
              onClick={async (event) => {
                await handleSearch(handleChange);
              }}
            >
              search
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
