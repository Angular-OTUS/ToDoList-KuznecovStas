import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
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

}
