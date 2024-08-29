import { Component } from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-spiner',
  standalone: true,
    imports: [
        MatProgressSpinner
    ],
  templateUrl: './spiner.component.html',
  styleUrl: './spiner.component.scss'
})
export class SpinerComponent {

  constructor() {

  }
}
