import { createContext, useContext, useEffect, useState } from "react";
import DataContext from "./dataContext";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [inputSearch, setInputSearch] = useState("london");
  
  const {updateWeatherInfo}=useContext(DataContext)

  const getDataByCity = async (city) => {
    const API_KEY = "eaa81cef3e751d0ae1fd812e9323c09d";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sp`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=sp`;

    try {
      const [responseWeather, responseForecast] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl),
      ]);
      if (responseWeather.ok && responseForecast.ok) {
        const resultWeather = await responseWeather.json();
        const resultForecast = await responseForecast.json();

        updateWeatherInfo(resultWeather, resultForecast);
        setErrorMessage("");
      } else {
        alert("ciudad no encontrada");
        setErrorMessage("ciudad no encontrada");
      }
    } catch (error) {
      setErrorMessage("ciudad no encontrada");
    }
  };

  useEffect(() => {
    getDataByCity(inputSearch)
  }, [inputSearch]);
  
  return (
    <SearchContext.Provider value={{ inputSearch,getDataByCity }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
