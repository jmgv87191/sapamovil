import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComunPage } from 'src/app/shared/header-comun/header-comun.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recaudacion',
  templateUrl: './recaudacion.page.html',
  styleUrls: ['./recaudacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComunPage]
})
export class RecaudacionPage implements OnInit  {

  constructor(  private aRouter: ActivatedRoute ) { }


  ngOnInit(){
    console.log( this.aRouter.snapshot.paramMap.get('id') )
  }

}
