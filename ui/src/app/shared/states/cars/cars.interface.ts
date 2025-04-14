export interface Car {
  id: string;
  registrationPlate: string;
  make: string;
  model: string;
  length: number;
  width: number;
  height: number;
  carryCapacity: number;
  images?: { id: string; imageUrl: string }[];
}
