import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { getWeatherByCity } from './WeatherAPI';

const MyComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (cityName) => {
    const data = await getWeatherByCity(cityName);
    if (data) {
      setWeatherData(data);
    }
  };

  const handleGetWeather = async () => {
    const cityName = 'London'; // Substitua 'London' pelo nome da cidade desejada
    await fetchWeather(cityName);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dados meteorológicos:</Text>
      {weatherData && (
        <View>
          <Text>Temperatura: {weatherData.main.temp}</Text>
          <Text>Pressão: {weatherData.main.pressure}</Text>
          <Text>Umidade: {weatherData.main.humidity}</Text>
          {/* Adicione mais informações do tempo conforme necessário */}
        </View>
      )}
      <Button title="Obter Clima" onPress={handleGetWeather} />
    </View>
  );
};

export default MyComponent;
