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
getSaga(page?: number, pageSize?: number): Observable<Saga[]>{
  let params = {};
      if ((page !== undefined) && (pageSize !== undefined)) {
        
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
  
  
      return this.httpClient.get<Saga[]>(`${this.baseUrl}/procuratodos`, {params});
}

buscarPorId(id: string): Observable<Saga>{
  return this.httpClient.get<Saga>(`${this.baseUrl}/id/${id}`);
}

count(): Observable<any>{
  return this.httpClient.get<any>(`${this.baseUrl}/count`);
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
