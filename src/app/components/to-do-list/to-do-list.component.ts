import { Component } from '@angular/core';
import {ToDoInterface} from "../../interfaces/to-do";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent {
  componentTitle = 'ToDo List'
  newItemValue: string = '';


  items: ToDoInterface[] | undefined;

  constructor() {
    this.items = [
      {description: 'Проснуться', finish: true},
      {description: 'Умыться', finish: false},
      {description: 'Поесть', finish: false},
      {description: 'Сходить в магазин', finish: false},
    ]
  }

  addItem(description: string) {
    if (!description) return;
    this.newItemValue = ''
    this.items?.push(
      {description:description, finish: false}
    )
  }

  deleteItem(index: number) {
    if (!this.items) return;

    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  finish(index: number) {
    if (!this.items) return;

    if (index >= 0 && index < this.items.length) {
      this.items[index].finish = !this.items[index].finish;
    }
  }
}
