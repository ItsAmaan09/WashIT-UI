import { Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { AuthGuard } from './utility/auth.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'home', component: MachinesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
