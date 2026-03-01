import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
   private baseUrl = 'http://localhost:4000/portfolio';

  constructor(private http: HttpClient) {}

  getHome() {
    return this.http.get(this.baseUrl);
  }

  createHome(data: FormData) {
    return this.http.post(this.baseUrl, data);
  }

  updateHome(data: FormData) {
    return this.http.put(this.baseUrl, data);
  }
}
