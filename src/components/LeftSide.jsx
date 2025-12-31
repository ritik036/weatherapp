import React from "react";
import { Search } from "lucide-react";
import TodayCard from "./TodayCard";
function LeftSide({
  tempUnitCel,
  city,
  onCityChange,
  todayData,
  onUserSearch,
  place,
}) {
  return (
    <>
      <div className="flex gap-2 items-center flex-col">
        <div className="flex gap-4 w-full items-center p-3">
          <Search />
          <input
            type="text"
            placeholder="search city"
            value={city}
            className="border-2 items-center rounded-2xl px-2 w-full h-8"
            onChange={(e) => onCityChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                
                onUserSearch();
              }
            }}
          />
          <button
            onClick={onUserSearch}
            className="text-black bg-white border-amber-50 rounded-4xl text-xl p-2 "
          >
            search
          </button>
        </div>
      </div>
      <div>
        <TodayCard tempUnitCel={tempUnitCel} todayData={todayData} />
      </div>
      <h1 className="text-2xl mt-2 mb-2 p-1">
        --
        {place.cityName}, {place.countryName}--
      </h1>
    </>
  );
}

export default LeftSide;
