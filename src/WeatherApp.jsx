import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Pune",
    feelsLike: 23.18,
    humidity: 23,
    temp: 24.11,
    tempMax: 24.11,
    tempMin: 24.11,
    weather: "clear sky",
  });

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2>Weather App by AD</h2>
        <SearchBox updateInfo={updateInfo} />
        <InfoBox info={weatherInfo} />
      </div>
    </>
  );
}
