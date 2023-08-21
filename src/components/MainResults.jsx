import React, { useContext } from "react";
import icon from "../assets/img/HeavyRain.png";
import direction from "../assets/img/direction.svg";
import DataContext from "../context/dataContext";

const MainResults = () => {
  const { weatherInfo, forecastInfo } = useContext(DataContext);

  const getFormateDate = (dateString) => {
    const date = new Date(dateString);
    // Establecer la zona horaria a "es-ES"
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  // calcular la  temp_max y tem_min por día

  // 1. Agrupamos por día
  const groupByDay = (forecastInfo) => {
    const grouped = {};

    forecastInfo?.list.forEach((el) => {
      const date = el.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(el);
    });
    return grouped;
  };

  // 2
  const calcMinMaxTempByDay = (grouped) => {
    const result = [];
    for (const date in grouped) {
      const temperatures = grouped[date].map((day) => day.main.temp);

      const maxTemp = Math.max(...temperatures);
      // Encontramos el objeto con la temperatura máxima
      const maxTempElement = grouped[date].find(
        (element) => element.main.temp === maxTemp
      );

      const minTemp = Math.min(...temperatures);

      // Obtenemos el icono del objeto con la temperatura máxima
      const icon = maxTempElement.weather[0].icon;

      result.push({ date, maxTemp, minTemp, icon });
    }

    return result;
  };

  const groupForecast = groupByDay(forecastInfo);
  const ForecastByDays = calcMinMaxTempByDay(groupForecast).slice(1);

  return (
    <div className="bg-[#100E1D] md:w-full md:h-[100dvh] overflow-y-auto max-w-[62rem] md:px-[5rem] py-[1rem]">
      <div className="flex gap-3 flex-wrap items-center md:justify-between md:gap-5 p-[1.5rem]">
        <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center">
          <h2 className="text-[#E7E7EB] text-[1rem]">Tomorrow</h2>
          <img src={icon} alt="" className="w-[3.5rem]" />
          <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
            16 °C <span className="text-[#A09FB1]">11 °C</span>
          </p>
        </div>
        <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center">
          <h2 className="text-[#E7E7EB] text-[1rem">Tomorrow</h2>
          <img src={icon} alt="" className="w-[3.5rem]" />
          <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
            16 °C <span className="text-[#A09FB1]">11 °C</span>
          </p>
        </div>
        <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center">
          <h2 className="text-[#E7E7EB] text-[1rem]">Tomorrow</h2>
          <img src={icon} alt="" className="w-[3.5rem]" />
          <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
            16 °C <span className="text-[#A09FB1]">11 °C</span>
          </p>
        </div>
        <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center">
          <h2 className="text-[#E7E7EB] text-[1rem]">Tomorrow</h2>
          <img src={icon} alt="" className="w-[3.5rem]" />
          <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
            16 °C <span className="text-[#A09FB1]">11 °C</span>
          </p>
        </div>
        <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center">
          <h2 className="text-[#E7E7EB] text-[1rem]">Tomorrow</h2>
          <img src={icon} alt="" className="w-[3.5rem]" />
          <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
            16 °C <span className="text-[#A09FB1]">11 °C</span>
          </p>
        </div>
        {forecastInfo &&
          ForecastByDays.map((e) => (
            <div
              key={e.date}
              className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center"
            >
              <h2 className="text-[#E7E7EB] text-[1rem]">
                {getFormateDate(e.date)}
              </h2>
              <img
                src={`https://openweathermap.org/img/wn/${e.icon}@4x.png`}
                alt=""
                className="w-[3.5rem]"
              />
              <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
                {Math.round(e.maxTemp)} °C{" "}
                <span className="text-[#A09FB1]">
                  {Math.round(e.minTemp)}°C
                </span>
              </p>
            </div>
          ))}
      </div>

      <div className="p-[1.5rem] pt-0">
        <h2 className="text-[1.5rem] text-[#E7E7EB] my-[1rem]">
          Today's Hightlihts
        </h2>
        <div className="cards flex flex-col md:flex-row gap-[2rem]  text-[#E7E7EB] md:flex-wrap">
          <div className="card md:w-[20rem] h-[12.5rem] md:h-[10rem] bg-[#1E213A] flex flex-col justify-center items-center">
            <div className="title">Wind status</div>
            <div className="text-[#E7E7EB] text-[4rem] flex justify-center items-center">
              {Math.round(weatherInfo?.wind?.speed) || "4"}
              <span className="text-[2.25rem] text-center">mph</span>
            </div>
            <div className="flex gap-2">
              <img
                src={direction}
                alt=""
                className="w-[1.8rem] rounded-full bg-[#88869D]"
              />{" "}
              <span>wsw</span>
            </div>
          </div>

          <div className="card md:w-[20rem] h-[12.5rem] md:h-[10rem] bg-[#1E213A] flex flex-col justify-center items-center">
            <h2>Humidity</h2>
            <div className="text-[#E7E7EB] text-[4rem] flex justify-center items-center">
              {weatherInfo?.main?.humidity || "83"}
              <span className="text-[2.25rem] text-center">%</span>
            </div>
            <div className="flex flex-col">
              <div className="text-[0.75rem] text-[#A09FB1] flex justify-between w-[15rem]">
                <span>0</span> <span>50</span> <span>100</span>
              </div>
              {/* progress bar */}
              <div className="bg-[#E7E7EB] h-[0.5rem] w-[15rem] rounded-[1rem]">
                <div
                  className={`bg-[#FFEC65] rounded-[1rem] h-[0.5rem]`}
                  style={{ width: `${weatherInfo?.main?.humidity}%` }}
                ></div>
              </div>
              <span className="text-[0.75rem] flex justify-end w-[15rem] text-[#A09FB1] ">
                %
              </span>
            </div>
          </div>

          <div className="bg-[#1E213A] h-[10rem] md:w-[20rem] md:h-[8rem] flex flex-col justify-center items-center">
            <h3 className="text-[#E7E7EB] text-[1rem]">Visibility</h3>
            <p className="text-[4rem]">
              {weatherInfo?.visibility / 1000 || 6.4}
              <span className="text-[2.25rem]">miles</span>
            </p>
          </div>
          <div className="bg-[#1E213A] h-[10rem] md:w-[20rem] md:h-[8rem] flex flex-col justify-center items-center">
            <h3 className="text-[#E7E7EB] text-[1rem]">Air Pressure</h3>
            <p className="text-[4rem]">
              {weatherInfo?.main?.pressure || 98}
              <span className="text-[2.25rem]">mb</span>
            </p>
          </div>
        </div>
        <div className="text-[#A09FB1] text-[0.85rem]">
          created by vcontreras
        </div>
      </div>
    </div>
  );
};

export default MainResults;
