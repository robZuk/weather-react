import React, { useRef } from "react";
import { Image } from "../atoms/Image";
import { Temperature } from "../atoms/Temperature";
import { formatDate } from "../../services/formatDate";
import Spinner from "../atoms/Spinner";
import useFetch from "../../hooks/useFetch";
import env from "react-dotenv";

function ForecastWeather({ temperatureType, setTemperatureType, location }) {
  const celsiusIcon = useRef();
  const fahrenheitIcon = useRef();

  const {
    data: dataForecast5Day,
    loading,
    error,
  } = useFetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${env.API_KEY}`,
    {}
  );

  function toogleIcons(icon) {
    if (!icon.current.classList.contains("active")) {
      fahrenheitIcon.current.classList.toggle("active");
      celsiusIcon.current.classList.toggle("active");
    }
  }
  function convertToFahrenheit() {
    setTemperatureType("fahrenheit");
  }
  function convertToCelsius() {
    setTemperatureType("celsius");
  }

  //removed current day
  const today = new Date().toISOString().slice(0, 10);
  const forecast5DayData = dataForecast5Day?.list
    .map((item) => {
      return { ...item, dt_txt: item.dt_txt.slice(0, 10) };
    })
    .filter((item, index) => item.dt_txt !== today);

  //grouping data by date
  const groupByDate = forecast5DayData?.reduce((prev, current) => {
    const { dt_txt } = current;
    prev[dt_txt] = prev[dt_txt] || [];
    prev[dt_txt].push(current);
    return prev;
  }, {});

  return (
    <>
      <div className="icons-wrapper">
        <button
          className="celscius-icon active"
          ref={celsiusIcon}
          onClick={() => {
            convertToCelsius();
            toogleIcons(celsiusIcon);
          }}
        >
          &deg;C
        </button>
        <button
          className="fahrenheit-icon"
          ref={fahrenheitIcon}
          onClick={() => {
            convertToFahrenheit();
            toogleIcons(fahrenheitIcon);
          }}
        >
          &deg;F
        </button>
      </div>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="forecast-weather-section">
          {Object.keys(groupByDate !== undefined && groupByDate).map((key) => (
            <div className="forecast-weather-section-day" key={key}>
              {key === formatDate(key).tomorrow.toISOString().slice(0, 10) ? (
                <div className="-title">Tomorrow</div>
              ) : (
                <div className="-title">
                  {formatDate(key).weekDay} {formatDate(key).monthDay}{" "}
                  {formatDate(key).month}
                </div>
              )}
              <Image
                data={
                  groupByDate[key][3]
                    ? groupByDate[key][3]
                    : groupByDate[key][groupByDate[key].length - 1]
                }
              />
              <div className="forecast-weather-section-day-temperatures">
                <p>
                  <Temperature
                    temp={Math.min(
                      ...groupByDate[key].map((item) => item.main.temp_min)
                    )}
                    temperatureType={temperatureType}
                  />
                </p>
                <p>
                  <Temperature
                    temp={Math.max(
                      ...groupByDate[key].map((item) => item.main.temp_max)
                    )}
                    temperatureType={temperatureType}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ForecastWeather;
