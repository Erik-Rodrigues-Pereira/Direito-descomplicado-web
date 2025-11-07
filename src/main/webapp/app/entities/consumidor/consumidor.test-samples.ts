import { IConsumidor, NewConsumidor } from './consumidor.model';

export const sampleWithRequiredData: IConsumidor = {
  id: 22819,
};

export const sampleWithPartialData: IConsumidor = {
  id: 19757,
};

export const sampleWithFullData: IConsumidor = {
  id: 12582,
};

export const sampleWithNewData: NewConsumidor = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
