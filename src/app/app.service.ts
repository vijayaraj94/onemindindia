import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getProductDetails(): Observable<any> {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://uiexercise.onemindindia.com/api/Product');
  }

  saveProductDetail(params): Observable<any> {
    let API = 'https://cors-anywhere.herokuapp.com/https://uiexercise.onemindindia.com/api/';
    return this.http.post<any>(API+'Product', params);
  }
  saveOrderDetail(params): Observable<any> {
    return this.http.post<any>('https://cors-anywhere.herokuapp.com/https://uiexercise.onemindindia.com/api/OrderProducts', params);
  }
}
