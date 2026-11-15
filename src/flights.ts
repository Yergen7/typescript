
type FlightStatus = "scheduled" | "delayed" | "cancelled";

type AircraftModel =
  | "Boeing 737"
  | "Boeing 777"
  | "Airbus A320";

interface Flight {
  id: number;
  code: string;
  from: string;
  to: string;
  aircraft: AircraftModel;
  delayMin: number;
  status: FlightStatus;
  international: boolean;
}

const flights: Flight[] = [
  {
    id: 1,
    code: "KC 851",
    from: "NQZ",
    to: "ALA",
    aircraft: "Airbus A320",
    delayMin: 0,
    status: "scheduled",
    international: false
  },
  {
    id: 2,
    code: "KC 921",
    from: "ALA",
    to: "IST",
    aircraft: "Boeing 777",
    delayMin: 45,
    status: "delayed",
    international: true
  },
  {
    id: 3,
    code: "DV 703",
    from: "NQZ",
    to: "URA",
    aircraft: "Boeing 737",
    delayMin: 0,
    status: "cancelled",
    international: false
  }
];

function delayed(list: Flight[]): Flight[] {
  return list.filter((f) => f.status === "delayed");
}

function totalDelay(list: Flight[]): number {
  let sum = 0;

  for (const f of list) {
    sum = sum + f.delayMin;
  }

  return sum;
}

console.log(delayed(flights).map((f) => f.code));
console.log(totalDelay(flights));
console.log(flights.map((f) => f.aircraft));
