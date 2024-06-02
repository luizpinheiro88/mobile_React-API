import axios from 'axios';

const openWeatherMapKey = '838f9ce939b09c432fb53c8842f77871';

const weatherAPI = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: openWeatherMapKey,
  },
});

export const getWeatherByCity = async (cityName) => {
  try {
    const response = await weatherAPI.get(`weather?q=${cityName}`);
    const weatherData = response.data;
    return {
      main: {
        temp: weatherData.main.temp,
        pressure: weatherData.main.pressure,
        humidity: weatherData.main.humidity,
      },
      weather: [
        {
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        },
      ],
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
