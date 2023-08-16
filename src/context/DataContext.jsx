import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  // const [data, setData] = useState({});
  // const getDataByCity = async (city) => {
  //   const API_KEY = "eaa81cef3e751d0ae1fd812e9323c09d";
  //   let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sp`;

  //   const response = await fetch(urlWeather);
  //   const result = await response.json();
  //   setData(result);
  // };
  // const dataWeather = { data, getDataByCity };

  const updateWeatherInfo = (newWeatherInfo) => {
    setWeatherInfo(newWeatherInfo);
  };

  return (
    // <DataContext.Provider value={dataWeather}>{children}</DataContext.Provider>
    <DataContext.Provider value={{ weatherInfo, updateWeatherInfo }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
