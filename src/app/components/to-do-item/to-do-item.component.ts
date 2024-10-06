import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TodoTask} from "../../interfaces/to-do";
import {ButtonComponent} from "../button/button.component";
import {Button} from "../../interfaces/button";
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-to-do-item',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './to-do-tem.component.html',
  styleUrl: './to-do-item.component.scss'
})
export class ToDoItemComponent {
  deleteButton: Button
  finishButton: Button
  saveButton: Button

  @Input() todo!: TodoTask;
  @Input() selectedItem!: number | null;
  @Output() deleteToDoItem = new EventEmitter<number>;
  @Output() finishToDoItem = new EventEmitter<number>;
  @Output() showDescriptionToDoItem = new EventEmitter<number>();
  @Output() updateToDoItem = new EventEmitter<TodoTask>();
  isEdit: number | null = null;

  constructor() {
    this.deleteButton = {
      icon: "BUTTONS.DELETE",
      title: "BUTTONS.DELETE_TITLE",
      class: {
        color: "white",
        background: "red",
      }
    }
    this.finishButton = {
      icon: "BUTTONS.FINISH",
      title: "BUTTONS.FINISH_TITLE",
      class: {
        color: "white",
        background: "green",
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

  finishItem(todoId: number) {
    this.finishToDoItem.emit(todoId)
  }

  deleteItem(todoId: any) {
    this.deleteToDoItem.emit(todoId)
  }

  showDescription(todoId: number) {
    this.showDescriptionToDoItem.emit(todoId)
  }

  updateTitle() {
    this.isEdit = null
    this.updateToDoItem.emit(this.todo)
  }

  editTask(todoId: number) {
    this.isEdit = todoId
  }
}


