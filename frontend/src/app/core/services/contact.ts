import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IContact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

    private baseURL = 'http://localhost:4000/contacts';
    
  constructor(private http: HttpClient) {}
  getContact(){
    return this.http.get<IContact>(this.baseURL)
  }
  // creatAbout(data: IContact){
    // return this.http.post<IContact>(this.baseURL,data)
  // }

   updateContact(data: IContact){
    return this.http.put<IContact>(this.baseURL,data)
  }

  
}
