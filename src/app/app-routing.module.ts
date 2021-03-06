import { NologinGuard } from './guards/nologin.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren:'./home/home.module#HomePageModule',canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule',canActivate:[NologinGuard] },
  { path: 'registro', loadChildren: './pages/registro/registro.module#RegistroPageModule',canActivate:[NologinGuard] },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
