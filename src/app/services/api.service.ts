import { Injectable } from '@angular/core';
import { environement } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Machine } from '../models/machine';
import { MakeReservation } from '../models/makeReservation';
import { CancelReservation } from '../models/cancelReservation';
import { JoinWaitingList } from '../models/joinWaitingList';
import { Reservation } from '../models/reservation';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseAPIurl = environement.api_url;

  constructor(private http: HttpClient) {}

  reserve(payload: MakeReservation): Observable<MakeReservation> {
    return this.http.post<MakeReservation>(
      `${this.baseAPIurl}reservations/reserve`,
      payload
    );
  }

  cancel(id: number): Observable<CancelReservation> {
    return this.http.post<CancelReservation>(
      `${this.baseAPIurl}reservations/cancel`,
      id
    );
  }

  waitlist(payload: JoinWaitingList): Observable<JoinWaitingList> {
    return this.http.post<JoinWaitingList>(
      `${this.baseAPIurl}reservation/waitlist`,
      payload
    );
  }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseAPIurl}reservations/machines`);
  }

  checkMachineAvailability(id: number, userName: string): Observable<string> {
    return this.http
      .get<{ status: string }>(
        `${this.baseAPIurl}reservations/checkMachineAvailability?id=${id}&userName=${userName}`
      )
      .pipe(map(x => x.status));
  }

  getReservationByMachine(id: number, userName: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseAPIurl}reservations/by-machine?machineId=${id}&userName=${userName}`);
  }
}
