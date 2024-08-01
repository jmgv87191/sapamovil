import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, Tomas, ResponseI } from '../interfaces/tomas';


@Injectable({
  providedIn: 'root'
})
export class TomasService {

  private appUrl: string;
  private apiUrl: string;
  private url: string;
  private urlRecibo: string;

  constructor( private http: HttpClient ) {

    this.apiUrl = "api/tomas";
    this.appUrl = environment.endpoint;
    this.url = 'https://portalweb.sapalapaz.gob.mx/api/mobile/token';
    this.urlRecibo = 'https://portalweb.sapalapaz.gob.mx/api/recibo';

  }


  getTomas():Observable< Tomas[] >{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get< Tomas[] >( (this.appUrl + this.apiUrl), options );
  }

  getMasTomas( id:number ):Observable< any >{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get< any[] >( (this.appUrl + this.apiUrl + '/' + id), options );
  }


  deleteTomas( id:number ):Observable<void> {

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.delete<void>((this.appUrl + this.apiUrl + '/' + id),options)
  }

  postTomas( toma: Tomas ): Observable<void>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.post<void>( (this.appUrl + this.apiUrl ), toma , options)
  }

  loginByEmail(form:Login):Observable<ResponseI>{

    let direccion = this.url  
    return this.http.post<ResponseI>(direccion,form);

  } 

  getRecibos(id: string, mes:number): Observable<Blob> {
    const token = window.localStorage.getItem('token');
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get(`${this.urlRecibo}/${id}/${mes}`, {
      headers: headers,
      responseType: 'blob' // This ensures the response is treated as a binary Blob
    });
  }




}
