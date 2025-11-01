import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colecao } from '../models/colecao.model';

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {
  private baseUrl = 'http://localhost:8080/Colecao';
  constructor(private httpClient: HttpClient) {

  }
  getColecao(page?: number, pageSize?: number): Observable<Colecao[]> {
    let params = {};
    if ((page !== undefined) && (pageSize !== undefined)) {

      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }


    return this.httpClient.get<Colecao[]>(`${this.baseUrl}/procuratodos`, { params });
  }

  count(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/count`);
  }

  buscarPorId(id: string): Observable<Colecao> {
    return this.httpClient.get<Colecao>(`${this.baseUrl}/id/${id}`);
  }

  incluir(colecao: Colecao): Observable<Colecao> {
    return this.httpClient.post<Colecao>(this.baseUrl, colecao);
  }

  alterar(colecao: Colecao): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${colecao.id}`, colecao);
  }

  excluir(colecao: Colecao): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${colecao.id}`);
  }
}
