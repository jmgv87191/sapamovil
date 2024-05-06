import { Component, OnInit  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonToast, IonButton,
          IonModal, IonButtons,IonMenu, IonMenuButton,IonIcon, IonFooter, IonInput, IonList, IonLabel, IonItem, IonApp } from '@ionic/angular/standalone';
import { MasTomas, Tomas } from '../interfaces/tomas';
import { TomasService } from '../services/tomas.service';
import { CommonModule } from '@angular/common';
import { LoaderPage } from '../shared/loader/loader.page';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { HeaderPage } from '../pages/header/header.page';

import {heart,trashOutline,addCircleOutline, navigateCircleOutline, walletOutline, calendarNumberOutline, callOutline, eyeOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Platform } from '@ionic/angular'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonApp, IonItem, IonLabel, IonList, IonInput, IonFooter, IonButtons, IonModal, IonButton, IonToast, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, 
    CommonModule, LoaderPage, RouterLink,ReactiveFormsModule, 
    IonMenu, IonMenuButton, HeaderPage
  ],
  providers: [
    provideAnimations(), // required animations providers
  ],

})


export class HomePage implements OnInit {


  /* modal */

  isModalOpen = false;
  statusCortado: boolean = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    console.log('hola')
  }

  /* modal */

  listaTomas: Tomas[] = [];
  loader: boolean = false;
  form: FormGroup;
  currentDate: Date;
  masDatos: MasTomas= {
    alias: '',
    cveusu: '',
    direccion: '',
    estatusContrato: '',
    mesesAdeudo: '',
    saldo: 0,
    nombre: '',
  };

  ngOnInit(): void {
    this.getTomas()
  }

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];

  constructor( private _tomasService: TomasService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private platform: Platform
    ) {

      this.hardReset();

      addIcons({heart,trashOutline,addCircleOutline, navigateCircleOutline,
      walletOutline,calendarNumberOutline,callOutline, eyeOutline})

      this.form = this.fb.group({
        cveusu: ['', Validators.required],
        alias: ['', Validators.required],
      })

      this.currentDate = new Date();

    }



    hardReset(){
      this.platform.backButton.subscribeWithPriority(140, () => {
        console.log('Handler was called!');
          window.location.reload();
      });
    }

  getTomas(){
    this._tomasService.getTomas().subscribe((data)=>{
      this.listaTomas = data;
    })
  }

  getMasTomas(id: number, open: boolean){

    this.loader = true;
    this._tomasService.getMasTomas( id ).subscribe((data)=>{

      this.masDatos ={
        alias: data.toma.alias,
        cveusu: data.toma.cveusu,
        direccion: data.usuario.direccion,
        estatusContrato: data.usuario.estatusContrato,
        mesesAdeudo: data.usuario.mesesAdeudo,
        saldo: data.usuario.saldo,
        nombre: data.usuario.nombre
      }

      console.log(this.masDatos)

      if (this.masDatos.estatusContrato === 'Cortado') {
        this.statusCortado = true;
        console.log(this.statusCortado)
      } else {
        this.statusCortado = false;
        console.log(this.statusCortado)
      }

      this.isModalOpen = open;
      this.loader = false;
    })
  }

  deleteTomas(id: number){

    this.loader = true;

    this._tomasService.deleteTomas( id ).subscribe(()=>{
      this.getTomas();
      this.loader = false;
    })  
  }

  onClick(){
    this.router.navigate(['/login'])
    localStorage.removeItem('token');

  }

  onClick1(){
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
