import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tandeo',
  templateUrl: './tandeo.page.html',
  styleUrls: ['./tandeo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TandeoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
