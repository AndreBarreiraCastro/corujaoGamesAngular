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
getPlataforma(page?: number, pageSize?: number): Observable<Plataforma[]>{
  let params = {};

    console.log(page !== undefined);
    console.log(pageSize !== undefined);

    if ((page !== undefined) && (pageSize !== undefined)) {
      
      params = {
        page: page.toString(),
        page_size: pageSize.toString()
      }
    }


    return this.httpClient.get<Plataforma[]>(this.baseUrl, {params});
    //return this.httpClient.get<Estado[]>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
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
