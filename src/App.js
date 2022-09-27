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
import { toast } from "react-toastify";

function App() {
  const [temperatureType, setTemperatureType] = useState("celsius");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [showSearchingSection, setShowSearchingSection] = useState(false);

  const {
    data: dataCurrentWeather,
    loading,
    error,
  } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${location?.lon}&appid=${process.env.REACT_APP_API_KEY}`,
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
    error &&
      toast.error(error.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="App">
      <section className="section1">
        {loading ? (
          <Spinner />
        ) : (
          <CurrentWeather
            data={dataCurrentWeather}
            error={error}
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
        {loading ? (
          <Spinner />
        ) : (
          <HightlightsWeather data={dataCurrentWeather} error={error} />
        )}
        <Footer />
      </section>
    </div>
  );
}

export default App;
