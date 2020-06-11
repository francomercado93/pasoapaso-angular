import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locacion',
  templateUrl: './locacion.component.html',
  styleUrls: ['./locacion.component.css']
})
export class LocacionComponent implements OnInit {
  title: string

  constructor() { }

  ngOnInit(): void {
    this.title = 'pasoapaso-app';
  }

}
