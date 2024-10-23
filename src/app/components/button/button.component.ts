import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Button} from "../../interfaces";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TuiButton} from '@taiga-ui/core';
import {ShowTitleDirective} from "../../directives/show-title.directive";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    NgStyle,
    TranslateModule,
    ShowTitleDirective,
    TuiButton,
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})

export class ButtonComponent {
  @Input({required: true}) button!: Button
  @Input() disabled!: boolean;
  @Output() myCustomClick = new EventEmitter <void>

  onClick() {
    if (!this.disabled) {
      this.myCustomClick.emit()
    }
  }
}


