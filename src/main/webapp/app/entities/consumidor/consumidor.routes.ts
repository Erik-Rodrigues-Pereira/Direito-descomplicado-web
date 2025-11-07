import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import ConsumidorResolve from './route/consumidor-routing-resolve.service';

const consumidorRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/consumidor.component').then(m => m.ConsumidorComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/consumidor-detail.component').then(m => m.ConsumidorDetailComponent),
    resolve: {
      consumidor: ConsumidorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/consumidor-update.component').then(m => m.ConsumidorUpdateComponent),
    resolve: {
      consumidor: ConsumidorResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default consumidorRoute;
