import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComunPage } from 'src/app/shared/header-comun/header-comun.page';
import { ActivatedRoute } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-recaudacion',
  templateUrl: './recaudacion.page.html',
  styleUrls: ['./recaudacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComunPage]
})
export class RecaudacionPage implements OnInit  {

  currentTime: string = "";

  @ViewChild('map',{static:true}) mapElementRef!:ElementRef;
  center = { lat: 24.1466617, lng: -110.3108386 };
  map: any;
  googleMaps: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;

  puntos = [ 
    { lat: 24.1466617, lng: -110.3108386, horaInicio:"09:05", horaFin:"19:40" },
    { lat: 24.146970, lng: -110.310110 , horaInicio: "08:20" , horaFin:"15:45" },
    { lat: 24.1646662, lng: -110.2993601 , horaInicio:"08:20", horaFin:"15:45" },
    { lat: 24.1645644, lng: -110.3109223 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.1388284, lng: -110.2947606 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.1351511, lng: -110.3255236 , horaInicio:"09:05", horaFin:"15:45" },
    { lat: 24.1238761, lng: -110.3159922 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.1180013, lng: -110.3119393 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.09899, lng: -110.3237345 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.0621404, lng: -110.3042461 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.0560987, lng: -110.298443 , horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.102710, lng: -110.373431, horaInicio:"09:00", horaFin:"15:45" },
    { lat: 24.102527, lng: -110.413134, horaInicio:"09:00", horaFin:"15:45" },
  ]


  constructor(  private aRouter: ActivatedRoute,
    
) { }


  ngOnInit(){
/*     console.log( this.aRouter.snapshot.paramMap.get('id') )
 */    
    this.loadMap()
    this.addMarker(this.center)

      
      this.checkTimeRange();

  }

  async loadMap(){
    const { Map } = await google.maps.importLibrary("maps");
    const mapEl = this.mapElementRef.nativeElement;
    const location = new google.maps.LatLng(this.center.lat, this.center.lng);

    this.map = new Map(mapEl, {
      center: location,
      zoom: 16,
      mapId: "4504f8b37365c3d0",
      // scaleControl: false,
      // streetViewControl: false,
      // zoomControl: false,
      // overviewMapControl: false,
      // mapTypeControl: false,
      // fullscreenControl: false,

    });

  }

  async addMarker(location: any) {
    for (let i = 0; i < this.puntos.length; i++) {
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
      // Verifica el rango de tiempo para cada punto
      const markerIcon = document.createElement('img');
      if (this.isInTimeRange(this.puntos[i].horaInicio, this.puntos[i].horaFin)) {
        markerIcon.src = 'assets/new.png'; // Imagen para el rango válido
      } else {
        markerIcon.src = 'assets/new_rojo.jpg'; // Imagen para fuera del rango
      }
      
      markerIcon.height = 40;
      markerIcon.width = 40;
  
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: this.puntos[i],
        gmpDraggable: false,
        content: markerIcon,
      });

    // Crea un InfoWindow con los datos
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div>
          <h3>Horario</h3>
          <p> <strong>  Hora Inicio: ${this.puntos[i].horaInicio}</strong></p>
          <p><strong>Hora Fin: ${this.puntos[i].horaFin}</strong></p>
        </div>
      `,
    });

    // Agrega el listener para abrir el InfoWindow al hacer clic
    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: false,
      });
    });



    }
  }

  isInTimeRange(startTime: string, endTime: string): boolean {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const currentTime = `${hours}:${minutes}`;
  
    return currentTime >= startTime && currentTime <= endTime;
  }


  checkTimeRange(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
    const currentTime = `${hours}:${minutes}`;
  
    const startTime = "0";
    const endTime = "0";
  
    if (currentTime >= startTime && currentTime <= endTime) {
      console.log('cierto');
    } else {
      console.log('falso');
    }
  } 

}
