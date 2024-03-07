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

  //GET Animal
  getAllAnimals():Observable<any>{
    return this.http.get<any>(`${this.URL_BASE}/animals`);
  }
  
  //GET Animal by type
  getAnimalsByType(data:string):Observable<any>{
    return this.http.get<any>(`${this.URL_BASE}/animalsType/${data}`);
  }

  //GET Animal by Pen
  getAnimalsByPen(data:string):Observable<any>{
    return this.http.get<any>(`${this.URL_BASE}/animalsPen/${data}`);
  }

  //GET Average Animal by Pen
  getAverage(data:string):Observable<any>{
    return this.http.get<any>(`${this.URL_BASE}/animalsPen/average/${data}`);
  }

  //PUT Animal
  putAnimal(id:number,obj:any):Observable<any> {
    return this.http.put<any>(`${this.URL_BASE}/animal/${id}`,obj);
  }
}
