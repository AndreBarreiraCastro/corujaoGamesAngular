import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classificacao } from '../models/classificacao.model';

@Injectable({
  providedIn: 'root'
})
export class classificaoservice {
private baseUrl = 'http://localhost:8080/Classificacao';
constructor( private httpClient: HttpClient){

} 
getClassificacao(): Observable<Classificacao[]>{
  return this.httpClient.get<Classificacao[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Classificacao>{
  return this.httpClient.get<Classificacao>(`${this.baseUrl}/id/${id}`);
}

incluir(classificacao: Classificacao): Observable<Classificacao>{
  return this.httpClient.post<Classificacao>(this.baseUrl,classificacao);
}

alterar(classificacao: Classificacao): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${classificacao.id}`,classificacao);
}

excluir(classificacao: Classificacao): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${classificacao.id}`);
} 
}
