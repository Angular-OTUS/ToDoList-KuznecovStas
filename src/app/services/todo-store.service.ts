import {Injectable} from '@angular/core';
import {TodoTask} from "../interfaces/to-do";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  private _todoItems: TodoTask[] = [
    {id: 1, title: 'Проснуться', description: "утро добрым не бывает", finish: true},
    {id: 2, title: 'Умыться', description: '', finish: false},
    {id: 3, title: 'Поесть', description: '', finish: false},
    {id: 7, title: 'Сходить в магазин', description: 'Список покупок:\n1. Хлеб,\n2. Макароны', finish: false},
  ];

  private _todoItemsSubject: BehaviorSubject<TodoTask[]> = new BehaviorSubject<TodoTask[]>(this._todoItems);
  todoItems$ = this._todoItemsSubject.asObservable();

  constructor() {
  }

  getAllTask() {
    return this._todoItemsSubject.value
  }

  addTask(title: string, description: string) {
    // ищем максимальный id
    const maxId: number = Math.max(...this._todoItems!.map(item => item.id));
    const nextID: number = maxId + 1

    this._todoItems?.push(
      {id: nextID, title: title, description: description, finish: false}
    )
    this._todoItemsSubject.next(this._todoItems);
  }

  deleteTask(id: number) {
    this._todoItems = this._todoItems?.filter(item => item.id !== id);
    this._todoItemsSubject.next(this._todoItems)
  }

  updateTask(id: number, item: TodoTask) {
    const index = this._todoItems.findIndex(item => item.id === id);
    this._todoItems[index] = item;
    this._todoItemsSubject.next(this._todoItems)
  }
}
