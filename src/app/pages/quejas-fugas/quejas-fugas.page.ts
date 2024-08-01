import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderComunPage } from 'src/app/shared/header-comun/header-comun.page';

@Component({
  selector: 'app-quejas-fugas',
  templateUrl: './quejas-fugas.page.html',
  styleUrls: ['./quejas-fugas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComunPage]
})
export class QuejasFugasPage  {

  constructor( private router: Router ) { }

  

}
