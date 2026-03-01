import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {IAbout} from "../models/about.model"
@Injectable({
  providedIn: 'root',
})
export class AboutService {
    private APIURL=  "http://localhost:4000/about"
    constructor(private _http:HttpClient){}

    getAbout(){
    return this._http.get<IAbout> (this.APIURL);
  }

  updateAbout(data:IAbout){ 
    return this._http.put<IAbout>(this.APIURL,data);
  }

  
}
