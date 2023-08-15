import React, { useContext, useEffect, useState } from "react";
import location from "../assets/img/location.svg";
import gps from "../assets/img/gps.svg";
import shower from "../assets/img/Shower.png";
import clouds from "../assets/img/Cloud-background.png";
import DataContext from "../context/dataContext";
import WeatherSearch from "../components/WeatherSearch";

const Sidebar = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useContext(DataContext);

  const getWeatherData = async () => {
    const API_KEY = "eaa81cef3e751d0ae1fd812e9323c09d";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}&units=metric&lang=sp`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setWeatherData(result);
    } catch (error) {
      console.error("Error al obtener datos del clima:", error);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error al obtener la Ubicacion:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData();
    }
  }, [latitude, longitude]);

  const toggleWeatherSearch = () => {
    setIsOpen(!isOpen);
  };

const getFormatteDate=()=>{
  const options={weekday:'short',day:'numeric',month:'short'}
  const currentDate=new Date();
  return currentDate.toLocaleDateString('en-US',options)
}
  return (
    <div className="h-[100dvh] w-full md:w-[25rem] flex flex-col justify-between items-center bg-[#1E213A] p-3 border overflow-hidden ">
      <div className="w-full h-[2.5rem] flex flex-row justify-between overflow-hidden">
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
      <div className="flex items-center justify-center w-[100dvw] md:w-[25rem] h-[20rem] relative overflow-hidden">
        <div
          className="bg-center bg-no-repeat bg-contain w-[35rem] h-[20rem] absolute border "
          style={{ backgroundImage: `url(${clouds})`, opacity: "0.1" }}
        ></div>
        <img
          src={shower}
          alt=""
          className="w-[9.5rem] object-contain opacity-100"
        />
      </div>
      <div className="text-[#88869D] flex flex-col text-center gap-[1rem]">
        <div className="temperature text-[#E7E7EB] text-[9rem] leading-[5rem]">
          {Math.round(data?.main?.temp) || "15"}{" "}
          <span className="text-[3rem] text-[#A09FB1]">°C</span>
        </div>
        <div className="text-[2.5rem] ">
          {weatherData?.weather[0]?.description || "Shower"}
        </div>
        <p className="date">
          Today · <span>{getFormatteDate()}</span>
        </p>
        <div className="flex items-center justify-center mb-[2rem]">
          <img src={gps} alt="" />
          <p>{data?.name || "Helsinki"}</p>
        </div>
      </div>
      {isOpen && <WeatherSearch onClose={toggleWeatherSearch} />}
    </div>
  );
};

export default Sidebar;
