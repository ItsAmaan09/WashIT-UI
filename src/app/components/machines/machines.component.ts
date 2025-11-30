import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Machine } from '../../models/machine';
import { CommonModule } from '@angular/common';
import { WashType } from '../../utility/enums/washType';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MakeReservationDto } from '../../models/makeReservationDto';
import { CancelReservationDto } from '../../models/cancelReservationDto';
import { JoinWaitingListDto } from '../../models/joinWaitingListDto';

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

  reserve(washTypeId: number) {
    const makeReservation: MakeReservationDto = {
      WashTypeId: washTypeId,
    };

    this.apiService.reserve(makeReservation).subscribe({
      next: () => this.getMachines(),
      error: (err) => alert(JSON.stringify(err.error)),
    });
  }

  cancelReservation(reservationId?: number) {
    const cancelReservationDto: CancelReservationDto = {
      ReservationId: reservationId,
    };

    this.apiService.cancel(cancelReservationDto).subscribe({
      next: () => this.getMachines(),
      error: (err) => alert(err.error),
    });
  }

  joinWaitlist(washTypeId: number) {
    const joinWaitingListDto: JoinWaitingListDto = {
      WashTypeId: washTypeId,
    };

    this.apiService.waitlist(joinWaitingListDto).subscribe({
      next: () => alert('Added to waiting list'),
      error: (err) => alert(err.error),
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
