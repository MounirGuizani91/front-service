import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicLevelPage } from '../model/academic-level-page.model';
import { environment } from '../../environments/environment';

export interface AcademicLevel {
  id: number;
  title: string;
  institution: string;
  year: number;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class AcademicLevelService {
  private apiUrl = environment.apiUrl + '/academic-levels';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AcademicLevel[]> {
    return this.http.get<AcademicLevel[]>(this.apiUrl);
  }

  getById(id: number): Observable<AcademicLevel> {
    return this.http.get<AcademicLevel>(`${this.apiUrl}/${id}`);
  }

  create(level: AcademicLevel): Observable<AcademicLevel> {
    return this.http.post<AcademicLevel>(this.apiUrl, level);
  }

  update(id: number, level: AcademicLevel): Observable<AcademicLevel> {
    return this.http.put<AcademicLevel>(`${this.apiUrl}/${id}`, level);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllPaged(page: number, size: number) {
    return this.http.get<AcademicLevelPage>(`${this.apiUrl}/paged?page=${page}&size=${size}`);
  }
}
