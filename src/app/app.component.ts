import {TuiRoot} from "@taiga-ui/core";
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToDoListComponent} from "./components/to-do-list/to-do-list.component";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonComponent} from "./components/button/button.component";
import {ToastComponent} from "./components/toast/toast.component";
import {LanguageSelectorComponent} from "./components/language-selector/language-selector.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToDoListComponent, TranslateModule, ButtonComponent, TuiRoot, ToastComponent, LanguageSelectorComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'ToDoList-KuznecovStas';
}
