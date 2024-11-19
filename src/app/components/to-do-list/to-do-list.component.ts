import {Component, OnDestroy} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Button, TodoTask} from "../../interfaces";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ToDoItemComponent} from "./to-do-item/to-do-item.component";
import {SpinnerComponent} from "../spiner/spinner.component";
import {ButtonComponent} from "../button/button.component";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {TuiInputInline} from "@taiga-ui/kit";
import {ToastService} from "../../services/toast.service";
import {TodoStoreService} from "../../services/todo-store.service";
import {catchError, of, Subject, Subscription, takeUntil, tap} from "rxjs";
import {TodoCreateItemComponent} from "../todo-create-item/todo-create-item.component";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ROUTERS} from "../../constants/routers";

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    MatInput,
    MatFormField,
    MatIcon,
    ToDoItemComponent,
    SpinnerComponent,
    ButtonComponent,
    TranslateModule,
    LanguageSelectorComponent,
    TuiInputInline,
    TodoCreateItemComponent,
    RouterOutlet,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnDestroy {
  public addTaskButton: Button = {
    title: 'BUTTONS.ADD_TITLE',
    icon: 'BUTTONS.ADD',
    class: {
      color: 'white',
      background: 'green',
    }
  }
  public todoItems: TodoTask[] | undefined;
  public selectedItem: number | null = null;
  public selectedStatus: string | null = null;
  private subscription = new Subscription();
  private destroyed$: Subject<void> = new Subject();

  public constructor(
    private store: TodoStoreService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute) {

    this.subscription.add(
      this.store.todoItems$.subscribe(items => {
        this.todoItems = items;
      })
    );
  }


  public deleteTask(id: number): void {
    if (this.todoItems) {
      this.store.deleteTask(id).pipe(
        takeUntil(this.destroyed$),
        tap(() => {
          this.toastService.showToast("TOASTS.TASK_DELETE")
        }),
        catchError((error) => {
          console.error('todo-store-service|deleteTask', error);
          this.toastService.showToast("TOASTS.TASK_ERROR")
          return of(null);
        })
      ).subscribe(
      )

    }
  }

  public filterTasks(): void {
    if (this.todoItems) {
      if (this.selectedStatus === 'null') {
        this.todoItems = this.store.getAllTasks()
      } else {
        this.todoItems = this.store.getTaskByStatus(this.selectedStatus)
      }
    }

  }

  public setStatus(id: number): void {
    if (this.todoItems) {
      const item: TodoTask | undefined = this.todoItems.find(item => item.id === id);
      if (item) {
        this.store.updateTask(id, {...item, status: item.status === 'InProgress' ? 'Completed' : 'InProgress'})
          .pipe(takeUntil(this.destroyed$),
            tap(() => {
              // выводим если задача завершена
              if (item.status === 'InProgress') {
                this.toastService.showToast("TOASTS.TASK_FINISH")
              }
            }),
            catchError((error) => {
                console.error('to-do-list.component| setStatus:', id, error);
                this.toastService.showToast("TOASTS.TASK_ERROR")
                return of(null);
              },
            )).subscribe()
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public addTask() {
    this.router.navigate([ROUTERS.ADD_TASK], {relativeTo: this.route});
  }
}
