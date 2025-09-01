import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../model/mission.model';
import { environment } from '../../environments/environment';
import { MissionPage } from '../model/mission-page.model';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private apiUrl = environment.apiUrl + '/missions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getById(id: string | number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  add(data: Mission): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: string | number, data: Mission): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAllPaged(page: number, size: number) {
    return this.http.get<MissionPage>(`${this.apiUrl}/paged?page=${page}&size=${size}`);
  }
}
