import React from "react";

function HightlightsWeather({ data }) {
  return (
    <div className="hightlight-weather-section">
      <h2 className="hightlight-weather-section-title">Today's Hightlights</h2>
      <section className="hightlight-weather-section-wrapper">
        <div className="hightlight-weather-section-wrapper-wind-status">
          <p className="hightlight-weather-section-wrapper-wind-status-title">
            Wind Status
          </p>
          <p className="hightlight-weather-section-wrapper-wind-status-value">
            {data?.wind.speed.toFixed(0)}
            <span> mph</span>
          </p>
          <p className="hightlight-weather-section-wrapper-wind-status-direction">
            <i
              className="fa-solid fa-location-arrow"
              style={{ transform: `rotate(${data?.wind.deg - 45}deg)` }}
            ></i>{" "}
            WSW
          </p>
        </div>
        <div className="hightlight-weather-section-wrapper-humidity">
          <p className="hightlight-weather-section-wrapper-humidity-title">
            Humidity
          </p>
          <p className="hightlight-weather-section-wrapper-humidity-value">
            {data?.main.humidity}
            <span> %</span>
          </p>

          <progress
            className="hightlight-weather-section-wrapper-humidity-progress"
            id="file"
            max="100"
            value={data?.main.humidity}
          ></progress>
          <dl className="hightlight-weather-section-wrapper-humidity-progress-description">
            <dt>0</dt>
            <dt>50</dt>
            <dt>100</dt>
            <dd>%</dd>
          </dl>
        </div>
        <div className="hightlight-weather-section-wrapper-humidity-visibility">
          <p className="hightlight-weather-section-wrapper-humidity-visibility-title">
            Visibility
          </p>
          <p className="hightlight-weather-section-wrapper-humidity-visibility-value">
            {(data?.visibility * 0.000621371192).toFixed(1)} <span>miles</span>
          </p>
        </div>
        <div className="hightlight-weather-section-wrapper-humidity-airpressure">
          <p className="hightlight-weather-section-wrapper-humidity-airpressure-title">
            Air Pressure
          </p>
          <p className="hightlight-weather-section-wrapper-humidity-airpressure-value">
            {data?.main.pressure}
            <span> mb</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default HightlightsWeather;
