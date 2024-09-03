import {Component} from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";

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

  defaultLanguage: string = "ru"
  selectLanguage: string = ""
  
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.defaultLanguage)
    this.translate.use(this.defaultLanguage)
    this.selectLanguage = this.defaultLanguage
  }

  switchLang(lang: string) {
    this.translate.use(lang)
    this.selectLanguage = lang
  }
}
