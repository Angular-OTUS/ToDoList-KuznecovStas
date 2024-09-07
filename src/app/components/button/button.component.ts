import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Button} from "../../interfaces/button";
import {NgIf, NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ShowTitleDirective} from "../../directives/show-title.directive";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    NgStyle,
    TranslateModule,
    ShowTitleDirective
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  @Input({required: true}) button!: Button
  @Input() disabled!: boolean;
}
