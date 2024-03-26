import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header-comun',
  templateUrl: './header-comun.page.html',
  styleUrls: ['./header-comun.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderComunPage  {

  constructor() { }
  
  @Input() titulo: string = '';

}
