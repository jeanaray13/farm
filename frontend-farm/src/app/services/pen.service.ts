import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenService {

  private readonly URL_BASE = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) 
  { }

  //POST Pen
  sendPen(data:any):Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}/pen/new`,data);
  }

  //GET ALL Pen
  getAllPen():Observable<any>{
    return this.http.get<any>(`${this.URL_BASE}/pens`);
  }
}
