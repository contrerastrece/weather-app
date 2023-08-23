import icon from "../assets/img/HeavyRain.png";
import DataContext from "../context/dataContext";
import { useWeather } from "../context/WeatherContext";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TodaHightight from "./TodaHightight";
// import "react-loading-skeleton/dist/skeleton.css";

const MainResults = () => {
  // const { weatherInfo, forecastInfo } = useContext(DataContext);
  const {
    isLoading,
    clima: weatherInfo,
    forecast: forecastInfo,
  } = useWeather();
  // console.log(clima,forecast)

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

  const Loader = () => {
    const arr = [1, 2, 3, 4, 5];
    return (
      <>
        {arr.map((e) =>( 
          <SkeletonTheme baseColor="#6E707A" highlightColor="rgba(232, 232, 232, 0.25)" key={e}>
            <div className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-around">
              <h2 className="text-[#E7E7EB] text-[1rem]">
                <Skeleton width={100} height={10} duration={0.5}/>
              </h2>
              <Skeleton width={"3rem"} height={"3rem"} circle duration={0.5}/>
              <p className="text-[1rem] m-[1rem]">
                <Skeleton width={60} height={5} duration={0.5}/>
              </p>
            </div>
          </SkeletonTheme>
        ))}
      </>
    );
  };

  return (
    <div className="bg-[#100E1D] md:w-full md:h-[100dvh] overflow-y-auto max-w-[62rem] md:px-[5rem] py-[1rem]">
      <div className="flex gap-3 flex-wrap items-center md:justify-between md:gap-5 p-[1.5rem]">
        {!isLoading ? (
          <Loader />
        ) : (
          ForecastByDays.map((e) => (
            <SkeletonTheme color="#1E213A" highlightColor="#444">
              <div
                key={e.date}
                className="w-[7.5rem] bg-[#1E213A] h-[10rem] flex flex-col items-center justify-center"
              >
                <h2 className="text-[#E7E7EB] text-[1rem]">
                  {e.date ? getFormateDate(e.date) : <Skeleton width={100} />}
                </h2>
                <img
                  src={
                    e.icon
                      ? `https://openweathermap.org/img/wn/${e.icon}@4x.png`
                      : ""
                  }
                  alt=""
                  className="w-[3.5rem]"
                />
                <p className="text-[1rem] text-[#E7E7EB] m-[1rem] flex gap-3">
                  {e.maxTemp ? (
                    `${Math.round(e.maxTemp)} °C`
                  ) : (
                    <Skeleton width={60} />
                  )}
                  {e.minTemp ? (
                    <span className="text-[#A09FB1]">
                      {Math.round(e.minTemp)}°C
                    </span>
                  ) : (
                    <Skeleton width={60} />
                  )}
                </p>
              </div>
            </SkeletonTheme>
          ))
        )}
      </div>
 
      <TodaHightight/>
    </div>
  );
};

export default MainResults;
