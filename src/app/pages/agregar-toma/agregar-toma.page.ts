import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IonicModule, RouterCustomEvent } from '@ionic/angular';
import { TomasService } from 'src/app/services/tomas.service';
import { Tomas } from 'src/app/interfaces/tomas';
import { Router } from '@angular/router';

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
  clavesUsadas: number[] = []
  cachedData: any;
  errorMessageVariable: string = ''

  constructor(  private fb: FormBuilder, 
    private _tomasService: TomasService,
    private router: Router
    ) {

    this.form = this.fb.group({
      cveusu: ['11030031', Validators.required],
      alias: ['juan', Validators.required],
    })

  }



  addToma(){
    
      this.loader = true;

      const toma: Tomas ={
        cveusu: this.form.value.cveusu,
        alias: this.form.value.alias
      }
      console.log(Number(toma.cveusu))

      if ( this.clavesUsadas.includes(Number(toma.cveusu)) ) {

        console.log(' calve en uso')
        window.location.reload();
      

      } else {
        this._tomasService.postTomas( toma ). subscribe(()=>{
          this.router.navigate(['/home'])
          this.loader = false;
        })
      }

  }


  ngOnInit() {

    this._tomasService.getTomas().subscribe((data)=>{

      for (let i = 0; i < data.length; i++) {
        this.clavesUsadas.push(Number(data[i].cveusu))  
      }

        console.log(this.clavesUsadas)

    })
  }

  regresar(){
    this.router.navigate(['/home'])
  }

  

}
