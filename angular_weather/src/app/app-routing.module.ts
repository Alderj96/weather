import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLogInWithTokenGuard } from './guards/can-log-in-with-token.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [CanLogInWithTokenGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'principal',
    canLoad: [IsLoggedInGuard],
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalModule)
  },
  {
    path: '**',
    component: LayoutComponent,
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
