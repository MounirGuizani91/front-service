import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../../app/model/project.model';
import { ProjectPage } from '../../app/model/project-page.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl + '/projects'; // À adapter selon votre backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  getById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  add(data: Project): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  update(id: string | number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getAllPaged(page: number, size: number) {
    return this.http.get<ProjectPage>(`${this.apiUrl}/paged?page=${page}&size=${size}`);
  }
}
