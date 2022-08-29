function Temperature({ temp, temperatureType }) {
  const celsius = (temp - 275.15).toFixed(0);
  const fahrenheit = ((temp - 273.15) * 1.8 + 32).toFixed(0);

  return temperatureType === "celsius" ? (
    <>
      {celsius}
      <span>&deg;C</span>
    </>
  ) : (
    <>
      {fahrenheit}
      <span>&deg;F</span>
    </>
  );
}

export { Temperature };
