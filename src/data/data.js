let _data = null;

async function fetchData() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=5d64a81297eb4de4834102715252212&q=Gwalior&days=7&aqi=yes&alerts=no"
  );
  const tempData = await response.json();
  _data = tempData;
}

fetchData();

// setTimeout(() => {
//   console.log(_data);
// }, 3000);




export default _data;