import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estoque } from '../models/estoque.model';


@Injectable({
  providedIn: 'root'
})
export class estoqueservice {
private baseUrl = 'http://localhost:8080/Estoque';
constructor( private httpClient: HttpClient){

} 
getEstoque(): Observable<Estoque[]>{
  return this.httpClient.get<Estoque[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Estoque>{
  return this.httpClient.get<Estoque>(`${this.baseUrl}/id/${id}`);
}

incluir(estoque: Estoque): Observable<Estoque>{
  console.log(estoque)
  return this.httpClient.post<Estoque>(this.baseUrl,estoque);
}

alterar(estoque: Estoque): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${estoque.id}`,estoque);
}

excluir(estoque: Estoque): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${estoque.id}`);
} 
}
