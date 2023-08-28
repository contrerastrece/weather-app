import React, {useEffect, useState } from "react";
import location from "../assets/img/location.svg";
import gps from "../assets/img/gps.svg";
import shower from "../assets/img/10d.png";
import WeatherSearch from "../components/WeatherSearch";
import "./Sidebar.css";
import { useWeather } from "../context/WeatherContext";
import Skeleton,{ SkeletonTheme } from "react-loading-skeleton";

const Sidebar = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const {
    isLoading,
    clima: weatherInfo,
    setUbicacion,
    setBuscarPorCoordenadas,
  } = useWeather();

// console.log(weatherInfo)
  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setLatitude(latitude);
          // setLongitude(longitude);
          // getWeatherDataByCoords(latitude,longitude)
          setUbicacion({ lat: latitude, lon: longitude });
          setBuscarPorCoordenadas(true);
        },
        (error) => {
          // Manejar errores, por ejemplo, si el usuario niega la autorización
          console.error("Error al obtener la ubicación:", error.message);
          if (error.code === 1) {
            alert("El acceso del GPS fue denegado");
          } else {
            console.error("Error al obtener la ubicacion " + error.message);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      setUbicacion({ lat: latitude, lon: longitude });
      setBuscarPorCoordenadas(true);
    }
  }, [latitude, longitude]);

  const toggleWeatherSearch = () => {
    setIsOpen(!isOpen);
  };

  const getFormatteDate = (dt,timezone) => {
    const date= new Date((dt+timezone) *1000);
 
    return date.toUTCString().slice(0, -7);;

  };

  const Loader = () => {
    return (
      <SkeletonTheme baseColor="#6E707A" highlightColor="rgba(232, 232, 232, 0.25)">
        <div className="w-full h-[2.5rem] flex flex-row justify-between">
            <button
              className=" bg-[#6E707A] px-3 py-3 text-[#E7E7EB] leading-[0rem]"
            >
              Search for Places
            </button>
            <button className="">
              <img
                src={location}
                alt="img-location"
                className="h-[2.5rem]"
              />
            </button>
          </div>
          <div className="flex items-center justify-center w-[100dvw] md:w-[25rem] h-[20rem] weather-container">
            <div className="container-cloudes">
              <div className="cloudes"></div>
              <div className="cloudes"></div>
            </div>
            <Skeleton width={"9.5rem"} height={"9.5rem"} duration={0.5}/>
          </div>
          <div className="text-[#88869D] flex flex-col text-center gap-[1rem]">
            <div className="temperature text-[#E7E7EB] text-[9rem] leading-[5rem]">
              <Skeleton width={"7rem"} height={"5rem"} duration={0.5}/>
            </div>
            <div className="text-[2.5rem] ">
              <Skeleton width={"8rem"} height={"2.5rem"} duration={0.5}/>
            </div>
            <p className="date">
              <Skeleton width={"100%"} height={"0.75rem"} duration={0.5}/>
            </p>
            <div className="flex items-center justify-center mb-[2rem]">
                <Skeleton width={"5rem"} height={"0.75rem"} duration={0.5}/>
            </div>
          </div>
      </SkeletonTheme>
    );
  };

  return (
    <div className="h-[100dvh] w-full md:w-[25rem] flex flex-col justify-between items-center bg-[#1E213A] p-5 pt-10 overflow-hidden md:overflow-visible ">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              <div className="cloudes"></div>
              <div className="cloudes"></div>
            </div>
            <img
              src={
                weatherInfo?.weather[0]?.icon
                  ? `https://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}@4x.png`
                  : shower
              }
              alt={`${weatherInfo?.weather[0].description}` || ""}
              className="w-[9.5rem] object-contain opacity-100"
            /> 
          </div>
          <div className="text-[#88869D] flex flex-col text-center gap-[1rem]">
            <div className="temperature text-[#E7E7EB] text-[9rem] leading-[5rem]">
              {Math.round(weatherInfo?.main?.temp)}
              <span className="text-[3rem] text-[#A09FB1]">°C</span>
            </div>
            <div className="text-[2.5rem] ">
              {weatherInfo?.weather[0]?.description}
            </div>
            <p className="date">
              Today · <span>{getFormatteDate(weatherInfo.dt,weatherInfo.timezone)}</span>
            </p>
            <div className="flex items-center justify-center mb-[2rem]">
              <img src={gps} alt="" />
              <p>
                {weatherInfo?.name}, {weatherInfo?.sys.country}
              </p>
            </div>
          </div>
        </>
      )}
      
       <WeatherSearch onClose={toggleWeatherSearch} isOpen={isOpen} />
    </div>
  );
};

export default Sidebar;
