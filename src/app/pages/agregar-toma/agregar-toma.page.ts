import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IonicModule, RouterCustomEvent } from '@ionic/angular';
import { TomasService } from 'src/app/services/tomas.service';
import { Tomas } from 'src/app/interfaces/tomas';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agregar-toma',
  templateUrl: './agregar-toma.page.html',
  styleUrls: ['./agregar-toma.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AgregarTomaPage implements OnInit {

  form: FormGroup;
  loader: boolean = false;
  cachedData: any;
  errorMessageVariable: string = '';
  mensaje_error: boolean = true;

  constructor(  private fb: FormBuilder, 
    private _tomasService: TomasService,
    private router: Router,
    ) {

    this.form = this.fb.group({
      cveusu: ['', Validators.required],
      alias: ['', Validators.required],
    })

  }

  addToma(){
    
      this.loader = true;

      const toma: Tomas ={
        cveusu: this.form.value.cveusu,
        alias: this.form.value.alias
      }

      console.log(typeof toma.cveusu)

      this._tomasService.postTomas( toma ). subscribe(()=>{
        this.router.navigate(['/home'])
        this.loader = false;
      },
      
      (error: HttpErrorResponse) => {
        if (error.status === 403) {
          console.error('La clave ya fue registrada por un uzzzsuario');
          this.errorMessageVariable = 'La clave ya fue registrada por un usuario';
          console.log(this.errorMessageVariable);
          this.mensaje_error = false;

          
        } else {
          console.error('Error al agregar la toma:', error.message);
          this.errorMessageVariable = 'Ocurrió un error al agregar la toma. Por favor, inténtalo de nuevo más tarde.';
        }
        this.loader = false;
      }
    );

  }


  ngOnInit() {

    this._tomasService.getTomas().subscribe((data)=>{
    })
  }

  regresar(){
    this.router.navigate(['/home'])
  }



}
