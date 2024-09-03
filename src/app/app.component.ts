import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonComponent} from "./components/button/button.component";
import {Button} from "./interfaces/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToDoListComponent, TranslateModule, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ToDoList-KuznecovStas';
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
