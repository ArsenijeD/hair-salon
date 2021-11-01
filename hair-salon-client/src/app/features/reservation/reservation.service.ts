import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { Reservation } from 'src/app/model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly url = 'reservations';

  selectedReservation: Reservation | undefined;

  constructor(private httpService: HttpService) { 
  }

  getWorkersDailyReservations(workerId: number, date: Date): Observable<Reservation[]> {
    const endpoint = '/worker/';
    return this.httpService.get(`${this.url}${endpoint}${workerId}`, { date: date.toISOString() });
  }
}
