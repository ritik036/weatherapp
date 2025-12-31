import React, { useEffect, useState } from "react";
import PresentHourAQI from "./PresentHourInfo";
import PresentHourInfo from "./PresentHourInfo";

function TodayCard({tempUnitCel, todayData }) {
  const [time, setTime] = useState("");
  const [presentDate, setPresentDate] = useState(new Date());
  const [hours, setHours] = useState(presentDate.getHours());
//   console.log(todayData)

  useEffect(() => {
    const intervalId = setInterval(() => {
      let todayDate = new Date();
      let currentTime = todayDate.toLocaleTimeString();
      setTime(currentTime);
      setPresentDate(todayDate);
    //   setHours(presentDate.getHours())
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
// console.log("hours", hours);
//   useEffect(() => {}, [presentDate]);
  return (
    <div className="flex flex-col items-center gap-5">
      <div>
        <PresentHourInfo tempUnitCel={tempUnitCel} presentDate={presentDate} time={time} thisHourData={todayData?.hour[hours]} />
      </div>
    </div>
  );
}

export default TodayCard;

