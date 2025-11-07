import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITrabalhoCLT } from '../trabalho-clt.model';
import { TrabalhoCLTService } from '../service/trabalho-clt.service';

const trabalhoCLTResolve = (route: ActivatedRouteSnapshot): Observable<null | ITrabalhoCLT> => {
  const id = route.params.id;
  if (id) {
    return inject(TrabalhoCLTService)
      .find(id)
      .pipe(
        mergeMap((trabalhoCLT: HttpResponse<ITrabalhoCLT>) => {
          if (trabalhoCLT.body) {
            return of(trabalhoCLT.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default trabalhoCLTResolve;
