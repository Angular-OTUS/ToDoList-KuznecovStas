import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {TodoStoreService} from "../../services/todo-store.service";
import {ToastService} from "../../services/toast.service";
import {Button} from "../../interfaces/button";
import {catchError, of, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-todo-create-item',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './todo-create-item.component.html',
  styleUrl: './todo-create-item.component.scss'
})
export class TodoCreateItemComponent {
  newTitleValue: string = ''
  newDescriptionValue: string = ''

  addButton: Button = {
    icon: "BUTTONS.ADD",
    title: "BUTTONS.ADD_TITLE",
    class: {
      color: "white",
      background: "green",
      height: "60px",
      width: "100px",
    }
  }
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private store: TodoStoreService,
    private toastService: ToastService) {

  }

  public addTask(): void {
    if (this.newTitleValue) {
      this.store.addTask(this.newTitleValue, this.newDescriptionValue).pipe(
        takeUntil(this.destroyed$),
        tap(() => {
            this.toastService.showToast("TOASTS.TASK_ADDED")
            this.newDescriptionValue = ''
            this.newTitleValue = ''
          }
        ),
        catchError(() => {
            this.toastService.showToast("TOASTS.TASK_ERROR")
            return of(null)
          }
        )
      ).subscribe()
    }
  }
}
