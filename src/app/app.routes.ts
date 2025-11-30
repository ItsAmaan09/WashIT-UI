import { Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { AuthGuard } from './utility/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MachinesComponent, canActivate: [AuthGuard] },
];
