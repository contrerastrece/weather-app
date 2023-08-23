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
            <div className="card md:w-[20rem] h-[12.5rem] md:h-[10rem] bg-[#1E213A] flex flex-col justify-center items-center">
              {/* <div className="title">Wind status</div> */}
              <Skeleton width={150} duration={0.5}/>
              <div className="text-[#E7E7EB] text-[4rem] flex justify-center items-center">
                
                <Skeleton width={125} height={50} duration={0.5}/>
              </div>
              <div className="flex gap-2">
                <Skeleton width={150} height={10} duration={0.5}/>
              </div>
            </div>
          </SkeletonTheme>
        ))}
      </>
    );
  };
  return (
    <>
      <div className="p-[1.5rem] pt-0">
        <h2 className="text-[1.5rem] text-[#E7E7EB] my-[1rem]">
          Today's Hightlights
        </h2>
        <div className="cards flex flex-col md:flex-row gap-[2rem]  text-[#E7E7EB] md:flex-wrap">
          {!isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="card md:w-[20rem] h-[12.5rem] md:h-[10rem] bg-[#1E213A] flex flex-col justify-center items-center">
                <div className="title">Wind status</div>
                <div className="text-[#E7E7EB] text-[4rem] flex justify-center items-center">
                  {Math.round(weatherInfo?.wind?.speed)}
                  <span className="text-[2.25rem] text-center">mph</span>
                </div>
                <div className="flex gap-2">
                  <img
                    src={direction}
                    alt=""
                    className="w-[1.8rem] rounded-full bg-[#88869D]"
                  />
                  <span>wsw</span>
                </div>
              </div>

              <div className="card md:w-[20rem] h-[12.5rem] md:h-[10rem] bg-[#1E213A] flex flex-col justify-center items-center">
                <h2>Humidity</h2>
                <div className="text-[#E7E7EB] text-[4rem] flex justify-center items-center">
                  {weatherInfo?.main?.humidity}
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
                  {weatherInfo?.visibility / 1000}
                  <span className="text-[2.25rem]">miles</span>
                </p>
              </div>

              <div className="bg-[#1E213A] h-[10rem] md:w-[20rem] md:h-[8rem] flex flex-col justify-center items-center">
                <h3 className="text-[#E7E7EB] text-[1rem]">Air Pressure</h3>
                <p className="text-[4rem]">
                  {weatherInfo?.main?.pressure}
                  <span className="text-[2.25rem]">mb</span>
                </p>
              </div>
            </>
          )}
        </div>
        <div className="text-[#A09FB1] text-[0.85rem]">
          created by vcontreras
        </div>
      </div>
    </>
  );
};

export default TodaHightight;
