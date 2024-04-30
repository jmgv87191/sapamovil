import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonToast, IonButton,
  IonModal, IonButtons,IonMenu, IonMenuButton,IonIcon, IonFooter, IonInput, IonList, IonLabel, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonMenuButton]
})
export class HeaderPage  {

  constructor( private router: Router ) { }

  onClick(){
    this.router.navigate(['recaudacion'])
  }

  onClick2(){
    this.router.navigate(['pagos'])
  }

  onClick3(){
    this.router.navigate(['tandeo'])
  }

  onClick4(){
    this.router.navigate(['quejas-fugas'])
  }

}
