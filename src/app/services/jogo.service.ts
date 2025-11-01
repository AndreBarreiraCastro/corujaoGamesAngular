import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogo } from '../models/jogo.model';



@Injectable({
  providedIn: 'root'
})
export class jogoservice {
private baseUrl = 'http://localhost:8080/Jogo';
constructor( private httpClient: HttpClient){

} 
getJogo(): Observable<Jogo[]>{
  return this.httpClient.get<Jogo[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Jogo>{
  return this.httpClient.get<Jogo>(`${this.baseUrl}/id/${id}`);
}

incluir(jogo: Jogo): Observable<Jogo>{
  console.log(jogo.id)
  return this.httpClient.post<Jogo>(this.baseUrl,jogo);
}

alterar(jogo: Jogo): Observable<any>{
  console.log(jogo)
  return this.httpClient.put<any>(`${this.baseUrl}/alterar/${jogo.id}`,jogo);
}

excluir(jogo: Jogo): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${jogo.id}`);
} 
}
