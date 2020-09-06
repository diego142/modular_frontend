import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/user/login/login.module').then( m => m.LoginPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'lost-password',
    loadChildren: () => import('./pages/user/lost-password/lost-password.module').then( m => m.LostPasswordPageModule)
  },
  {
    path: 'new-account',
    loadChildren: () => import('./pages/user/new-account/new-account.module').then( m => m.NewAccountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/event/events/events.module').then( m => m.EventsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'event-form/:id',
    loadChildren: () => import('./pages/event/event-form/event-form.module').then( m => m.EventFormPageModule)
  },  {
    path: 'skills',
    loadChildren: () => import('./pages/user/skills/skills.module').then( m => m.SkillsPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
