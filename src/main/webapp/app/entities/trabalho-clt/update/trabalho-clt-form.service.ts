import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITrabalhoCLT, NewTrabalhoCLT } from '../trabalho-clt.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITrabalhoCLT for edit and NewTrabalhoCLTFormGroupInput for create.
 */
type TrabalhoCLTFormGroupInput = ITrabalhoCLT | PartialWithRequiredKeyOf<NewTrabalhoCLT>;

type TrabalhoCLTFormDefaults = Pick<NewTrabalhoCLT, 'id'>;

type TrabalhoCLTFormGroupContent = {
  id: FormControl<ITrabalhoCLT['id'] | NewTrabalhoCLT['id']>;
};

export type TrabalhoCLTFormGroup = FormGroup<TrabalhoCLTFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class TrabalhoCLTFormService {
  createTrabalhoCLTFormGroup(trabalhoCLT: TrabalhoCLTFormGroupInput = { id: null }): TrabalhoCLTFormGroup {
    const trabalhoCLTRawValue = {
      ...this.getFormDefaults(),
      ...trabalhoCLT,
    };
    return new FormGroup<TrabalhoCLTFormGroupContent>({
      id: new FormControl(
        { value: trabalhoCLTRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getTrabalhoCLT(form: TrabalhoCLTFormGroup): NewTrabalhoCLT {
    return form.getRawValue() as NewTrabalhoCLT;
  }

  resetForm(form: TrabalhoCLTFormGroup, trabalhoCLT: TrabalhoCLTFormGroupInput): void {
    const trabalhoCLTRawValue = { ...this.getFormDefaults(), ...trabalhoCLT };
    form.reset(
      {
        ...trabalhoCLTRawValue,
        id: { value: trabalhoCLTRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): TrabalhoCLTFormDefaults {
    return {
      id: null,
    };
  }
}
