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

incluir(colecao: Saga): Observable<Saga>{
  return this.httpClient.post<Saga>(this.baseUrl,colecao);
}

alterar(colecao: Saga): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${colecao.id}`,colecao);
}

excluir(colecao: Saga): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${colecao.id}`);
}
}
