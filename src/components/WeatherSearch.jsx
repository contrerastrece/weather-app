import React, { useState, useEffect } from "react";
import closeIcon from "../assets/img/close.svg";
import left from "../assets/img/left.svg";
import { useWeather } from "../context/WeatherContext";

import Skeleton,{ SkeletonTheme } from "react-loading-skeleton";

const WeatherSearch = ({ onClose }) => {
  const [inputCity, setInputCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cityFound, setCityFound] = useState([]);
  const [coords, setCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const { setUbicacion, setBuscarPorCoordenadas } = useWeather();

  const handleInputChange = (event) => {
    setInputCity(event.target.value);
  };

  const getCitiesFound = async (city) => {
    const key = "eaa81cef3e751d0ae1fd812e9323c09d";
    const url = `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${key}&units=metric&lang=sp&cnt=50`;
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();

      setCityFound(data.list);
      setIsLoading(false)
      console.log(isLoading)
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getCitiesFound(inputCity);
  };
  const handleClick = (coords) => {
    setCoords(coords);
    setBuscarPorCoordenadas(true);
    setUbicacion(coords);
  };

  const Loader=()=>{
    const arr=[1,2,3,4,5,6];
    return(
      <SkeletonTheme baseColor="#6E707A" highlightColor="rgba(232, 232, 232, 0.25)">
        <div className="flex flex-col gap-5">

          {arr.map((i)=>(
            <div className="flex  gap-5 items-center justify-center" key={i}>
              <Skeleton width={50} height={50} circle/>
              <Skeleton width={250} height={15} count={2}/>
            </div>

          ))}
        </div>
      </SkeletonTheme>
    )
  }


  return (
    <div className="w-full h-[100dvh] md:w-[25rem] p-3 gap-[1.5rem] fixed top-0 left-[0rem] bg-[#1E213A] flex flex-col z-10">
      <div className="w-full flex justify-end">
        <img
          src={closeIcon}
          alt=""
          className="w-[1.5rem] cursor-pointer"
          onClick={onClose}
        />
      </div>
      <form
        action=""
        className="flex w-full justify-between my-[1.5rem]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="h-[3rem] p-[1.5rem] outline-none"
          placeholder="search location"
          value={inputCity}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-[#3C47E9] h-[3rem] text-[#E7E7EB] text-[1rem] w-[5rem]"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
      {errorMessage && <p className="text-[#FF4D4D]">{errorMessage}</p>}

        <div className="overflow-y-auto">
       {isLoading?<Loader/>:(
         <ul className="flex flex-col text-[1rem] text-[#E7E7EB] gap-[1.5rem]">
          {cityFound.map((city) => (
            <li
              className="border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4.5rem] cursor-pointer flex items-center justify-between"
              key={city.id}
              onClick={() => handleClick(city.coord)}
            >
              <div className="flex items-center gap-4">               
                  <img
                  src={`https://flagsapi.com/${city.sys.country}/flat/48.png`}
                  alt={`${city.sys.country}`}
                />
                <div className="flex flex-col items-center">
                {city.name}, {city.sys.country}

              <span className="text-[0.9rem]">
                coord: [{` ${city.coord.lat} , ${city.coord.lon} `}]
              </span>
                </div>
              </div>
              <img src={left} className="h-[1rem]" alt="left" />
            </li>
          ))}
        </ul>
        
       )}
      </div>
    </div>
  );
};

export default WeatherSearch;
