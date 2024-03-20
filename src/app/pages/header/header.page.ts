import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HeaderPage  {

  constructor( private router: Router ) { }

  onClick(){
    console.log('juan');
    this.router.navigate(['recaudacion'])
  }

  onClick2(){
    console.log('juan');
    this.router.navigate(['pagos'])
  }

  onClick3(){
    console.log('juan');
    this.router.navigate(['tandeo'])
  }

}
