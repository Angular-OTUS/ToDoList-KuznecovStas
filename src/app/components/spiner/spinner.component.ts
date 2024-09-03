import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSelectorService} from "../../services/language-selector.service";


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    MatProgressSpinner,
    TranslateModule,
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() spinnerTitle!: string

  constructor(private lang: LanguageSelectorService) {

  }
}
