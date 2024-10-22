import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";
import {Router, RouterLink} from "@angular/router";
import {Location} from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  homeButton: Button = {
    title: 'Home',
    icon: 'home',
    class: {
      color: "white",
      background: "green",
    }
  };

  constructor(private location: Location, private router: Router) {
  }

  goBack() {
    this.router.navigate(['/'])
  }
}
