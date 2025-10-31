import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartucho } from '../models/cartucho.model';



@Injectable({
  providedIn: 'root'
})
export class cartuchoservice {
private baseUrl = 'http://localhost:8080/cartuchos';
constructor( private httpClient: HttpClient){

} 
getCartucho(): Observable<Cartucho[]>{
  return this.httpClient.get<Cartucho[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Cartucho>{
  return this.httpClient.get<Cartucho>(`${this.baseUrl}/id/${id}`);
}

incluir(cartucho: Cartucho): Observable<Cartucho>{
  console.log(cartucho)
  return this.httpClient.post<Cartucho>(this.baseUrl,cartucho);
}

alterar(cartucho: Cartucho): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${cartucho.id}`,cartucho);
}

excluir(cartucho: Cartucho): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${cartucho.id}`);
} 
}
