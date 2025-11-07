import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IConsumidor } from '../consumidor.model';
import { ConsumidorService } from '../service/consumidor.service';
import { ConsumidorFormGroup, ConsumidorFormService } from './consumidor-form.service';

@Component({
  selector: 'jhi-consumidor-update',
  templateUrl: './consumidor-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ConsumidorUpdateComponent implements OnInit {
  isSaving = false;
  consumidor: IConsumidor | null = null;

  protected consumidorService = inject(ConsumidorService);
  protected consumidorFormService = inject(ConsumidorFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ConsumidorFormGroup = this.consumidorFormService.createConsumidorFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consumidor }) => {
      this.consumidor = consumidor;
      if (consumidor) {
        this.updateForm(consumidor);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consumidor = this.consumidorFormService.getConsumidor(this.editForm);
    this.subscribeToSaveResponse(this.consumidorService.create(consumidor));
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsumidor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(consumidor: IConsumidor): void {
    this.consumidor = consumidor;
    this.consumidorFormService.resetForm(this.editForm, consumidor);
  }
}
