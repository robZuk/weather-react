import React from "react";
import { Temperature } from "../atoms/Temperature";
import { Image } from "../atoms/Image";
import background from "../../assets/Cloud-background.png";
import { formatDate } from "../../services/formatDate";

function CurrentWeather({
  data,
  error,
  temperatureType,
  renderUserPosition,
  setShowSearchingSection,
}) {
  const { weekDay, monthDay, month } = formatDate(new Date());

  return (
    <div className="current-weather-section">
      <div
        className="inner-wrapper"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      {!error && (
        <>
          <button
            className="current-weather-section-search_button"
            onClick={() => setShowSearchingSection(true)}
          >
            Search for places
          </button>
          <button
            className="current-weather-section-location-icon"
            onClick={renderUserPosition}
          >
            <i className="fa-solid fa-location-crosshairs"></i>
          </button>
          <Image data={data} className="current-weather-section-image" />
          <p className="current-weather-section-temperature">
            <Temperature
              temp={data?.main.temp}
              temperatureType={temperatureType}
            />
          </p>
          <p className="current-weather-section-title">
            {data?.weather[0].main}
          </p>
          <p className="current-weather-section-date">
            Today &bull; {weekDay} {monthDay} {month}
          </p>
          <p className="current-weather-section-location">
            <i className="fa-solid fa-location-dot"> </i> {data?.name},{" "}
            {data?.sys.country}
          </p>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
