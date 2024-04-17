import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TomasService } from 'src/app/services/tomas.service';
import { ResponseI } from '../../interfaces/tomas'
import { Router } from '@angular/router';

import {heart,personAddOutline,logoFacebook, logoGoogle} from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage  {

  form:FormGroup;

  constructor( private fb: FormBuilder, private api: TomasService, private router: Router ){

    addIcons({heart,personAddOutline,logoFacebook,logoGoogle })

    this.form = this.fb.group({
      email: ['jmgv87191@gmail.com', Validators.required],
      password: ['contraseña123', Validators.required],
      device_name: ['toma1', Validators.required],
    })
  }



  errorStatus: boolean = false;
  errorMsj: any = "";


  onLogin(form: any){

    this.api.loginByEmail(form).subscribe(data =>{
      console.log(data)
      let dataResponse: ResponseI = data;

      if (dataResponse.token ) {
        localStorage.setItem("token",dataResponse.token );
        this.router.navigate(['home']);
      }else{
        this.errorStatus = true;
        this.errorMsj = "Error"
      }
    
    }
    )
  }


}
