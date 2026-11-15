// Возможные статусы записи
type BookingStatus = "confirmed" | "completed" | "cancelled";

// Описание одной записи клиента
interface Booking {
  id: number;
  clientName: string;
  barberName: string;
  service: string;
  date: string;
  status: BookingStatus;
}

// Массив из трёх примеров записей
const bookings: Booking[] = [
  {
    id: 1,
    clientName: "Алихан",
    barberName: "Тимур",
    service: "Стрижка",
    date: "16.11.2026",
    status: "confirmed",
  },
  {
    id: 2,
    clientName: "Данияр",
    barberName: "Арман",
    service: "Стрижка бороды",
    date: "17.11.2026",
    status: "completed",
  },
  {
    id: 3,
    clientName: "Руслан",
    barberName: "Тимур",
    service: "Стрижка и борода",
    date: "18.11.2026",
    status: "cancelled",
  },
];

// Возвращает только подтверждённые записи
function getConfirmedBookings(list: Booking[]): Booking[] {
  return list.filter(
    (booking) => booking.status === "confirmed"
  );
}

// Создаю функцию для поиска записей по имени барбера
function getBookingsByBarber(
  list: Booking[],
  barberName: string
): Booking[] {
  // Возвращаю записи выбранного барбера
  return list.filter(
    (booking) => booking.barberName === barberName
  );
}

// Прогноз: выведется Алихан и дата 16.11.2026
console.log(
  "Подтверждённые записи:",
  getConfirmedBookings(bookings)
    .map(
      (booking) =>
        booking.clientName + " — " + booking.date
    )
    .join(", ")
);

// Прогноз: выведутся Алихан и Руслан с датами их записей
console.log(
  "Записи Тимура:",
  getBookingsByBarber(bookings, "Тимур")
    .map(
      (booking) =>
        booking.clientName + " — " + booking.date
    )
    .join(", ")
);