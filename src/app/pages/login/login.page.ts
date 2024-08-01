import { Component, input, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TomasService } from 'src/app/services/tomas.service';
import { ResponseI } from '../../interfaces/tomas'
import { Router } from '@angular/router';

import {heart,personAddOutline,logoFacebook, logoGoogle} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage  {

  form:FormGroup;
  loader: boolean = false;
  pantallaError: boolean = true;

  isAlertOpen = false;
  alertButtons = ['Action'];


  constructor( private fb: FormBuilder, 
    private api: TomasService, 
    private router: Router,
    private alertController: AlertController,
    private renderer: Renderer2

    ){

    addIcons({heart,personAddOutline,logoFacebook,logoGoogle })

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      device_name: ['toma1', Validators.required],
    })
  }

  errorStatus: boolean = false;
  errorMsj: any = "";
  errorMessageVariable: string = '';

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
    
    },
    
    (error: HttpErrorResponse) => {
      if (error.status === 422) {

          console.error('Usuario o contraseña incorrectos');
          this.errorMessageVariable = 'Usuario o contraseña incorrectossas ';
          console.log(this.errorMessageVariable)

          this.pantallaError = false
      
        
      } else {
        console.error('Usuario o contraseña incorrectos:', error.message);
        this.errorMessageVariable = 'Ocurrió un error Usuario o contraseña. Por favor, inténtalo de nuevo más tarde.';
      }
      this.loader = false;
    }

    )

  }
  
    ocultar() {
      this.pantallaError = true
    }
  
    registrar() {
      window.location.href =  `https://portaltest.sapalapaz.gob.mx/login` ;
    }

}
