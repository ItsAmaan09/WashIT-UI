import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Machine } from '../../models/machine';
import { CommonModule } from '@angular/common';
import { WashType } from '../../utility/enums/washType';
import { forkJoin, map, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machines',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent implements OnInit {
  machines: Machine[] = [];
  userName: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines() {
    this.apiService.getMachinesWithStatus().subscribe({
      next: (data) => {
          this.machines = data;
      },
      error: (err) => console.error(err),
    });
  }

  getWashTypeName(id: number): string {
    return WashType[id];
  }

  reserve(machine: any) {
    this.apiService.reserve(machine.WashTypeId).subscribe({
      next: () => this.getMachines(),
      error: (err) => alert(err.error),
    });
  }

  cancelReservation(machine: any) {
    this.apiService.cancel(machine.ReservationId).subscribe({
      next: () => this.getMachines(),
      error: (err) => alert(err.error),
    });
  }

  joinWaitlist(machine: any) {
    this.apiService.waitlist(machine.WashTypeId).subscribe({
      next: () => alert('You are added to waiting list!'),
      error: (err) => alert(err.error),
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
