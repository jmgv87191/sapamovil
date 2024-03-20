import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-quejas-fugas',
  templateUrl: './quejas-fugas.page.html',
  styleUrls: ['./quejas-fugas.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class QuejasFugasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
