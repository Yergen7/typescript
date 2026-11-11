type FlightStatus = "scheduled" | "delayed" | "cancelled";

interface Flight {
  code: string;
  from: string;
  to: string;
  delayMin: number;
  status: FlightStatus;
  international: boolean;
}

// Исправлено:
//  - KC 851: delayMin был строкой "15" -> число 15
//  - KC 921: статус "late" не существует -> "delayed"
//  - DV 703: не хватало поля international -> добавлено
const flights: Flight[] = [
  { code: "KC 851", from: "NQZ", to: "ALA", delayMin: 15, status: "delayed", international: false },
  { code: "KC 921", from: "ALA", to: "IST", delayMin: 45, status: "delayed", international: true },
  { code: "DV 703", from: "NQZ", to: "URA", delayMin: 0, status: "cancelled", international: false },
];

console.log(flights);
