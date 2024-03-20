import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'header',
    loadComponent: () => import('./pages/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'loader',
    loadComponent: () => import('./shared/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'agregar-toma',
    loadComponent: () => import('./pages/agregar-toma/agregar-toma.page').then( m => m.AgregarTomaPage)
  },
  {
    path: 'recaudacion',
    loadComponent: () => import('./pages/recaudacion/recaudacion.page').then( m => m.RecaudacionPage)
  },
  {
    path: 'pagos',
    loadComponent: () => import('./pages/pagos/pagos.page').then( m => m.PagosPage)
  },
  {
    path: 'tandeo',
    loadComponent: () => import('./pages/tandeo/tandeo.page').then( m => m.TandeoPage)
  },
  {
    path: 'quejas-fugas',
    loadComponent: () => import('./pages/quejas-fugas/quejas-fugas.page').then( m => m.QuejasFugasPage)
  },
];
