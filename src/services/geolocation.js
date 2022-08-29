const userCurrentPosition = (sucess) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sucess);
  } else alert("Geolocation is not supported by your browser");
};

export { userCurrentPosition };
