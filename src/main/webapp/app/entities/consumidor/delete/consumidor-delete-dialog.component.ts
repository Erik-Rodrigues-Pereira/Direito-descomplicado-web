import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IConsumidor } from '../consumidor.model';
import { ConsumidorService } from '../service/consumidor.service';

@Component({
  templateUrl: './consumidor-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ConsumidorDeleteDialogComponent {
  consumidor?: IConsumidor;

  protected consumidorService = inject(ConsumidorService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consumidorService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
