import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import { getWeatherByCity } from './WeatherAPI';

export default function App() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleEnableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationEnabled(true);
    } else {
      alert('Permissão para acessar a localização negada.');
    }
  };

  const handleGetWeather = async () => {
    const cityName = 'London'; // Substitua 'London' pelo nome da cidade desejada
    const data = await getWeatherByCity(cityName);
    setWeatherData(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exemplo de Ativação de Localização</Text>
      {locationEnabled && location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
      <Button
        title={locationEnabled ? 'Localização Ativada' : 'Ativar Localização'}
        onPress={handleEnableLocation}
        disabled={locationEnabled}
      />
      <Button
        title="Obter Clima"
        onPress={handleGetWeather}
        disabled={!locationEnabled || !location}
      />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text>Temperatura: {weatherData.main.temp}</Text>
          <Text>Pressão: {weatherData.main.pressure}</Text>
          <Text>Umidade: {weatherData.main.humidity}</Text>
          {/* Adicione mais informações do tempo conforme necessário */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  weatherContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});
