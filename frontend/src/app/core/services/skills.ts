import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISkills } from '../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  
  private baseURL = 'http://localhost:4000/skills';
  constructor(private _http:HttpClient){}

  getSkills(){
    return this._http.get<ISkills[]> (this.baseURL);
  }
  createSkill(data:ISkills){
    return this._http.post<ISkills> (this.baseURL,data)
  }
  updateSkill(id: string, data: ISkills){
  return this._http.put(`${this.baseURL}/${id}`, data);
  }
  deleteSkill(id: string){
  return this._http.delete(`${this.baseURL}/${id}`);

  }
}
