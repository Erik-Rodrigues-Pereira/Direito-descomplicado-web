import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITrabalhoCLT } from '../trabalho-clt.model';
import { TrabalhoCLTService } from '../service/trabalho-clt.service';

@Component({
  templateUrl: './trabalho-clt-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TrabalhoCLTDeleteDialogComponent {
  trabalhoCLT?: ITrabalhoCLT;

  protected trabalhoCLTService = inject(TrabalhoCLTService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trabalhoCLTService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
