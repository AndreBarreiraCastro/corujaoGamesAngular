import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartucho } from '../models/cartucho.model';



@Injectable({
  providedIn: 'root'
})
export class cartuchoservice {
  private baseUrl = 'http://localhost:8080/cartuchos';
  constructor(private httpClient: HttpClient) {

  }
  getCartucho(page?: number, pageSize?: number): Observable<Cartucho[]> {
    let params = {};
    if ((page !== undefined) && (pageSize !== undefined)) {

      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }


    return this.httpClient.get<Cartucho[]>(`${this.baseUrl}/procuratodos`, { params });
  }


  count(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/count`);
  }

  buscarPorId(id: string): Observable<Cartucho> {
    return this.httpClient.get<Cartucho>(`${this.baseUrl}/id/${id}`);
  }

  incluir(cartucho: Cartucho): Observable<Cartucho> {
    console.log(cartucho)
    return this.httpClient.post<Cartucho>(this.baseUrl, cartucho);
  }

  alterar(cartucho: Cartucho): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${cartucho.id}`, cartucho);
  }

  excluir(cartucho: Cartucho): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cartucho.id}`);
  }
}
