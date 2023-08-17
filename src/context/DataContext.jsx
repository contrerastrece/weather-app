import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);

  const updateWeatherInfo = (newWeatherInfo,newForescastInfo) => {
    setWeatherInfo(newWeatherInfo);
    setForecastInfo(newForescastInfo);
  };

  

  return (
    // <DataContext.Provider value={dataWeather}>{children}</DataContext.Provider>
    <DataContext.Provider value={{ weatherInfo, updateWeatherInfo,forecastInfo }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
