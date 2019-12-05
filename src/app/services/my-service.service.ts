import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const api = 'https://swapi.co/api/';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor(private http: HttpClient) { }

  public getData(url): Promise<any> {
    return this.http.get(url).toPromise();
  }

  public getListPeople(page = 1): Promise<any> {
    return this.http.get(`${api}people/?page=${page}`).toPromise();
  }
}
