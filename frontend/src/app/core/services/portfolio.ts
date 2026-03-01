import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProject } from '../models/portfolio.model';
@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseURL = 'http://localhost:4000/projects';

  constructor(private http: HttpClient) {}

  // ===== Projects =====
  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.baseURL);
  }

  addProject(data: FormData){
    return this.http.post(this.baseURL, data);
  }

  // UPDATE
updateProject(id: string, data: FormData) {
  return this.http.put(`${this.baseURL}/${id}`, data);
}

// DELETE
deleteProject(id: string) {
  return this.http.delete(`${this.baseURL}/${id}`);
}

}