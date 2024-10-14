import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";
import {LanguageSelectorService} from "../../services";

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
    icon: "🇷🇺", //флаг россии вместо иконки
    title: "Русский",
    class: {
      color: "black",
      background: "yellow",
      height: '50px',
      width: '50px',
      fontSize: '20px'
    }
  }

  enButton: Button = {
    icon: "🇺🇸",
    title: "English",
    class: {
      color: "black",
      background: "yellow",
      height: '50px',
      width: '50px',
      fontSize: '20px'
    }

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
