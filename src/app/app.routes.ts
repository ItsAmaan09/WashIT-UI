import { Routes } from '@angular/router';
import { MachinesComponent } from './components/machines/machines.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { WaitingComponent } from './components/waiting/waiting.component';

export const routes: Routes = [
  { path: 'home', component: MachinesComponent },
  { path: 'reserve/:id', component: ReserveComponent },
  { path: 'waiting', component: WaitingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
