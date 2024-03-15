import { Component, OnInit  } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonToast, IonButton, IonModal, IonButtons } from '@ionic/angular/standalone';
import { MasTomas, Tomas } from '../interfaces/tomas';
import { TomasService } from '../services/tomas.service';
import { CommonModule } from '@angular/common';
import { LoaderPage } from '../shared/loader/loader.page';
import { RouterLink } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonButton, IonToast, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, LoaderPage, RouterLink
            ,ReactiveFormsModule
  ],
})
export class HomePage implements OnInit {

  /* modal */

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
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
    private navCtrl: NavController
    ) {

      this.form = this.fb.group({
        cveusu: ['', Validators.required],
        alias: ['', Validators.required],
      })

      this.currentDate = new Date();

    }

    ionViewWillEnter() {
      // Lógica para cargar o actualizar el contenido de la página
      this.refreshPage();
    }

    refreshPage() {
      // Aquí colocas la lógica para cargar o actualizar el contenido de la página
      this.getTomas()

    }

  getTomas(){
    this._tomasService.getTomas().subscribe((data)=>{
      this.listaTomas = data;
      console.log(data)
    })
  }

  getMasTomas(id: number, open: boolean){

    this.loader = true;
    this._tomasService.getMasTomas( id ).subscribe((data)=>{
      console.log('mas data', data)

      
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



}
