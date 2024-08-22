import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TodoTask} from "../../interfaces/to-do";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ToDoListItemComponent} from "../to-do-list-item/to-do-list-item.component";

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
    ToDoListItemComponent
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
  componentTitle = 'ToDo List'
  newItemValue: string = '';


  todoItems: TodoTask[] | undefined;

  constructor() {
    this.todoItems = [
      {id:1, description: 'Проснуться', finish: true},
      {id:2, description: 'Умыться', finish: false},
      {id:3, description: 'Поесть', finish: false},
      {id:4, description: 'Сходить в магазин', finish: false},
    ]
  }

  addTask(description: string) {
    if (!description) return;
    this.newItemValue = ''
    // ищем максимальный id
    const maxId: number = Math.max(...this.todoItems!.map(item => item.id));
    const nextID: number = maxId+1

    this.todoItems?.push(
      {id: nextID, description:description, finish: false}
    )
  }

  deleteTask(id: number) {
    if (!this.todoItems) return;

    this.todoItems = this.todoItems.filter(item => item.id !== id);
  }

  toggleFinish(id: number) {
    if (!this.todoItems) return;

    const item = this.todoItems.find(item => item.id === id);
    if (item) {
      item.finish = !item.finish; // Изменяем значение finish на противоположное
    }
  }
}
