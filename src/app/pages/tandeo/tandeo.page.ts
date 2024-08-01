import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComunPage } from 'src/app/shared/header-comun/header-comun.page';

@Component({
  selector: 'app-tandeo',
  templateUrl: './tandeo.page.html',
  styleUrls: ['./tandeo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComunPage]
})
export class TandeoPage  {

  constructor() { }

}
