export default function PresentHourInfo({ tempUnitCel, presentDate, time, thisHourData }) {
  // console.log("thisHourData", thisHourData);
  const { feelslike_c: feelsLikeC, feelslike_f : feelsLikeF, temp_c: tempC, temp_f: tempF } = thisHourData;
  // console.log("feel, tempC, tempF", feelsLikeC, tempC, tempF);
  return (
    <>
      <div>
        <img
          src={thisHourData.condition.icon}
          alt="weather condition icon"
          className="h-60 w-60 mb-5"
        />
        <p className="text-2xl mb-2">{presentDate.toDateString()}</p>
        <p>{time}</p>
      </div>
      <div className="flex gap-10 items-center bg-white h-auto w-auto border-2 rounded-2xl p-4 justify-between mt-5 mb-5">
        <span style={{ display: "none" }}>kkjlkjk</span>
        <h1 className="text-3xl mt-4 mb-4 text-gray-950">
          {tempUnitCel ? tempC : tempF} {tempUnitCel ? <span>&deg;C</span> : <span>&deg;F</span>}
        </h1>
        <div className="flex flex-col">
          {" "}
          <span className="text-sm text-gray-400">
            feels like 
          </span>
          <h1 className="text-3xl mt-0 mb-4 text-gray-950">
            {tempUnitCel ? feelsLikeC : feelsLikeF} {tempUnitCel ? <span>&deg;C</span> : <span>&deg;F</span>}
          </h1>
        </div>
      </div>
      <div className="air-quality ">
        <div className="w-25 h-5  border-r-2 text-gray-400">
          PM2.5: {Math.floor(thisHourData.air_quality.pm2_5)}
        </div>
        <div className="w-25 h-5   text-gray-400">
          CO: {Math.floor(thisHourData.air_quality.co)}
        </div>
        <div className="w-25 h-5 border-r-2 text-gray-400">
          NO: {Math.floor(thisHourData.air_quality.no2)}
        </div>
        <div className="w-25 h-5   text-gray-400">
          O3: {Math.floor(thisHourData.air_quality.o3)}
        </div>
      </div>
    </>
  );
}
