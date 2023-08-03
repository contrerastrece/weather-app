import React, { useContext, useEffect, useState } from 'react'
import location from '../assets/img/location.svg'
import gps from '../assets/img/gps.svg'
import shower from '../assets/img/Shower.png'
import clouds from '../assets/img/Cloud-background.png'
import DataContext from '../context/dataContext';

const Sidebar = () => {

const [weatherData, setWeatherData] = useState(null);
const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);

const {data} =useContext(DataContext);
console.log(data);

const getWeatherData=async()=>{
  const API_KEY='eaa81cef3e751d0ae1fd812e9323c09d';
  const url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}&units=metric&lang=sp`;
  
  try {
    const response=await fetch(url);
    const result=await response.json();
    console.log(result)
    setWeatherData(result);
  } catch (error) {
    console.error('Error al obtener datos del clima:', error);
  }      

}

const handleLocation=()=>{  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      (position)=>{ 
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    },
    (error)=>{
      console.error("Error al obtener la Ubicacion:",error)
    })
    
  }  
  
}

useEffect(() => {
  if(latitude && longitude){    
    getWeatherData();
  }
}, [latitude,longitude]);


  return (
    <div className='h-[100dvh] md:h[100%] w-full relative flex flex-col justify-between items-center md:w-[28rem] bg-[#1E213A] p-3 overflow-hidden'>
      <div className='w-full h-[2.5rem] flex flex-row justify-between overflow-hidden'>
        <button className=' bg-[#6E707A] px-3 py-3 text-[#E7E7EB] leading-[0rem]' >Search for Places</button>
        <button className=''><img src={location} alt="img-location" className='h-[2.5rem]' onClick={handleLocation}/></button>
      </div>
      <div className='flex items-center justify-center w-[35rem] h-[20rem] overflow-hidden relative' >
        <div className='bg-center bg-no-repeat bg-cover w-full h-[20rem] absolute' style={{ backgroundImage: `url(${clouds})`,opacity:'0.1'}}></div>
        <img src={shower} alt="" className='w-[9.5rem] object-contain opacity-100' />

      </div>
      <div className='text-[#88869D] flex flex-col text-center gap-[1rem]'>
        <div className="temperature text-[#E7E7EB] text-[9rem] leading-[5rem]">{Math.round(weatherData?.main?.temp)||'15'} <span className='text-[3rem] text-[#A09FB1]'>°C</span></div>
        <div className="text-[2.5rem] ">{weatherData?.weather[0]?.description||'Shower'}</div>
        <p className="date">Today · <span>Fri, 5 Jun</span></p>
        <div className='flex items-center justify-center mb-[2rem]'>
          <img src={gps} alt="" />
          <p>{weatherData?.name||'Helsinki'}</p>
        </div>
      </div>
      
    </div>
  )
}

export default Sidebar