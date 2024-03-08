import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly URL_BASE = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) 
  { }

  //POST Verify Account
  verifyAccount(data:any):Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}/account/login`,data);
  }

  //POST Account
  postAccount(data:any):Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}/account/new`,data);
  }
}
