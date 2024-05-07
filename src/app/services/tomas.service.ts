import { HttpClient } from '@angular/common/http';
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

  constructor( private http: HttpClient ) {

    this.apiUrl = "api/tomas";
    this.appUrl = environment.endpoint;
    this.url = 'https://portaltest.sapalapaz.gob.mx/api/mobile/token';

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





}
