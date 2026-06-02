export interface Medicine {
  id: number;
  name: string;
}

export interface MedicineListResponse {
  medicines: Medicine[];
}