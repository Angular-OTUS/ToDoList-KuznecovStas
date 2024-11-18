import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces";
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
  public rusButton: Button = {
    icon: "🇷🇺", //флаг россии вместо иконки
    title: "Русский",
    class: {
      color: "black",
      background: "white",
      height: '50px',
      width: '50px',
      fontSize: '20px'
    }
  }

  public enButton: Button = {
    icon: "🇺🇸",
    title: "English",
    class: {
      color: "black",
      background: "white",
      height: '50px',
      width: '50px',
      fontSize: '20px'
    }

  }


  public selectLanguage: string = ""

  public constructor(private lang: LanguageSelectorService) {
    this.selectLanguage = lang.getDefaultLanguage()
  }

  public switchLang(lang: string) {
    this.lang.use(lang)
    this.selectLanguage = lang
  }
}
