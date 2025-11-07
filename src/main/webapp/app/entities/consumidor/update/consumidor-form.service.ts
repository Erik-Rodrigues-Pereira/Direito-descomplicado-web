import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IConsumidor, NewConsumidor } from '../consumidor.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConsumidor for edit and NewConsumidorFormGroupInput for create.
 */
type ConsumidorFormGroupInput = IConsumidor | PartialWithRequiredKeyOf<NewConsumidor>;

type ConsumidorFormDefaults = Pick<NewConsumidor, 'id'>;

type ConsumidorFormGroupContent = {
  id: FormControl<IConsumidor['id'] | NewConsumidor['id']>;
};

export type ConsumidorFormGroup = FormGroup<ConsumidorFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConsumidorFormService {
  createConsumidorFormGroup(consumidor: ConsumidorFormGroupInput = { id: null }): ConsumidorFormGroup {
    const consumidorRawValue = {
      ...this.getFormDefaults(),
      ...consumidor,
    };
    return new FormGroup<ConsumidorFormGroupContent>({
      id: new FormControl(
        { value: consumidorRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
    });
  }

  getConsumidor(form: ConsumidorFormGroup): NewConsumidor {
    return form.getRawValue() as NewConsumidor;
  }

  resetForm(form: ConsumidorFormGroup, consumidor: ConsumidorFormGroupInput): void {
    const consumidorRawValue = { ...this.getFormDefaults(), ...consumidor };
    form.reset(
      {
        ...consumidorRawValue,
        id: { value: consumidorRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ConsumidorFormDefaults {
    return {
      id: null,
    };
  }
}
