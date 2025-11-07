export interface ITrabalhoCLT {
  id: number;
}

export type NewTrabalhoCLT = Omit<ITrabalhoCLT, 'id'> & { id: null };
