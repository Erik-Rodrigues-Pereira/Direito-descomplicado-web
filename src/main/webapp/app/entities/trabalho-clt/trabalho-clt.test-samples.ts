import { ITrabalhoCLT, NewTrabalhoCLT } from './trabalho-clt.model';

export const sampleWithRequiredData: ITrabalhoCLT = {
  id: 6908,
};

export const sampleWithPartialData: ITrabalhoCLT = {
  id: 9795,
};

export const sampleWithFullData: ITrabalhoCLT = {
  id: 8598,
};

export const sampleWithNewData: NewTrabalhoCLT = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
