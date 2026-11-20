interface Weather {
  current: {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
  };
}

async function getWeather(): Promise<Weather> {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=43.24&longitude=76.89&current=temperature_2m,wind_speed_10m";
  const response = await fetch(url);
  // console.log(response);
  // fetch не считает ошибкой статусы 404 или 500, поэтому проверяем сами
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
  }
  // response.json() возвращает unknown, поэтому явно указываем тип через "as"
  const data = (await response.json()) as Weather;
  // console.log(data);
  return data;
}

async function main() {
  console.log("получаем погоду...")
  const weather = await getWeather();
  console.log("погода получена")
  // console.log(weather);
  console.log(`В Алматы сейчас ${weather.current.temperature_2m} °C`);
  console.log(`Ветер ${weather.current.wind_speed_10m} км/ч`);
}
console.log("старт");
main();
console.log("конец");