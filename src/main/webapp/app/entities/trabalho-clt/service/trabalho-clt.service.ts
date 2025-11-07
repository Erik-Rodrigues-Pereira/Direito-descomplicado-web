import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrabalhoCLT, NewTrabalhoCLT } from '../trabalho-clt.model';

export type EntityResponseType = HttpResponse<ITrabalhoCLT>;
export type EntityArrayResponseType = HttpResponse<ITrabalhoCLT[]>;

@Injectable({ providedIn: 'root' })
export class TrabalhoCLTService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trabalho-clts');

  create(trabalhoCLT: NewTrabalhoCLT): Observable<EntityResponseType> {
    return this.http.post<ITrabalhoCLT>(this.resourceUrl, trabalhoCLT, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrabalhoCLT>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrabalhoCLT[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTrabalhoCLTIdentifier(trabalhoCLT: Pick<ITrabalhoCLT, 'id'>): number {
    return trabalhoCLT.id;
  }

  compareTrabalhoCLT(o1: Pick<ITrabalhoCLT, 'id'> | null, o2: Pick<ITrabalhoCLT, 'id'> | null): boolean {
    return o1 && o2 ? this.getTrabalhoCLTIdentifier(o1) === this.getTrabalhoCLTIdentifier(o2) : o1 === o2;
  }

  addTrabalhoCLTToCollectionIfMissing<Type extends Pick<ITrabalhoCLT, 'id'>>(
    trabalhoCLTCollection: Type[],
    ...trabalhoCLTSToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trabalhoCLTS: Type[] = trabalhoCLTSToCheck.filter(isPresent);
    if (trabalhoCLTS.length > 0) {
      const trabalhoCLTCollectionIdentifiers = trabalhoCLTCollection.map(trabalhoCLTItem => this.getTrabalhoCLTIdentifier(trabalhoCLTItem));
      const trabalhoCLTSToAdd = trabalhoCLTS.filter(trabalhoCLTItem => {
        const trabalhoCLTIdentifier = this.getTrabalhoCLTIdentifier(trabalhoCLTItem);
        if (trabalhoCLTCollectionIdentifiers.includes(trabalhoCLTIdentifier)) {
          return false;
        }
        trabalhoCLTCollectionIdentifiers.push(trabalhoCLTIdentifier);
        return true;
      });
      return [...trabalhoCLTSToAdd, ...trabalhoCLTCollection];
    }
    return trabalhoCLTCollection;
  }
}
