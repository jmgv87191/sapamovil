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
];
