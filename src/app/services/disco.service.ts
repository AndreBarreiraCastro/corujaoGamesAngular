import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disco } from '../models/disco.model';



@Injectable({
  providedIn: 'root'
})
export class discoservice {
private baseUrl = 'http://localhost:8080/discos';
constructor( private httpClient: HttpClient){

} 
getDisco(): Observable<Disco[]>{
  return this.httpClient.get<Disco[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Disco>{
  return this.httpClient.get<Disco>(`${this.baseUrl}/id/${id}`);
}

incluir(disco: Disco): Observable<Disco>{
  console.log(disco)
  return this.httpClient.post<Disco>(this.baseUrl,disco);
}

alterar(disco: Disco): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${disco.id}`,disco);
}

excluir(disco: Disco): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${disco.id}`);
} 
}
