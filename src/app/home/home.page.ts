import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  result: Array<any>;

  constructor() {}

  changeResultSearch(event) {
    this.result = event;
  }

}
