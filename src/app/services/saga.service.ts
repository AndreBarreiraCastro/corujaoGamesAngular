import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Saga } from '../models/saga.model';

@Injectable({
  providedIn: 'root'
})
export class SagaService {
  private baseUrl = 'http://localhost:8080/Saga';
constructor( private httpClient: HttpClient){

} 
getSaga(): Observable<Saga[]>{
  return this.httpClient.get<Saga[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Saga>{
  return this.httpClient.get<Saga>(`${this.baseUrl}/id/${id}`);
}

incluir(saga: Saga): Observable<Saga>{
  return this.httpClient.post<Saga>(this.baseUrl,saga);
}

alterar(saga: Saga): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${saga.id}`,saga);
}

excluir(saga: Saga): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${saga.id}`);
}
}
