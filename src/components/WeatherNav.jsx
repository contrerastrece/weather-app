import React, { useState } from 'react'
import closeIcon from '../assets/img/close.svg'
import left from '../assets/img/left.svg'

const WeatherNav = ({isOpen,onClose}) => {

  if(!isOpen){
    return null;
  }
 

  return (
    <div className='w-full h-[100dvh] md-[28rem] absolute p-3 gap-[1.5rem]top-0 left-0 bg-[#1E213A] flex flex-col'>
     <div className='w-full flex justify-end'><img src={closeIcon} alt="" className='w-[1.5rem] cursor-pointer' onClick={onClose}/></div>
      <form action="" className='flex w-full justify-between my-[1.5rem]'>
        <input type="text"  className='h-[3rem] p-[1.5rem]' placeholder='search location'/>
        <button type="button" className='bg-[#3C47E9] h-[3rem] text-[#E7E7EB] text-[1rem] w-[5rem]' onClick={onClose}>Search</button>
      </form>
      <ul className='flex flex-col text-[1rem] text-[#E7E7EB] gap-[1.5rem]'>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between' onClick={onClose}>London <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between' onClick={onClose}>Barcelona <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between' onClick={onClose}>Long Beach <img src={left} className='h-[1rem]' alt="" /></li>
      </ul>
    </div>
  )
}

export default WeatherNav