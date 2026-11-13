// Статус записи: только эти четыре значения, любое другое — ошибка компиляции
type BookingStatus = "confirmed" | "completed" | "cancelled" | "no_show";

// Услуга: конечный список, от неё зависит длительность
type Service = "haircut" | "beard" | "haircut_beard";

// Длительность каждой услуги в минутах. Record гарантирует, что учтены все услуги
const SERVICE_DURATION_MIN: Record<Service, number> = {
  haircut: 45,
  beard: 30,
  haircut_beard: 75
};

// Главная сущность — запись клиента к барберу
interface Booking {
  id: number;
  clientName: string;
  barberId: number; // id барбера (1 — Тимур, 2 — Арман), а не имя: имена могут совпасть
  service: Service;
  startsAt: Date;   // Date вместо строки: нельзя записать "завтра"
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: 1,
    clientName: "Алихан",
    barberId: 1,
    service: "haircut",
    startsAt: new Date("2026-11-14T10:00"),
    status: "confirmed"
  },
  {
    id: 2,
    clientName: "Данияр",
    barberId: 1,
    service: "haircut_beard",
    startsAt: new Date("2026-11-14T11:00"),
    status: "confirmed"
  },
  {
    id: 3,
    clientName: "Руслан",
    barberId: 2,
    service: "beard",
    startsAt: new Date("2026-11-13T15:30"),
    status: "cancelled"
  }
];

// Время окончания записи в миллисекундах: начало + длительность услуги
function endTime(b: Booking): number {
  return b.startsAt.getTime() + SERVICE_DURATION_MIN[b.service] * 60_000;
}

// Проверяет, пересекается ли новая запись с существующими у того же барбера.
// Отменённые записи не учитываем: их время свободно.
function hasConflict(newBooking: Booking, existing: Booking[]): boolean {
  const start = newBooking.startsAt.getTime();
  const end = endTime(newBooking);

  return existing.some((b) => {
    if (b.barberId !== newBooking.barberId || b.status === "cancelled") {
      return false;
    }
    return start < endTime(b) && b.startsAt.getTime() < end; // интервалы пересекаются
  });
}

// Демонстрация: пробуем записать нового клиента в разное время
const tryBooking = (barberId: number, time: string): Booking => ({
  id: 99,
  clientName: "Новый клиент",
  barberId,
  service: "haircut",
  startsAt: new Date(time),
  status: "confirmed"
});

console.log("Тимур, 14.11 10:30 (пересекается с Алиханом):", hasConflict(tryBooking(1, "2026-11-14T10:30"), bookings));
console.log("Тимур, 14.11 09:00 (свободно):", hasConflict(tryBooking(1, "2026-11-14T09:00"), bookings));
console.log("Арман, 13.11 15:30 (там отменённая запись):", hasConflict(tryBooking(2, "2026-11-13T15:30"), bookings));
