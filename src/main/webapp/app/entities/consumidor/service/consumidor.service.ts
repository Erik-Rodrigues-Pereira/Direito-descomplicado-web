import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConsumidor, NewConsumidor } from '../consumidor.model';

export type EntityResponseType = HttpResponse<IConsumidor>;
export type EntityArrayResponseType = HttpResponse<IConsumidor[]>;

@Injectable({ providedIn: 'root' })
export class ConsumidorService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/consumidors');

  create(consumidor: NewConsumidor): Observable<EntityResponseType> {
    return this.http.post<IConsumidor>(this.resourceUrl, consumidor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsumidor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsumidor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConsumidorIdentifier(consumidor: Pick<IConsumidor, 'id'>): number {
    return consumidor.id;
  }

  compareConsumidor(o1: Pick<IConsumidor, 'id'> | null, o2: Pick<IConsumidor, 'id'> | null): boolean {
    return o1 && o2 ? this.getConsumidorIdentifier(o1) === this.getConsumidorIdentifier(o2) : o1 === o2;
  }

  addConsumidorToCollectionIfMissing<Type extends Pick<IConsumidor, 'id'>>(
    consumidorCollection: Type[],
    ...consumidorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const consumidors: Type[] = consumidorsToCheck.filter(isPresent);
    if (consumidors.length > 0) {
      const consumidorCollectionIdentifiers = consumidorCollection.map(consumidorItem => this.getConsumidorIdentifier(consumidorItem));
      const consumidorsToAdd = consumidors.filter(consumidorItem => {
        const consumidorIdentifier = this.getConsumidorIdentifier(consumidorItem);
        if (consumidorCollectionIdentifiers.includes(consumidorIdentifier)) {
          return false;
        }
        consumidorCollectionIdentifiers.push(consumidorIdentifier);
        return true;
      });
      return [...consumidorsToAdd, ...consumidorCollection];
    }
    return consumidorCollection;
  }
}
