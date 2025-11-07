import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'Authorities' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'consumidor',
    data: { pageTitle: 'Consumidors' },
    loadChildren: () => import('./consumidor/consumidor.routes'),
  },
  {
    path: 'trabalho-clt',
    data: { pageTitle: 'TrabalhoCLTS' },
    loadChildren: () => import('./trabalho-clt/trabalho-clt.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
