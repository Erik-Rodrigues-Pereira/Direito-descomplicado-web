import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IConsumidor } from '../consumidor.model';

@Component({
  selector: 'jhi-consumidor-detail',
  templateUrl: './consumidor-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ConsumidorDetailComponent {
  consumidor = input<IConsumidor | null>(null);

  previousState(): void {
    window.history.back();
  }
}
