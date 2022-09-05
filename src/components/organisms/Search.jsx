import React, { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Spinner from "../atoms/Spinner";
import env from "react-dotenv";

function Search({
  showSearchingSection,
  setShowSearchingSection,
  setLocation,
}) {
  const [inputValue, setInputValue] = useState(" ");
  const [city, setCity] = useState(" ");

  let {
    data: searchedCities,
    loading,
    error,
  } = useFetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${
      env.API_KEY
    }`,
    {}
  );

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  function search(e) {
    e.preventDefault();
    setCity(e.target[0].value);
  }

  return (
    <>
      <div
        className="search-section show"
        style={{
          transform: showSearchingSection
            ? "translateX(0%)"
            : "translateX(-100%)",
          opacity: showSearchingSection ? 1 : 0.7,
        }}
      >
        <button
          className="search-section-close_button"
          onClick={() => {
            setShowSearchingSection(false);
            setInputValue("");
            setCity(" ");
          }}
        >
          &#10005;
        </button>
        <form className="search-section-form" onSubmit={search}>
          <input
            value={inputValue}
            name="search"
            onChange={onChange}
            type="search"
            style={{ fontFamily: "Raleway, FontAwesome" }}
            className="search-section-form-input fa"
            placeholder="&#xF002;   search location"
          />
          <button className="search-section-form-button">Search</button>
        </form>
        <ul className="search-section-list">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          ) : loading ? (
            <Spinner />
          ) : (
            searchedCities?.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  setShowSearchingSection(false);
                  setLocation({ lat: city.lat, lon: city.lon });
                  searchedCities = [];
                  setInputValue(" ");
                  setCity(" ");
                }}
              >
                {`${city.name}, ${city.country}`}

                <i className="fa-solid fa-angle-right"></i>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="search-section-background"></div>`
    </>
  );
}

export default Search;
