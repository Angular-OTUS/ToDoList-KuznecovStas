import {Component, OnInit} from '@angular/core';
import {Button, TodoTask} from "../../../interfaces";
import {Router} from "@angular/router";
import {JsonPipe} from "@angular/common";
import {ButtonComponent} from "../../button/button.component";
import {TodoStoreService} from "../../../services/todo-store.service";
import {ToastService} from "../../../services/toast.service";
import {catchError, Subject, takeUntil, tap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ROUTERS} from "../../../constants/routers";

@Component({
  selector: 'app-to-do-edit',
  standalone: true,
  imports: [
    JsonPipe,
    ButtonComponent,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './to-do-edit.component.html',
  styleUrl: './to-do-edit.component.scss'
})
export class ToDoEditComponent implements OnInit {
  public todo: TodoTask = {id: 0, title: '', description: '', status: 'InProgress'}; // Инициализация значениями по умолчанию
  public cancelButton: Button;
  public saveButton: Button
  private destroyed$: Subject<void> = new Subject();

  public constructor(private router: Router,
                     private store: TodoStoreService,
                     private toasts: ToastService) {
    const navigation = this.router.getCurrentNavigation()
    if (navigation?.extras.state) {
      console.log('ToDoEditComponent initialized');
      this.todo = navigation.extras.state['todo'];
    }
    this.cancelButton = {
      icon: "BUTTONS.CANCEL",
      title: "BUTTONS.CANCEL_TITLE",
      class: {
        color: "white",
        background: "red",
      }
    }

    this.saveButton = {
      icon: "BUTTONS.SAVE",
      title: "BUTTONS.SAVE_TITLE",
      class: {
        color: "white",
        background: "green",
      }
    }
  }


  public ngOnInit(): void {
    // возвращаемся к базовому url, если нет данных
    if (!this.todo) {
      this.goBack()
    }
  }

  public goBack() {
    this.router.navigate([ROUTERS.BACKLOG]);
  }

  public saveTodo() {
    this.todo && (
      this.store.updateTask(this.todo.id, this.todo).pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.toasts.showToast('TOASTS.TASK_UPDATE')
        }),
        catchError(() => {
          this.toasts.showToast('TOASTS.TASK_ERROR')
          return this.router.navigate(['/tasks']);
        })
      ).subscribe(() => {
        this.goBack()
      })
    )
  }
}
