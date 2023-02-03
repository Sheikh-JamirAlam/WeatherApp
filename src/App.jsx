import { useState, useEffect } from "react";

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
  const [isClickedSearch, setIsClickedSearch] = useState(false);
  const [handleChange, setHandleChange] = useState("");
  const [handleError, setHandleError] = useState(false);
  /*useEffect(() => {
    handleSearch("Kolkata");
  }, []);*/

  async function handleSearch(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    const response = await fetch(url, {
      method: "GET"
    });
    if (response.ok) {
      const newData = await response.json();
      setData(newData);
    } else {
      setHandleError(true);
    }
  }

  return (
    <div className="flex flex-col place-content-center mx-auto font-josefin font-normal text-lg text-gray-200">
      <div className="place-content-evenly w-128 h-128 mb-12 flex flex-col rounded-xl glass-card">
        <div className="m-5 flex place-content-between">
          <h3 className="ml-5">{data.name}, {data.sys.country}</h3>
          <div className="flex">
            <span className="material-symbols-outlined text-base text-gray-300">schedule</span>
            <p className="mr-5 ml-1">00:13</p>
          </div>
        </div>
        <div className="m-5 flex flex-col justify-center">
          <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" alt="weather icon" className="w-52 place-self-center" />
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
      <div className={`w-14 h-14 mx-auto flex glass-card place-content-center ${isClickedSearch ? "justify-between" : "items-center cursor-pointer"} rounded-full transition-transform ease-in-out delay-50 ${!isClickedSearch && "hover:scale-110"} duration-300 ${isClickedSearch && "animate-expand"}`}>
        <span className={`material-symbols-outlined text-3xl place-self-center ml-3 cursor-pointer ${isClickedSearch ? "visible relative" : "invisible absolute"}`}>home_pin</span>
        <input
          type="text"
          name="searchtext"
          placeholder="Search by city name."
          autoComplete="off"
          value={handleChange}
          className={`h-8 w-96 pl-2 bg-transparent place-self-center outline-none border-b-2 border-gray-500 focus:border-gray-300 ${handleError && "border-red-600 focus:border-red-600"} ${isClickedSearch ? "visible relative" : "invisible absolute"}`}
          onChange={event => {
            setHandleChange(event.target.value);
            setHandleError(false);
          }}
        />
        <span
          className={`material-symbols-outlined text-3xl place-self-center cursor-pointer ${isClickedSearch && "mr-3"}`}
          onClick={event => {
            if (isClickedSearch) {
              handleSearch(handleChange);
            }
            setIsClickedSearch(true);
          }}
        >search</span>
      </div>
    </div >
  );
}

export default App;
