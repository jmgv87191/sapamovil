import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tomas } from '../interfaces/tomas';



@Injectable({
  providedIn: 'root'
})
export class TomasService {

  private appUrl: string;
  private apiUrl: string;


  constructor( private http: HttpClient ) {

    this.apiUrl = "api/tomas";
    this.appUrl = environment.endpoint;

  }


  getTomas():Observable< Tomas[] >{

    let miStorage = "h2Ca6m0OTdaDixhnPxwqNRWfqQFzXDhi1z0Wh8DO"

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get< Tomas[] >( (this.appUrl + this.apiUrl), options );
  }

  getMasTomas( id:number ):Observable< any >{

    let miStorage = "h2Ca6m0OTdaDixhnPxwqNRWfqQFzXDhi1z0Wh8DO"

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get< any[] >( (this.appUrl + this.apiUrl + '/' + id), options );
  }


  deleteTomas( id:number ):Observable<void> {

    let miStorage = "h2Ca6m0OTdaDixhnPxwqNRWfqQFzXDhi1z0Wh8DO"

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.delete<void>((this.appUrl + this.apiUrl + '/' + id),options)
  }

  postTomas( toma: Tomas ): Observable<void>{

    let miStorage = "h2Ca6m0OTdaDixhnPxwqNRWfqQFzXDhi1z0Wh8DO"

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.post<void>( (this.appUrl + this.apiUrl ), toma , options)
  }

}
