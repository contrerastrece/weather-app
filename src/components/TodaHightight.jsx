import direction from "../assets/img/direction.svg";
import { useWeather } from "../context/WeatherContext";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TodaHightight = () => {
  const { isLoading, clima: weatherInfo } = useWeather();

  const Loader = () => {
    const arr = [1, 2, 3, 4];
    return (
      <>
        {arr.map((e) => (
          <SkeletonTheme
            baseColor="#6E707A"
            highlightColor="rgba(232, 232, 232, 0.25)"
            key={e}
          >
            <div className="md:w-[20rem] h-[12.5rem] md:h-[9rem] bg-[#1E213A] flex flex-col justify-around items-center">
              <Skeleton width={150} duration={0.5}/>                             
              <Skeleton width={125} height={50} duration={0.5}/>
              <Skeleton width={150} height={10} duration={0.5}/>              
            </div>
          </SkeletonTheme>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="m-5 md:m-0">
        <h2 className="text-[1.5rem] text-[#E7E7EB] my-[0.5rem]">
          Today's Hightlights
        </h2>
        <div className="gap-[2rem] text-[#E7E7EB] grid md:grid-cols-2">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="md:min-w-[15rem] h-[9rem] md:h-[10.5rem] bg-[#1E213A] flex flex-col p-[0.5rem] justify-between items-center">
                <h2>Wind status</h2>
                <div className="text-[#E7E7EB] text-[3rem]  flex justify-center items-center gap-2">
                  {Math.round(weatherInfo?.wind?.speed)}
                  <span className="text-[2.25rem] text-center">mph</span>
                </div>
                <div className="flex gap-2 align-middle  justify-center items-center">
                  <img
                    src={direction}
                    alt=""
                    className="w-[1.8rem] rounded-full bg-[#88869D]"
                  />
                  <span>wsw</span>
                </div>
              </div>

              <div className="md:min-w-[15rem] h-[9rem] md:h-[10.5rem] bg-[#1E213A] flex flex-col p-[0.5rem] justify-between items-center ">
                <h2>Humidity</h2>
                <div className="text-[#E7E7EB] text-[3rem]  align-middle  flex justify-center items-center gap-2">
                  {weatherInfo?.main?.humidity}
                  <span className="text-[2.25rem] text-center">%</span>
                </div>
                <div className="flex flex-col h-[2.25rem] items-center justify-center">
                  <div className="text-[0.7rem] text-[#A09FB1] flex justify-between w-[15rem]">
                    <span>0</span> <span>50</span> <span>100</span>
                  </div>
                  {/* progress bar */}
                  <div className="bg-[#E7E7EB] h-[0.3rem] w-[15rem] rounded-[1rem]">
                    <div
                      className={`bg-[#FFEC65] rounded-[1rem] h-[0.3rem]`}
                      style={{ width: `${weatherInfo?.main?.humidity}%` }}
                    ></div>
                  </div>
                  <span className="text-[0.7rem] flex justify-end w-[15rem] text-[#A09FB1] ">
                    %
                  </span>
                </div>
              </div>

              <div className="bg-[#1E213A] h-[8rem] md:min-w-[15rem] md:h-[8rem] flex flex-col p-[0.5rem] pb-[1rem] justify-between items-center">
                <h3 className="text-[#E7E7EB] text-[1rem]">Visibility</h3>
                <p className="text-[4rem] flex gap-2 justify-center items-center  leading-[4rem]">
                  {weatherInfo?.visibility / 1000}
                  <span className="text-[2.25rem]">miles</span>
                </p>
              </div>

              <div className="bg-[#1E213A] h-[8rem] md:min-w-[15rem] md:h-[8rem] flex flex-col p-[0.5rem] pb-[1rem] justify-between items-center">
                <h3 className="text-[#E7E7EB] text-[1rem]">Air Pressure</h3>
                <p className="text-[4rem]  flex gap-2 items-center leading-[4rem]">
                  {weatherInfo?.main?.pressure}
                  <span className="text-[2.25rem]">mb</span>
                </p>
              </div>
            </>
          )}
        </div>        
      </div>
    </>
  );
};

export default TodaHightight;
