import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

  {
    path: 'loader',
    loadComponent: () => import('./shared/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'header',
    loadComponent: () => import('./pages/header/header.page').then( m => m.HeaderPage)
  },
  {
    path: 'agregar-toma',
    loadComponent: () => import('./pages/agregar-toma/agregar-toma.page').then( m => m.AgregarTomaPage)
  },
  {
    path: 'pagos',
    loadComponent: () => import('./pages/pagos/pagos.page').then( m => m.PagosPage)
  },
  {
    path: 'header-comun',
    loadComponent: () => import('./shared/header-comun/header-comun.page').then( m => m.HeaderComunPage)
  },
  {
    path: 'quejas-fugas',
    loadComponent: () => import('./pages/quejas-fugas/quejas-fugas.page').then( m => m.QuejasFugasPage)
  },
  {
    path: 'recaudacion',
    loadComponent: () => import('./pages/recaudacion/recaudacion.page').then( m => m.RecaudacionPage)
  },
  {
    path: 'tandeo',
    loadComponent: () => import('./pages/tandeo/tandeo.page').then( m => m.TandeoPage)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
