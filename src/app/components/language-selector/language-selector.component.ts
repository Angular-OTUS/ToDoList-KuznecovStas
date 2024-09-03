import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";
import {LanguageSelectorService} from "../../services/language-selector.service";

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonComponent
  ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})

export class LanguageSelectorComponent {
  rusButton: Button = {
    title: "Русский",
    color: "black",
    background: "green"
  }

  enButton: Button = {
    title: "English",
    color: "black",
    background: "green"
  }


  selectLanguage: string = ""

  constructor(private lang: LanguageSelectorService) {
    this.selectLanguage = lang.getDefaultLanguage()
  }

  switchLang(lang: string) {
    this.lang.use(lang)
    this.selectLanguage = lang
  }
}
