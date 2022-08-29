//cities position
// const coordinatesByLocation = async (city) => {
//   try {
//     const result = await axios(
//       `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${5}&appid=${
//         window.env.API_KEY
//       }`
//     );
//     const { data } = await result;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

//user city position

const userCurrentPosition = (sucess) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sucess);
  } else alert("Geolocation is not supported by your browser");
};

export { userCurrentPosition };
