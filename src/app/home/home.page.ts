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
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ToastController } from '@ionic/angular';
import { NotificationService } from '../services/notification.service';


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
  ruta_recibo:string = ''

  meses: { mes: string, valor: number }[] = [];

  ngOnInit(): void {
    this.getTomas()
    this.meses = this.generateMonths()
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
    private platform: Platform,
    private toastr: ToastrService,
    private toastController: ToastController,
    private notificationService: NotificationService
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

    ionViewWillEnter(){
      this.refreshPage()
    }

    refreshPage(){
      this.getTomas()
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

      console.log(this.masDatos.cveusu)

      if (this.masDatos.estatusContrato === 'Cortado') {
        this.statusCortado = true;
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


  pagar() {
    window.location.href =  `https://portalweb.sapalapaz.gob.mx/sapapol/${this.masDatos.cveusu}` ;
  }

  getRecibos(id:string){
    this._tomasService.getRecibos(id, 1).subscribe((data)=>{
      console.log(data)
    })
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  async downloadRecibo(id: string, valor: number): Promise<void> {
    this._tomasService.getRecibos(id, valor).subscribe(async (data: Blob) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64data = reader.result as string;

        try {
          const result = await Filesystem.writeFile({
            path: `recibo_${id}_${valor}.pdf`,
            data: base64data.split(',')[1], // Remove the prefix from the base64 string
            directory: Directory.Documents
          });

          console.log('File saved at:', result.uri);
          this.ruta_recibo = Directory.Documents
          // Mostrar mensaje de éxito
          this.notificationService.presentToast( `Archivo guardado con éxito ${this.ruta_recibo}` );

        } catch (error) {
          console.error('Error saving file', error);
        }
      };

      reader.readAsDataURL(data);
    }, error => {
      console.error('Error downloading the recibo', error);
    });
  }
  


  generateMonths(): { mes: string, valor: number }[] {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const currentMonth = new Date().getMonth();
    const months = [];

    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth - i + 12) % 12;
      months.push({ mes: monthNames[monthIndex], valor: i });
    }

    return months;
  }

  
    async presentToast(message: string, duration: number = 2000) {
      const toast = await this.toastController.create({
        message,
        duration
      });
      toast.present();
    }

}
