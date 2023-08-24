import React, { useState,useEffect } from 'react'
import closeIcon from '../assets/img/close.svg'
import left from '../assets/img/left.svg'
import { useWeather } from '../context/WeatherContext'

const WeatherSearch = ({onClose}) => {
  const [inputCity, setInputCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const {setUbicacion,setBuscarPorCoordenadas} = useWeather();


  const handleInputChange = (event) => {
    setInputCity(event.target.value);    
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputCity)
    setBuscarPorCoordenadas(false);
    setUbicacion(inputCity)
    onClose(); // Cerrar el modal después de realizar la búsqueda
    
  };
  
  return (
    <div className='w-full h-[100dvh] md:w-[25rem] p-3 gap-[1.5rem] fixed top-0 left-[0rem] bg-[#1E213A] flex flex-col z-10'>
     <div className='w-full flex justify-end'><img src={closeIcon} alt="" className='w-[1.5rem] cursor-pointer' onClick={onClose}/></div>
      <form action="" className='flex w-full justify-between my-[1.5rem]' onSubmit={handleSubmit}>
        <input type="text"  className='h-[3rem] p-[1.5rem]' placeholder='search location' value={inputCity} onChange={handleInputChange}/>
        <button type="submit" className='bg-[#3C47E9] h-[3rem] text-[#E7E7EB] text-[1rem] w-[5rem]'>Search</button>
      </form>
      {errorMessage && <p className="text-[#FF4D4D]">{errorMessage}</p>}
      <ul className='flex flex-col text-[1rem] text-[#E7E7EB] gap-[1.5rem]'>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>London <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>Barcelona <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>Long Beach <img src={left} className='h-[1rem]' alt="" /></li>
      </ul>
    </div>
  )
}

export default WeatherSearch;