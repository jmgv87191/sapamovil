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

  @ViewChild('map',{static:true}) mapElementRef!:ElementRef;
  center = { lat: 24.1466617, lng: -110.3108386 };
  map: any;
  googleMaps: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  puntos = [ 
    { lat: 24.1466617, lng: -110.3108386 },
    { lat: 24.146970, lng: -110.310110 },
    { lat: 24.1646662, lng: -110.2993601 },
    { lat: 24.1645644, lng: -110.3109223 },
    { lat: 24.1388284, lng: -110.2947606 },
    { lat: 24.1351511, lng: -110.3255236 },
    { lat: 24.1238761, lng: -110.3159922 },
    { lat: 24.1180013, lng: -110.3119393 },
    { lat: 24.09899, lng: -110.3237345 },
    { lat: 24.0621404, lng: -110.3042461 },
    { lat: 24.0560987, lng: -110.298443 },
    { lat: 24.102710, lng: -110.373431 },
    { lat: 24.102527, lng: -110.413134 },
  ]


  constructor(  private aRouter: ActivatedRoute ) { }


  ngOnInit(){
    console.log( this.aRouter.snapshot.paramMap.get('id') )
    this.loadMap()
    this.addMarker(this.center)
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

      console.log( this.puntos[i])
      
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
      const markerIcon = document.createElement('img');
      markerIcon.src = 'assets/new.png';
      markerIcon.height = 40;
      markerIcon.width = 40;
  
  
      this.marker = new AdvancedMarkerElement({
        map: this.map,
        position: this.puntos[i],
        gmpDraggable: false,
        content: markerIcon,
      });
    }


  }



}
