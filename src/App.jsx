import { createContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
// import _data from "./data/data";
import logo from "./assets/logo.png";

function App() {
  const [city, setCity] = useState("Gwalior");
  const [data, setData] = useState([]);
  const [placeName, setPlaceName] = useState("");
  const [isToday, setIsToday] = useState(false);
  const [tempUnitCel, setTempUnitCel] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(data);
    // console.log("gwaliorForeCastData : ", gwaliorForeCastData);
  }, []);

  async function fetchData() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=5d64a81297eb4de4834102715252212&q=${city}&days=7&aqi=yes&alerts=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaceName({
          cityName: data?.location?.name,
          countryName: data?.location?.country,
        });
        setData(data?.forecast?.forecastday);
      });
  }

  function onSearchFunc() {
    // setSearching(true);
    console.log("searching");
    setData([]);
    fetchData();
  }

  console.log(data);
  if (data.length < 1) {
    return <h1>Loading...</h1>;
  }
  console.log(placeName);

  return (
    <div className="flex h-1/2 lg:flex max-sm:flex-col lg:w-4/5 text-center ">
      <div className="w-1/3 max-sm:w-full h-auto bg-fuchsia-50 p-0 lg:rounded-l-3xl">
        <LeftSide
          city={city}
          todayData={data[0]}
          onCityChange={(newCity) => {
            console.log(newCity, typeof newCity);
            console.log(newCity.split());
            setCity(
              newCity
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .trim()
            );
          }}
          tempUnitCel={tempUnitCel}
          onUserSearch={onSearchFunc}
          place={placeName}
        />
      </div>
      <div className="w-2/3  max-sm:w-full h-auto bg-fuchsia-100 lg:rounded-r-3xl">
        <RightSide
          sevenDaysData={data}
          onTempUnitChange={(value) => setTempUnitCel(value)}
          day={isToday}
          onDayChange={(val) => setIsToday(val)}
          tempUnitCel={tempUnitCel}
        />
      </div>
    </div>
  );
}

export default App;
