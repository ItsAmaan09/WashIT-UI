import { Injectable } from '@angular/core';
import { environement } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';
import { CancelReservationDto } from '../models/cancelReservationDto';
import { JoinWaitingListDto } from '../models/joinWaitingListDto';
import { MakeReservationDto } from '../models/makeReservationDto';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseAPIurl = environement.api_url;

  constructor(private http: HttpClient) {}

  reserve(payload: MakeReservationDto): Observable<MakeReservationDto> {
    return this.http.post<MakeReservationDto>(
      `${this.baseAPIurl}reservations/reserve`,
      payload
    );
  }

  cancel(payload: CancelReservationDto): Observable<CancelReservationDto> {
    return this.http.post<CancelReservationDto>(
      `${this.baseAPIurl}reservations/cancel`,
      payload
    );
  }

  waitlist(payload: JoinWaitingListDto): Observable<JoinWaitingListDto> {
    return this.http.post<JoinWaitingListDto>(
      `${this.baseAPIurl}reservations/waitlist`,
      payload
    );
  }

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseAPIurl}reservations/machines`);
  }

  getMachinesWithStatus() {
    return this.http.get<Machine[]>(
      `${this.baseAPIurl}reservations/GetMachinesWithStatus`
    );
  }
}
