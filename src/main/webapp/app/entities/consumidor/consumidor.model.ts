export interface IConsumidor {
  id: number;
}

export type NewConsumidor = Omit<IConsumidor, 'id'> & { id: null };
