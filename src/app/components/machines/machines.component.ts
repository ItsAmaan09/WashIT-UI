import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Machine } from '../../models/machine';
import { CommonModule } from '@angular/common';
import { WashType } from '../../utility/enums/washType';
import { forkJoin, map, switchMap } from 'rxjs';
import { CancelReservation } from '../../models/cancelReservation';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-machines',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent implements OnInit {
  machines: Machine[] = [];
  userName = 'peter';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines(): void {
    this.apiService
      .getMachines()
      .pipe(
        switchMap((machines: any) => {
          // For each machine, create an observable that fetches availability
          const availabilityCalls = machines.map((machine: any) =>
            this.apiService
              .checkMachineAvailability(machine.Id, this.userName)
              .pipe(
                map((status: any) => {
                  machine.Status = status;
                  return machine;
                })
              )
          );

          // Wait for ALL calls to finish
          return forkJoin(availabilityCalls);
        })
      )
      .subscribe({
        next: (machinesWithStatus: any) => {
          this.machines = machinesWithStatus;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('called success.');
        },
      });
  }

  getWashTypeName(id: number): string {
    return WashType[id];
  }

  reserve(machine: any) {
    const dto: any = {
      userName: this.userName,
      washTypeId: machine.washTypeId,
    };

    this.apiService.reserve(dto).subscribe(() => {
      alert('Reserved successfully!');
      this.getMachines();
    });
  }

  cancelReservation(machine: Machine) {
    this.apiService
      .getReservationByMachine(machine.Id, this.userName)
      .subscribe((data) => {
        this.apiService.cancel(data.Id).subscribe(() => {
          alert('Cancelled successfully!');
          this.getMachines();
        });
      });
  }

  joinWaitlist(machine: any) {
    const dto: any = {
      userName: this.userName,
      washTypeId: machine.washTypeId,
    };

    this.apiService.waitlist(dto).subscribe(() => {
      alert('Added to waiting list.');
    });
  }
}
