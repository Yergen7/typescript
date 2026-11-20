// Описание ответа API погоды.
// Сервер присылает больше полей, но мы описываем только те, которые используем.
interface Weather {
  current: {
    time: string; // время измерения, например "2026-11-20T10:30"
    temperature_2m: number; // температура воздуха в °C
    wind_speed_10m: number; // скорость ветра в км/ч
  };
}

// Описание ответа API курса валют.
interface CurrencyRate {
  base: string; // из какой валюты, например "USD"
  quote: string; // в какую валюту, например "KZT"
  date: string; // дата курса, например "2026-11-19"
  rate: number; // сам курс: сколько quote стоит 1 base
}

// Универсальная функция: загружает JSON по адресу и возвращает его как тип T.
// <T> позволяет использовать одну функцию и для погоды, и для курса валют.
async function getJson<T>(url: string): Promise<T> {
  // Отправляем запрос и ждём ответ сервера.
  const response = await fetch(url);

  // fetch не считает ошибкой статусы 404 или 500, поэтому проверяем сами.
  // response.ok равно true, если статус от 200 до 299.
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status} ${response.statusText}`);
  }

  // response.json() превращает текст ответа в объект.
  // "as T" сообщает TypeScript, какой тип у объекта (сами данные он не проверяет).
  return (await response.json()) as T;
}

// Получаем текущую погоду в Алматы.
async function getWeather(): Promise<Weather> {
  // latitude и longitude: координаты Алматы.
  // current: какие текущие данные нужны.
  // timezone=auto: время придёт по местному часовому поясу, а не по GMT.
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=43.24&longitude=76.89&current=temperature_2m,wind_speed_10m&timezone=auto";

  return getJson<Weather>(url);
}

// Получаем курс доллара к тенге.
async function getCurrencyRate(): Promise<CurrencyRate> {
  const url = "https://api.frankfurter.dev/v2/rate/USD/KZT";

  return getJson<CurrencyRate>(url);
}

async function main() {
  console.log("Получаем погоду и курс валют одновременно...");

  // try: код, в котором может произойти ошибка (нет интернета, ошибка сервера).
  try {
    // Promise.all запускает оба запроса сразу и ждёт, пока придут оба ответа.
    // Результаты приходят в том же порядке, в каком записаны функции.
    const [weather, currency] = await Promise.all([
      getWeather(),
      getCurrencyRate(),
    ]);

    // Обращаемся к полям объектов через точку.
    console.log(`В Алматы сейчас ${weather.current.temperature_2m} °C`);
    console.log(`Ветер: ${weather.current.wind_speed_10m} км/ч`);
    console.log(`Время измерения: ${weather.current.time}`);
    console.log(
      `Курс на ${currency.date}: 1 ${currency.base} = ${currency.rate} ${currency.quote}`,
    );
  } catch (error) {
    // catch: сюда попадаем, если упал хотя бы один запрос.
    // error может быть чем угодно, поэтому проверяем, что это объект Error.
    console.error(
      "Не удалось получить данные:",
      error instanceof Error ? error.message : error,
    );
  }
}

// Запускаем программу.
main();
