import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private readonly URL_BASE = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) 
  { }

  //POST Animal
  sendAnimal(data:any):Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}/animal/new`,data);
  }
}
