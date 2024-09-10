import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TodoTask} from "../../interfaces/to-do";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ToDoItemComponent} from "../to-do-item/to-do-item.component";
import {SpinnerComponent} from "../spiner/spinner.component";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageSelectorComponent} from "../language-selector/language-selector.component";
import {TuiInputInline} from "@taiga-ui/kit";

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
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss'
})
export class ToDoListComponent implements OnInit {
  componentTitle = 'ToDo List'
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
  
  todoItems: TodoTask[] | undefined;
  isLoading: boolean = false
  todoDescription: string = ''
  selectedItem: number | null = null;

  constructor() {
    this.todoItems = [
      {id: 1, title: 'Проснуться', description: "утро добрым не бывает", finish: true},
      {id: 2, title: 'Умыться', description: '', finish: false},
      {id: 3, title: 'Поесть', description: '', finish: false},
      {id: 7, title: 'Сходить в магазин', description: 'Список покупок:\n1. Хлеб,\n2. Макароны', finish: false},
    ]
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = true, 500)
  }

  addTask() {
    if (!this.newTitleValue) return;

    // ищем максимальный id
    const maxId: number = Math.max(...this.todoItems!.map(item => item.id));
    const nextID: number = maxId + 1

    this.todoItems?.push(
      {id: nextID, title: this.newTitleValue, description: this.newDescriptionValue, finish: false}
    )
    this.newDescriptionValue = ''
    this.newTitleValue = ''
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
}
