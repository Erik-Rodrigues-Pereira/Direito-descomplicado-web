import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import TrabalhoCLTResolve from './route/trabalho-clt-routing-resolve.service';

const trabalhoCLTRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/trabalho-clt.component').then(m => m.TrabalhoCLTComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/trabalho-clt-detail.component').then(m => m.TrabalhoCLTDetailComponent),
    resolve: {
      trabalhoCLT: TrabalhoCLTResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/trabalho-clt-update.component').then(m => m.TrabalhoCLTUpdateComponent),
    resolve: {
      trabalhoCLT: TrabalhoCLTResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default trabalhoCLTRoute;
