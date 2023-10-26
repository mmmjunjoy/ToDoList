import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public BASE_URL = 'http://localhost:8000/api/';

  get<T>(endPoint: string, params: {} = {}, headers: {} = {}): Observable<T> {
    const options = this.makeOption(params, headers);
    return this.http.get<T>(`${this.BASE_URL}${endPoint}`, options);
  }

  create<T>(
    endPoint: string,
    payload: {} = {},
    params: {} = {},
    headers: {} = {}
  ): Observable<T> {
    // const options = {
    //   params: params,
    //   headers: headers,
    // };

    return this.http.post<T>(`${this.BASE_URL}${endPoint}`, payload, params);
  }

  update<T>(
    endPoint: string,
    payload: {} = {},
    params: {} = {},
    headers: {} = {}
  ): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}${endPoint}`, payload, params);
  }

  delete<T>(
    endPoint: string,
    params: {} = {},
    headers: {} = {}
  ): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}${endPoint}`, params);
  }

  makeOption(params: {} = {}, headers: {} = {}) {
    return {
      headers: headers,
      observe: 'body' as 'body',
      params: params,
      reportProgress: false,
      responseType: 'json' as 'json',
      withCredentials: true,
    };
  }
}
