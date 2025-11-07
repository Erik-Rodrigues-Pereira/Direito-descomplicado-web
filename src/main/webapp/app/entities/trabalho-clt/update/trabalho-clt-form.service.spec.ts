import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../trabalho-clt.test-samples';

import { TrabalhoCLTFormService } from './trabalho-clt-form.service';

describe('TrabalhoCLT Form Service', () => {
  let service: TrabalhoCLTFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabalhoCLTFormService);
  });

  describe('Service methods', () => {
    describe('createTrabalhoCLTFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTrabalhoCLTFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });

      it('passing ITrabalhoCLT should create a new form with FormGroup', () => {
        const formGroup = service.createTrabalhoCLTFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
          }),
        );
      });
    });

    describe('getTrabalhoCLT', () => {
      it('should return NewTrabalhoCLT for default TrabalhoCLT initial value', () => {
        const formGroup = service.createTrabalhoCLTFormGroup(sampleWithNewData);

        const trabalhoCLT = service.getTrabalhoCLT(formGroup) as any;

        expect(trabalhoCLT).toMatchObject(sampleWithNewData);
      });

      it('should return NewTrabalhoCLT for empty TrabalhoCLT initial value', () => {
        const formGroup = service.createTrabalhoCLTFormGroup();

        const trabalhoCLT = service.getTrabalhoCLT(formGroup) as any;

        expect(trabalhoCLT).toMatchObject({});
      });

      it('should return ITrabalhoCLT', () => {
        const formGroup = service.createTrabalhoCLTFormGroup(sampleWithRequiredData);

        const trabalhoCLT = service.getTrabalhoCLT(formGroup) as any;

        expect(trabalhoCLT).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITrabalhoCLT should not enable id FormControl', () => {
        const formGroup = service.createTrabalhoCLTFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTrabalhoCLT should disable id FormControl', () => {
        const formGroup = service.createTrabalhoCLTFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
