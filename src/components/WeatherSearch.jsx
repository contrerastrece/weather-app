import React, { useContext, useEffect, useState } from 'react'
import closeIcon from '../assets/img/close.svg'
import left from '../assets/img/left.svg'
import DataContext from '../context/dataContext'

const WeatherSearch = () => {
  const [citySearch, setCitySearch] = useState("")

 
 const {handleSearch}=useContext(DataContext);
//  console.log(handleSearch)
 const handleChange=(e)=>{
  console.log(e.target.value)
  setCitySearch(e.target.value)
  // handleSearch(e.target.value);
}
// const handleSearchWeather=()=>{
//   console.log(citySearch,"SEARCH")
//     handleSearch(citySearch)    
// }


  return (
    <div className='w-full h-[100dvh] md-[28rem]  p-3 gap-[1.5rem]top-0 left-0 bg-[#1E213A] flex flex-col'>
     <div className='w-full flex justify-end'><img src={closeIcon} alt="" className='w-[1.5rem] cursor-pointer' /></div>
      <form action="" className='flex w-full justify-between my-[1.5rem]'>
        <input type="text"  className='h-[3rem] p-[1.5rem]' placeholder='search location' value={citySearch} onChange={handleChange}/>
        <button type="button" className='bg-[#3C47E9] h-[3rem] text-[#E7E7EB] text-[1rem] w-[5rem]' onClick={()=>{handleSearch(citySearch)}}>Search</button>
      </form>
      <ul className='flex flex-col text-[1rem] text-[#E7E7EB] gap-[1.5rem]'>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>London <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>Barcelona <img src={left} className='h-[1rem]' alt="" /></li>
        <li className='border border-[#1E213A] hover:border-[#616475] p-[0.75rem] text-[1rem] h-[4rem] cursor-pointer flex items-center justify-between'>Long Beach <img src={left} className='h-[1rem]' alt="" /></li>
      </ul>
    </div>
  )
}

export default WeatherSearch;