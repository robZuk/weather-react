import React, { useState, useEffect } from "react";
import "./styles/main.scss";

import CurrentWeather from "./components/organisms/CurrentWeather";
import ForecastWeather from "./components/organisms/ForecastWeather";
import HightlightsWeather from "./components/organisms/HightlightsWeather";
import Search from "./components/organisms/Search";
import Footer from "./components/atoms/Footer";
import Spinner from "./components/atoms/Spinner";
import useFetch from "./hooks/useFetch";

import { userCurrentPosition } from "./services/geolocation";

function App() {
  const [temperatureType, setTemperatureType] = useState("celsius");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [showSearchingSection, setShowSearchingSection] = useState(false);

  const {
    data: dataCurrentWeather,
    loading,
    error,
  } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${window.env.API_KEY}`,
    {}
  );

  function weatherUserCity(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLocation({ lat, lon });
  }

  function renderUserPosition() {
    userCurrentPosition(weatherUserCity);
  }
  useEffect(() => {
    renderUserPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <section className="section1">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        ) : loading ? (
          <Spinner />
        ) : (
          <CurrentWeather
            data={dataCurrentWeather}
            temperatureType={temperatureType}
            renderUserPosition={renderUserPosition}
            setShowSearchingSection={setShowSearchingSection}
          />
        )}

        <Search
          showSearchingSection={showSearchingSection}
          setShowSearchingSection={setShowSearchingSection}
          setLocation={setLocation}
        />
      </section>
      <section className="section2">
        <ForecastWeather
          temperatureType={temperatureType}
          setTemperatureType={setTemperatureType}
          location={location}
        />
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error.message}
          </div>
        ) : loading ? (
          <Spinner />
        ) : (
          <HightlightsWeather data={dataCurrentWeather} />
        )}
        <Footer />
      </section>
    </div>
  );
}

export default App;
