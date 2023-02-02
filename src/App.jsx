
function App() {

  return (
    <div className="place-content-evenly w-128 h-128 m-auto backdrop-blur backdrop-saturate-100 font-josefin font-normal text-lg text-gray-200 flex flex-col rounded-xl border-solid border border-fadedborder bg-card shadow-card">
      <div className="m-5 flex place-content-between">
        <h3 className="ml-5">Kolkata, IN</h3>
        <div className="flex">
          <span className="material-symbols-outlined text-base text-gray-300">schedule</span>
          <p className="mr-5 ml-1">00:13</p>
        </div>
      </div>
      <div className="m-5 flex flex-col justify-center">
        <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" alt="weather icon" className="w-52 place-self-center" />
        <p className="place-self-center">Clear Sky</p>
      </div>
      <div className="m-5 flex place-content-between">
        <div className="ml-5">
          <div className="flex">
            <span className="material-symbols-outlined text-gray-300">air</span>
            <p className="ml-3">7 m/s</p>
          </div>
          <div className="flex">
            <span className="material-symbols-outlined text-gray-300">water_drop</span>
            <p className="ml-3">68%</p>
          </div>
          <div className="flex">
            <span className="material-symbols-outlined text-gray-300">waves</span>
            <p className="ml-3">1023 hPa</p>
          </div>
        </div>
        <div className="mr-5 flex flex-col">
          <h1 className="text-6xl">20°</h1>
          <p className="text-gray-300">Feels like 21°</p>
        </div>
      </div>
    </div>
  );
}

export default App;
