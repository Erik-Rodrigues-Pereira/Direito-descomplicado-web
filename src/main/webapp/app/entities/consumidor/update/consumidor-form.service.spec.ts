import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../consumidor.test-samples';

import { ConsumidorFormService } from './consumidor-form.service';

describe('Consumidor Form Service', () => {
  let service: ConsumidorFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumidorFormService);
  });

  describe('Service methods', () => {
    describe('createConsumidorFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createConsumidorFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });

      it('passing IConsumidor should create a new form with FormGroup', () => {
        const formGroup = service.createConsumidorFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });
    });

    describe('getConsumidor', () => {
      it('should return NewConsumidor for default Consumidor initial value', () => {
        const formGroup = service.createConsumidorFormGroup(sampleWithNewData);

        const consumidor = service.getConsumidor(formGroup) as any;

        expect(consumidor).toMatchObject(sampleWithNewData);
      });

      it('should return NewConsumidor for empty Consumidor initial value', () => {
        const formGroup = service.createConsumidorFormGroup();

        const consumidor = service.getConsumidor(formGroup) as any;

        expect(consumidor).toMatchObject({});
      });

      it('should return IConsumidor', () => {
        const formGroup = service.createConsumidorFormGroup(sampleWithRequiredData);

        const consumidor = service.getConsumidor(formGroup) as any;

        expect(consumidor).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IConsumidor should not enable id FormControl', () => {
        const formGroup = service.createConsumidorFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewConsumidor should disable id FormControl', () => {
        const formGroup = service.createConsumidorFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
