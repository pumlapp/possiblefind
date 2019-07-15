import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'layout-shared',
  templateUrl: './layout-shared.component.html'
})
export class LayoutSharedComponent  {
  constructor( private router: Router) {
  }
}