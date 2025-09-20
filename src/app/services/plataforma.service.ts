import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plataforma } from '../models/plataforma.model';
@Injectable({
  providedIn: 'root'
})
export class PlataformaService {
  private baseUrl = 'http://localhost:8080/Plataforma';
constructor( private httpClient: HttpClient){

} 
getPlataforma(): Observable<Plataforma[]>{
  return this.httpClient.get<Plataforma[]>(this.baseUrl);
}

buscarPorId(id: string): Observable<Plataforma>{
  return this.httpClient.get<Plataforma>(`${this.baseUrl}/id/${id}`);
}

incluir(plataforma: Plataforma): Observable<Plataforma>{
  return this.httpClient.post<Plataforma>(this.baseUrl,plataforma);
}

alterar(plataforma: Plataforma): Observable<any>{
  return this.httpClient.put<any>(`${this.baseUrl}/${plataforma.id}`,plataforma);
}

excluir(plataforma: Plataforma): Observable<any>{
  return this.httpClient.delete<any>(`${this.baseUrl}/${plataforma.id}`);
}
}
