import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITrabalhoCLT } from '../trabalho-clt.model';

@Component({
  selector: 'jhi-trabalho-clt-detail',
  templateUrl: './trabalho-clt-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TrabalhoCLTDetailComponent {
  trabalhoCLT = input<ITrabalhoCLT | null>(null);

  previousState(): void {
    window.history.back();
  }
}
