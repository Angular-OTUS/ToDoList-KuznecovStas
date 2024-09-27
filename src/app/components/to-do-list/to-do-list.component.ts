import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TodoTask} from "../../interfaces/to-do";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ToDoItemComponent} from "../to-do-item/to-do-item.component";
import {SpinnerComponent} from "../spiner/spinner.component";
import {ButtonComponent} from "../button/button.component";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {TuiInputInline} from "@taiga-ui/kit";
import {TodoStoreService} from "../../services/todo-store.service";
import {Subscription} from "rxjs";
import {ToastService} from "../../services/toast.service";
import {TodoCreateItemComponent} from "../todo-create-item/todo-create-item.component";

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
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit, OnDestroy {
  componentTitle = 'ToDo List'


  todoItems: TodoTask[] | undefined;
  isLoading: boolean = false
  todoDescription: string = ''
  selectedItem: number | null = null;
  selectedStatus: string | null = null;
  private subscription = new Subscription();

  constructor(
    private store: TodoStoreService,
    private toastService: ToastService) {

    this.subscription.add(
      this.store.todoItems$.subscribe(items => {
        this.todoItems = items;
      })
    );
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = true, 500)
  }


  deleteTask(id: number) {
    if (!this.todoItems) return;

    this.store.deleteTask(id)
    this.toastService.showToast("TOASTS.TASK_DELETE")
  }

  filterTasks(): void {
    if (!this.todoItems) return;
    if (this.selectedStatus === 'null') {
      this.todoItems = this.store.getAllTasks()
    } else {
      this.todoItems = this.store.getTaskByStatus(this.selectedStatus)
    }

  }

  updateTask(task: TodoTask) {
    if (!this.todoItems) return;
    this.store.updateTask(task.id, task)
    this.toastService.showToast("TOASTS.TASK_UPDATE")

  }

  setStatus(id: number) {
    if (!this.todoItems) return;
    const item: TodoTask | undefined = this.todoItems.find(item => item.id === id);
    if (item) {
      this.store.updateTask(id, {...item, status: item.status === 'InProgress' ? 'Completed' : 'InProgress'})
      // выводим если задача завершена
      if (item.status === 'Completed') {
        this.toastService.showToast("TOASTS.TASK_FINISH")
      }
    }
  }

  showDescription(id: number | null) {
    this.selectedItem = this.selectedItem === id ? null : id;
    if (this.selectedItem == null) {
      this.todoDescription = ''
      return
    }
    const description = this.todoItems?.find(item => item.id === id)?.description;
    if (description) {
      this.todoDescription = description
    } else {
      this.todoDescription = ''
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
