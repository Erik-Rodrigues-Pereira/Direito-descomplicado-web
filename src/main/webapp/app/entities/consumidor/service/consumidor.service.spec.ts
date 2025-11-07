import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IConsumidor } from '../consumidor.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../consumidor.test-samples';

import { ConsumidorService } from './consumidor.service';

const requireRestSample: IConsumidor = {
  ...sampleWithRequiredData,
};

describe('Consumidor Service', () => {
  let service: ConsumidorService;
  let httpMock: HttpTestingController;
  let expectedResult: IConsumidor | IConsumidor[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ConsumidorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Consumidor', () => {
      const consumidor = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(consumidor).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Consumidor', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Consumidor', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addConsumidorToCollectionIfMissing', () => {
      it('should add a Consumidor to an empty array', () => {
        const consumidor: IConsumidor = sampleWithRequiredData;
        expectedResult = service.addConsumidorToCollectionIfMissing([], consumidor);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consumidor);
      });

      it('should not add a Consumidor to an array that contains it', () => {
        const consumidor: IConsumidor = sampleWithRequiredData;
        const consumidorCollection: IConsumidor[] = [
          {
            ...consumidor,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addConsumidorToCollectionIfMissing(consumidorCollection, consumidor);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Consumidor to an array that doesn't contain it", () => {
        const consumidor: IConsumidor = sampleWithRequiredData;
        const consumidorCollection: IConsumidor[] = [sampleWithPartialData];
        expectedResult = service.addConsumidorToCollectionIfMissing(consumidorCollection, consumidor);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consumidor);
      });

      it('should add only unique Consumidor to an array', () => {
        const consumidorArray: IConsumidor[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const consumidorCollection: IConsumidor[] = [sampleWithRequiredData];
        expectedResult = service.addConsumidorToCollectionIfMissing(consumidorCollection, ...consumidorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const consumidor: IConsumidor = sampleWithRequiredData;
        const consumidor2: IConsumidor = sampleWithPartialData;
        expectedResult = service.addConsumidorToCollectionIfMissing([], consumidor, consumidor2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(consumidor);
        expect(expectedResult).toContain(consumidor2);
      });

      it('should accept null and undefined values', () => {
        const consumidor: IConsumidor = sampleWithRequiredData;
        expectedResult = service.addConsumidorToCollectionIfMissing([], null, consumidor, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(consumidor);
      });

      it('should return initial array if no Consumidor is added', () => {
        const consumidorCollection: IConsumidor[] = [sampleWithRequiredData];
        expectedResult = service.addConsumidorToCollectionIfMissing(consumidorCollection, undefined, null);
        expect(expectedResult).toEqual(consumidorCollection);
      });
    });

    describe('compareConsumidor', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareConsumidor(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 22013 };
        const entity2 = null;

        const compareResult1 = service.compareConsumidor(entity1, entity2);
        const compareResult2 = service.compareConsumidor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 22013 };
        const entity2 = { id: 16551 };

        const compareResult1 = service.compareConsumidor(entity1, entity2);
        const compareResult2 = service.compareConsumidor(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 22013 };
        const entity2 = { id: 22013 };

        const compareResult1 = service.compareConsumidor(entity1, entity2);
        const compareResult2 = service.compareConsumidor(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
