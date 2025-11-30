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
import {
  MatDialog,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-machines',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
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
    private router: Router,
    private dialog: MatDialog
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

  reserve(machine: Machine) {
    this.openConfirm(
      `Are you sure you want to reserve machine: ${machine.MachineName}`
    ).subscribe((result) => {
      if (result) {
        const makeReservation: MakeReservationDto = {
          WashTypeId: machine.WashTypeId,
        };

        this.apiService.reserve(makeReservation).subscribe({
          next: () => {
            this.getMachines(),
              alert(`${machine.MachineName} is Reserved Success`);
          },
          error: (err) => alert(err.error.message),
        });
      }
    });
  }

  cancelReservation(machine: Machine) {
    this.openConfirm(
      `Are you sure you want to cancel machine: ${machine.MachineName}`
    ).subscribe((result) => {
      if (result) {
        const cancelReservationDto: CancelReservationDto = {
          ReservationId: machine.ReservationId,
        };

        this.apiService.cancel(cancelReservationDto).subscribe({
          next: () => {
            this.getMachines(),
              alert(`${machine.MachineName} is Cancel Success`);
          },
          error: (err) => alert(err.error.message),
        });
      }
    });
  }

  joinWaitlist(machine: Machine) {
    this.openConfirm(
      `Are you sure you want to join waitlist: ${machine.MachineName}`
    ).subscribe((result) => {
      if (result) {
        const joinWaitingListDto: JoinWaitingListDto = {
          WashTypeId: machine.WashTypeId,
        };

        this.apiService.waitlist(joinWaitingListDto).subscribe({
          next: () => {
            alert('Added to waiting list');
            this.getMachines();
          },
          error: (err) => alert(err.error.message),
        });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openConfirm(message: string) {
    return this.dialog
      .open(ConfirmDialogComponent, {
        data: { message },
      })
      .afterClosed();
  }
}
