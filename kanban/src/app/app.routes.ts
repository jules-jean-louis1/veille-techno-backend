import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'login',
    component: Login
  }
];
