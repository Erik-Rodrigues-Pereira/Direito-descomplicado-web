import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConsumidor } from '../consumidor.model';
import { ConsumidorService } from '../service/consumidor.service';

const consumidorResolve = (route: ActivatedRouteSnapshot): Observable<null | IConsumidor> => {
  const id = route.params.id;
  if (id) {
    return inject(ConsumidorService)
      .find(id)
      .pipe(
        mergeMap((consumidor: HttpResponse<IConsumidor>) => {
          if (consumidor.body) {
            return of(consumidor.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default consumidorResolve;
