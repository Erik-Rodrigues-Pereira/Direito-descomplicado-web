import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITrabalhoCLT } from '../trabalho-clt.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../trabalho-clt.test-samples';

import { TrabalhoCLTService } from './trabalho-clt.service';

const requireRestSample: ITrabalhoCLT = {
  ...sampleWithRequiredData,
};

describe('TrabalhoCLT Service', () => {
  let service: TrabalhoCLTService;
  let httpMock: HttpTestingController;
  let expectedResult: ITrabalhoCLT | ITrabalhoCLT[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TrabalhoCLTService);
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

    it('should create a TrabalhoCLT', () => {
      const trabalhoCLT = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(trabalhoCLT).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TrabalhoCLT', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TrabalhoCLT', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTrabalhoCLTToCollectionIfMissing', () => {
      it('should add a TrabalhoCLT to an empty array', () => {
        const trabalhoCLT: ITrabalhoCLT = sampleWithRequiredData;
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing([], trabalhoCLT);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trabalhoCLT);
      });

      it('should not add a TrabalhoCLT to an array that contains it', () => {
        const trabalhoCLT: ITrabalhoCLT = sampleWithRequiredData;
        const trabalhoCLTCollection: ITrabalhoCLT[] = [
          {
            ...trabalhoCLT,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing(trabalhoCLTCollection, trabalhoCLT);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TrabalhoCLT to an array that doesn't contain it", () => {
        const trabalhoCLT: ITrabalhoCLT = sampleWithRequiredData;
        const trabalhoCLTCollection: ITrabalhoCLT[] = [sampleWithPartialData];
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing(trabalhoCLTCollection, trabalhoCLT);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trabalhoCLT);
      });

      it('should add only unique TrabalhoCLT to an array', () => {
        const trabalhoCLTArray: ITrabalhoCLT[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const trabalhoCLTCollection: ITrabalhoCLT[] = [sampleWithRequiredData];
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing(trabalhoCLTCollection, ...trabalhoCLTArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trabalhoCLT: ITrabalhoCLT = sampleWithRequiredData;
        const trabalhoCLT2: ITrabalhoCLT = sampleWithPartialData;
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing([], trabalhoCLT, trabalhoCLT2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trabalhoCLT);
        expect(expectedResult).toContain(trabalhoCLT2);
      });

      it('should accept null and undefined values', () => {
        const trabalhoCLT: ITrabalhoCLT = sampleWithRequiredData;
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing([], null, trabalhoCLT, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trabalhoCLT);
      });

      it('should return initial array if no TrabalhoCLT is added', () => {
        const trabalhoCLTCollection: ITrabalhoCLT[] = [sampleWithRequiredData];
        expectedResult = service.addTrabalhoCLTToCollectionIfMissing(trabalhoCLTCollection, undefined, null);
        expect(expectedResult).toEqual(trabalhoCLTCollection);
      });
    });

    describe('compareTrabalhoCLT', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTrabalhoCLT(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 1651 };
        const entity2 = null;

        const compareResult1 = service.compareTrabalhoCLT(entity1, entity2);
        const compareResult2 = service.compareTrabalhoCLT(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 1651 };
        const entity2 = { id: 18027 };

        const compareResult1 = service.compareTrabalhoCLT(entity1, entity2);
        const compareResult2 = service.compareTrabalhoCLT(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 1651 };
        const entity2 = { id: 1651 };

        const compareResult1 = service.compareTrabalhoCLT(entity1, entity2);
        const compareResult2 = service.compareTrabalhoCLT(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
