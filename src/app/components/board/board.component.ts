import {Component, OnDestroy} from '@angular/core';
import {TodoStoreService} from "../../services/todo-store.service";
import {Subscription} from "rxjs";
import {TodoTask} from "../../interfaces";
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnDestroy {
  public todoItems: TodoTask[] = []; // все задачи
  public inProgressTasks: TodoTask[] = []; // задачи в процессе выполнения
  public completedTasks: TodoTask[] = []; // выполненные задачи

  private subscription = new Subscription();


  public constructor(private store: TodoStoreService) {
    this.subscription.add(
      this.store.todoItems$.subscribe(items => {
        this.todoItems = items;
        this.inProgressTasks = items.filter(task => task.status === 'InProgress');
        this.completedTasks = items.filter(task => task.status === 'Completed');
      })
    );
    console.log(this.todoItems);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
