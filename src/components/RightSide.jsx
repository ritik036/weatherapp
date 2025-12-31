import React, { useState } from "react";

function RightSide({
  tempUnitCel,
  day,
  sevenDaysData,
  onDayChange,
  onTempUnitChange,
}) {
  return (
    <div className="flex flex-col max-sm:w-full max-sm:h-auto p-5">
      <div
        className={` text-gray-700 flex gap-5 cursor-pointer justify-between items-center `}
      >
        <div className="flex gap-5 items-center ">
          <div
            onClick={() => onDayChange(true)}
            className={
              `border-r-black hover:font-semibold ` +
              (day ? "text-2xl font-bold" : "text-xl")
            }
          >
            today
          </div>
          <div
            className={
              `border-r-black hover:font-semibold ` +
              (day ? "text-xl" : "text-2xl font-bold")
            }
            onClick={() => onDayChange(false)}
          >
            Weekly
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className={
              ` rounded-full h-10 w-10 cursor-pointer text-white flex items-center justify-center hover:bg-fuchsia-700 ` +
              (tempUnitCel ? " bg-fuchsia-400" : "bg-gray-300")
            }
            onClick={() => onTempUnitChange(true)}
          >
            &deg;C
          </button>
          <button
            className={
              ` rounded-full h-10 w-10 cursor-pointer text-white flex items-center justify-center hover:bg-fuchsia-700 ` +
              (tempUnitCel ? "bg-gray-300 " : "bg-fuchsia-400")
            }
            onClick={() => onTempUnitChange(false)}
          >
            &deg;F
          </button>
        </div>
      </div>
      {day && day === true ? (
        <div className="mt-5 m-4">
          <Today
            tempUnitCel={tempUnitCel}
            sevenDaysData={sevenDaysData}
            todayData={sevenDaysData[0]}
          />
        </div>
      ) : (
        <>
          <div className="mt-5 m-4 h-full py-3">
            <SevenDays
              tempUnitCel={tempUnitCel}
              sevenDaysData={sevenDaysData}
            />
          </div>
          <h1 className="text-3xl float-left">Today Highlights</h1>
          <div className="w-auto p-4">
            <TodayHighlight
              tempUnitCel={tempUnitCel}
              todayData={sevenDaysData[0]}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RightSide;

function Today({ tempUnitCel, sevenDaysData, todayData }) {
  const {
    avghumidity: humidity,
    avgtemp_c: tempC,
    avgtemp_f: tempF,
  } = todayData.day;
  return (
    <div className="flex gap-2 max-sm:flex-col">
      <TodayHighlight tempUnitCel={tempUnitCel} todayData={sevenDaysData[0]} />
      <TodayCard
        tempUnitCel={tempUnitCel}
        title="Rain Chances:"
        showUnit={false}
        val={todayData.day.daily_chance_of_rain}
      />
      <TodayCard
        tempUnitCel={tempUnitCel}
        title="Max Wind Speed:"
        showUnit={false}
        val={todayData.day.maxwind_kph}
      />
    </div>
  );
}

function SevenDays({ sevenDaysData, tempUnitCel }) {
  // console.log(sevenDaysData);
  return (
    <div className="flex flex-wrap gap-4 h-full ">
      {sevenDaysData &&
        sevenDaysData.map((currentDay) => {
          // console.log("day current", currentDay);
          return (
            <WeeklyDayCard
              key={currentDay.date}
              currentDay={currentDay}
              tempUnitCel={tempUnitCel}
            />
          );
        })}
    </div>
  );
}

function TodayHighlight({ tempUnitCel, todayData }) {
  // console.log(todayData);
  const {
    avghumidity: humidity,
    avgtemp_c: tempC,
    avgtemp_f: tempF,
  } = todayData.day;
  // console.log(todayData.day.air_quality.pm2_5)
  return (
    <div className="w-auto flex gap-2 items-center ">
      <TodayCard title="Humidity" val={humidity} showUnit={false} />
      <TodayCard
        title="PM 2.5"
        val={todayData.day.air_quality.pm2_5}
        showUnit={false}
        quality={todayData.day.air_quality.pm2_5 > 50 ? "hazardous" : "Safe"}
      />
      <TodayCard
        tempUnitCel={tempUnitCel}
        title="Average Temp:"
        showUnit={true}
        val={tempUnitCel ? tempC : tempF}
      />
    </div>
  );
}

function TodayCard({ showUnit, tempUnitCel, title, val, quality, className }) {
  let aqiStyle =
    quality === "hazardous"
      ? "bg-red-500 text-xl rounded-xl p-1"
      : "bg-green-400 text-xl rounded-xl p-1";
  return (
    <div className="bg-white border-1 rounded-2xl h-auto min-h-30 w-auto p-1 flex flex-col items-center justify-around">
      <h2 className="text-2xl">{title}</h2>
      <div className="text-2xl">
        {showUnit ? (
          <h1>
            {console.log(typeof val, val)}
            {Number(val)} {tempUnitCel ? <>&deg;C</> : <>&deg;F</>}
          </h1>
        ) : (
          Math.floor(val)
        )}
      </div>
      {quality ? <h1 className={aqiStyle}>{quality}</h1> : null}
    </div>
  );
}

function WeeklyDayCard({ currentDay, tempUnitCel }) {
  const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = new Date(currentDay.date);
  day = day.getDay();
  return (
    <div
      key={currentDay.date_epoch}
      className="h-auto w-auto p-4 border-1 bg-white rounded-2xl flex flex-col items-center"
    >
      <div className="flex items-center justify-between px-2">
        <h1 className="text-2xl">{dayArray[day]}</h1>
        <img src={currentDay.day.condition.icon} alt="" />
      </div>
      <div>
        {tempUnitCel ? (
          <p>
            {currentDay?.day?.maxtemp_c} &deg;C | {currentDay.day.mintemp_c}
            &deg;C
          </p>
        ) : (
          <p>
            {currentDay?.day?.maxtemp_f} &deg;F | {currentDay.day.mintemp_f}
            &deg;F
          </p>
        )}
      </div>
    </div>
  );
}

{
  /* {currentDay.day.maxtemp_c} */
}
