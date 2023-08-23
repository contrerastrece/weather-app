import { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();

export function useWeather() {
  return useContext(WeatherContext);
}

export function WeatherProvider({ children }) {
  const [clima, setClima] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [ubicacion, setUbicacion] = useState(null); // Para almacenar coordenadas o nombre de la ciudad
  const [buscarPorCoordenadas, setBuscarPorCoordenadas] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // Lógica para obtener el clima basado en la ubicación o la ciudad
  useEffect(() => {
    async function obtenerClima() {
      try {
        let url = '';
        let urlForecast = '';
        
        const TU_API_KEY = "eaa81cef3e751d0ae1fd812e9323c09d";
        if (ubicacion) {
          if (buscarPorCoordenadas) {
            const { lat, lon } = ubicacion;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${TU_API_KEY}&units=metric&lang=sp`;
            urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${TU_API_KEY}&units=metric&lang=sp`;
            
          } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${TU_API_KEY}&units=metric&lang=sp`;
            urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&appid=${TU_API_KEY}&units=metric&lang=sp`;
          }
        } else {
          // Si no hay ubicación seleccionada, mostrar información de una ciudad por defecto
          url = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${TU_API_KEY}&units=metric&lang=sp`;
          urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=london&appid=${TU_API_KEY}&units=metric&lang=sp`;
        }


        const [responseWeather,responseForecast] = await Promise.all([fetch(url),fetch(urlForecast)]);
        const dataWeather = await responseWeather.json();
        const dataForecast = await responseForecast.json();
        setClima(dataWeather);
        setForecast(dataForecast);
        setIsLoading(false)
      } catch (error) {
        console.error('Error al obtener el clima:', error);
      }
    }

    obtenerClima();
  }, [ubicacion, buscarPorCoordenadas]);

  return (
    <WeatherContext.Provider value={{isLoading, clima,forecast, ubicacion, setUbicacion, setBuscarPorCoordenadas }}>
      {children}
    </WeatherContext.Provider>
  );
}
