import React, { useContext, useEffect, useState } from "react";
import location from "../assets/img/location.svg";
import gps from "../assets/img/gps.svg";
import shower from "../assets/img/10d.png";
import clouds from "../assets/img/Cloud-background.png";
import DataContext from "../context/dataContext";
import WeatherSearch from "../components/WeatherSearch";
import './Sidebar.css';
import { useWeather } from "../context/WeatherContext";

const Sidebar = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // const {weatherInfo, updateWeatherInfo} = useContext(DataContext);
  
  const {clima:weatherInfo, setUbicacion, setBuscarPorCoordenadas } = useWeather();

  // console.log(clima,ubicacion)

  // console.log(weatherInfo)
  const API_KEY = "eaa81cef3e751d0ae1fd812e9323c09d";

  const getWeatherDataByCoords = async (lat,lon) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}&units=metric&lang=sp`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=sp`
    try {
      const [responseWeather,responseForecast ]= await Promise.all([fetch(weatherUrl), fetch(forecastUrl)]);
      const resultWeather = await responseWeather.json();
      const resultForecast = await responseForecast.json();

      updateWeatherInfo(resultWeather,resultForecast);

    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setLatitude(latitude);
          // setLongitude(longitude);
          // getWeatherDataByCoords(latitude,longitude)
          setUbicacion({lat:latitude,lon:longitude});
          setBuscarPorCoordenadas(true)
        },
        (error) => {
         // Manejar errores, por ejemplo, si el usuario niega la autorización
         console.error("Error al obtener la ubicación:", error.message);
         if(error.code===1){
           alert("El acceso del GPS fue denegado")
         }else{
           console.error("Error al obtener la ubicacion "+error.message)
         }
        }
      );
    }
  };


  useEffect(() => {
    if (latitude && longitude) {
      // getWeatherDataByCoords(latitude,longitude);
      setUbicacion({lat:latitude,lon:longitude});
      setBuscarPorCoordenadas(ubicacion)
    }
  }, [latitude, longitude]);

  
  const toggleWeatherSearch = () => {    
    setIsOpen(!isOpen);
  };

  const getFormatteDate = () => { 
    const options = { weekday: "short", day: "numeric", month: "short" };
    const currentDate = new Date();
    return currentDate.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="h-[100dvh] w-full md:w-[25rem] flex flex-col justify-between items-center bg-[#1E213A] p-3 overflow-hidden ">
      <div className="w-full h-[2.5rem] flex flex-row justify-between">
        <button
          className=" bg-[#6E707A] px-3 py-3 text-[#E7E7EB] leading-[0rem]"
          onClick={toggleWeatherSearch}
        >
          Search for Places
        </button>
        <button className="">
          <img
            src={location}
            alt="img-location"
            className="h-[2.5rem]"
            onClick={handleLocation}
          />
        </button>
      </div>
      <div className="flex items-center justify-center w-[100dvw] md:w-[25rem] h-[20rem] weather-container">
        <div className="container-cloudes">
          <div
            className="cloudes"
            
          ></div>
          <div
            className="cloudes"
            
          ></div>
        </div>
        <img
          src={weatherInfo?.weather[0]?.icon?`https://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}@4x.png` : shower}
          alt={`${weatherInfo?.weather[0].description}`||""}
          className="w-[9.5rem] object-contain opacity-100"
        />
      </div>
      <div className="text-[#88869D] flex flex-col text-center gap-[1rem]">
        <div className="temperature text-[#E7E7EB] text-[9rem] leading-[5rem]">
          {Math.round(weatherInfo?.main?.temp) || "15"}{" "}
          <span className="text-[3rem] text-[#A09FB1]">°C</span>
        </div>
        <div className="text-[2.5rem] ">
          {weatherInfo?.weather[0]?.description || "Shower"}
        </div>
        <p className="date">
          Today · <span>{getFormatteDate()}</span>
        </p>
        <div className="flex items-center justify-center mb-[2rem]">
          <img src={gps} alt=""/>
          <p>{weatherInfo?.name || "Helsinki"}, {weatherInfo?.sys.country}</p>
        </div>
      </div>
      {isOpen && <WeatherSearch onClose={toggleWeatherSearch}/>}
    </div>
  );
};

export default Sidebar;
